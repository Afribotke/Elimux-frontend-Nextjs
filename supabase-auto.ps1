Write-Host "Starting extended Supabase automation..."

# 0. Ensure required folders exist
$folders = @(
    "supabase/tables",
    "supabase/policies",
    "supabase/functions",
    "supabase/triggers",
    "supabase/views",
    "supabase/types"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        Write-Host "Creating missing folder: $folder"
        New-Item -ItemType Directory -Path $folder | Out-Null
    }
}

# 1. Start local Supabase
Write-Host "Starting local Supabase..."
npx supabase start

# 2. Apply table SQL files
Write-Host "Applying table definitions..."
Get-ChildItem -Path "supabase/tables" -Filter *.sql | ForEach-Object {
    Write-Host "Applying table: $($_.Name)"
    npx supabase db execute --file $_.FullName
}

# 3. Apply RLS policies
Write-Host "Applying RLS policies..."
Get-ChildItem -Path "supabase/policies" -Filter *.sql | ForEach-Object {
    Write-Host "Applying policy: $($_.Name)"
    npx supabase db execute --file $_.FullName
}

# 4. Apply functions
Write-Host "Applying SQL functions..."
Get-ChildItem -Path "supabase/functions" -Filter *.sql | ForEach-Object {
    Write-Host "Applying function: $($_.Name)"
    npx supabase db execute --file $_.FullName
}

# 5. Apply triggers
Write-Host "Applying triggers..."
Get-ChildItem -Path "supabase/triggers" -Filter *.sql | ForEach-Object {
    Write-Host "Applying trigger: $($_.Name)"
    npx supabase db execute --file $_.FullName
}

# 6. Apply views
Write-Host "Applying views..."
Get-ChildItem -Path "supabase/views" -Filter *.sql | ForEach-Object {
    Write-Host "Applying view: $($_.Name)"
    npx supabase db execute --file $_.FullName
}

# 7. Diff + push migrations
Write-Host "Checking schema differences..."
npx supabase db diff

Write-Host "Pushing migrations..."
npx supabase db push

# 8. Generate types
Write-Host "Generating Supabase types..."
npx supabase gen types typescript --project-id ohlgjvenwekpbpkykutz > lib/supabase-types.ts

Write-Host "Extended automation complete."
