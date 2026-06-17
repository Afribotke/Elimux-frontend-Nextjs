Write-Host "=== CI MASTER START ==="

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$logDir = "ci-logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null
Start-Transcript -Path "$logDir/ci-$timestamp.log" | Out-Null

if (-not (Test-Path ".env.local")) {
    Write-Host "❌ .env.local missing"
    Stop-Transcript | Out-Null
    exit 1
}

$env = Get-Content ".env.local"

function CheckVar {
    param($name)
    $line = $env | Where-Object { $_ -match "^$name=" }
    if (-not $line) { Write-Host "❌ Missing: $name"; exit 1 }
    $value = $line -replace "^$name=", ""
    if ($value.Trim() -eq "") { Write-Host "❌ Empty: $name"; exit 1 }
    Write-Host "✔ $name OK"
}

CheckVar "NEXT_PUBLIC_SUPABASE_URL"
CheckVar "NEXT_PUBLIC_SUPABASE_ANON_KEY"
CheckVar "SUPABASE_URL"
CheckVar "SUPABASE_ANON_KEY"

$clean = $env | ForEach-Object {
    if ($_ -match '^NEXT_PUBLIC_SUPABASE_URL=') { "NEXT_PUBLIC_SUPABASE_URL=" }
    elseif ($_ -match '^NEXT_PUBLIC_SUPABASE_ANON_KEY=') { "NEXT_PUBLIC_SUPABASE_ANON_KEY=" }
    elseif ($_ -match '^SUPABASE_URL=') { "SUPABASE_URL=" }
    elseif ($_ -match '^SUPABASE_ANON_KEY=') { "SUPABASE_ANON_KEY=" }
    else { $_ }
}
$clean | Set-Content ".env.example"

Write-Host "✔ .env.example refreshed"

Write-Host "✔ Syncing keys to Vercel..."

$publicUrl  = ($env | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_URL=' }) -replace '^NEXT_PUBLIC_SUPABASE_URL=', ''
$publicAnon = ($env | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' }) -replace '^NEXT_PUBLIC_SUPABASE_ANON_KEY=', ''

# Production
$publicUrl  | vercel env add NEXT_PUBLIC_SUPABASE_URL production
$publicAnon | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# Preview
$publicUrl  | vercel env add NEXT_PUBLIC_SUPABASE_URL preview
$publicAnon | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview

# Development
$publicUrl  | vercel env add NEXT_PUBLIC_SUPABASE_URL development
$publicAnon | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development

Write-Host "✔ Vercel env updated"

npx supabase gen types typescript --project-id ohlgjvenwekpbpkykutz > lib/supabase-types.ts
Write-Host "✔ Supabase types updated"

$ts = npx tsc --noEmit 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ TypeScript errors detected"
    Write-Host $ts
    exit 1
}
Write-Host "✔ TypeScript clean"

npm run lint 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Lint failed"
    exit 1
}
Write-Host "✔ Lint clean"

npm run build 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Local build failed"
    exit 1
}
Write-Host "✔ Local build succeeded"

git add .
git commit -m "CI master pipeline" 2>$null
git push
Write-Host "✔ Git push complete"

vercel --prod
Write-Host "✔ Deployment triggered"

Stop-Transcript | Out-Null
Write-Host "=== CI MASTER COMPLETE ==="
