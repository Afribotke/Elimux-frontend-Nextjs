Write-Host "=== AUTO FIX ALL START ==="

# 1) Validate .env.local
$envLocalPath = ".env.local"
if (-not (Test-Path $envLocalPath)) {
    Write-Host "? .env.local missing"
    exit 1
}

$lines = Get-Content $envLocalPath

function CheckVar($name) {
    $line = $lines | Where-Object { $_ -match "^$name=" }
    if (-not $line) {
        Write-Host "? Missing: $name"
        exit 1
    }
    $value = $line -replace "^$name=", ""
    if ($value.Trim() -eq "") {
        Write-Host "? Empty: $name"
        exit 1
    }
    Write-Host "? $name OK"
}

CheckVar "NEXT_PUBLIC_SUPABASE_URL"
CheckVar "NEXT_PUBLIC_SUPABASE_ANON_KEY"
CheckVar "SUPABASE_URL"
CheckVar "SUPABASE_ANON_KEY"

# 2) Ensure .env.example exists and is safe
$envExample = ".env.example"
$cleaned = $lines | ForEach-Object {
    if ($_ -match '^NEXT_PUBLIC_SUPABASE_URL=') { "NEXT_PUBLIC_SUPABASE_URL=" }
    elseif ($_ -match '^NEXT_PUBLIC_SUPABASE_ANON_KEY=') { "NEXT_PUBLIC_SUPABASE_ANON_KEY=" }
    elseif ($_ -match '^SUPABASE_URL=') { "SUPABASE_URL=" }
    elseif ($_ -match '^SUPABASE_ANON_KEY=') { "SUPABASE_ANON_KEY=" }
    else { $_ }
}
$cleaned | Set-Content $envExample -Encoding UTF8
Write-Host "? .env.example refreshed"

# 3) Sync keys to Vercel
$publicUrl  = ($lines | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_URL=' }) -replace '^NEXT_PUBLIC_SUPABASE_URL=', ''
$publicAnon = ($lines | Where-Object { $_ -match '^NEXT_PUBLIC_SUPABASE_ANON_KEY=' }) -replace '^NEXT_PUBLIC_SUPABASE_ANON_KEY=', ''

Write-Host "? Syncing keys to Vercel..."
vercel env add NEXT_PUBLIC_SUPABASE_URL <<< $publicUrl
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY <<< $publicAnon

# 4) Run TypeScript check
Write-Host "? Running TypeScript check..."
$tsErrors = npx tsc --noEmit 2>&1

if ($tsErrors) {
    Write-Host "? TypeScript errors detected:"
    Write-Host $tsErrors

    # Example targeted auto-fix: unsafe user.email in dashboard
    $dashboardPath = "app/dashboard/page.tsx"
    if (Test-Path $dashboardPath) {
        $content = Get-Content $dashboardPath
        $fixed   = $content -replace 'if\s*\(user\)\s*setUserEmail\(user\.email\);', 'setUserEmail(user?.email ?? null);'
        $fixed | Set-Content $dashboardPath -Encoding UTF8
        Write-Host "? Applied safe user.email fix in dashboard"
    }
} else {
    Write-Host "? No TypeScript errors reported"
}

# 5) Git add + commit + push
Write-Host "? Committing and pushing to GitHub..."
git add .
git commit -m "Auto-fix env, Vercel sync, and TS safety"
git push

Write-Host "=== AUTO FIX ALL COMPLETE ==="
