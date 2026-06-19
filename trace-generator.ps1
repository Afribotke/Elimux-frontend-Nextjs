Write-Host "=== TRACE: Checking supabase-generate.ps1 ==="

# 1. Check current directory
Write-Host "Current directory:"
Write-Host (Get-Location)

# 2. Check if file exists in current directory
if (Test-Path "./supabase-generate.ps1") {
    Write-Host "FOUND: supabase-generate.ps1 in current directory."
} else {
    Write-Host "NOT FOUND in current directory."
}

# 3. Search entire project for the file
Write-Host "`nSearching entire project for supabase-generate.ps1..."
$results = Get-ChildItem -Path . -Recurse -Filter "supabase-generate.ps1" -ErrorAction SilentlyContinue

if ($results) {
    Write-Host "FOUND in the following location(s):"
    $results | ForEach-Object { Write-Host $_.FullName }
} else {
    Write-Host "File not found anywhere in the project."
}

# 4. Check for wrong extension (e.g., .txt)
Write-Host "`nChecking for files starting with 'supabase-generate'..."
$similar = Get-ChildItem -Path . -Recurse -Filter "supabase-generate*"

if ($similar) {
    Write-Host "Similar files found:"
    $similar | ForEach-Object { Write-Host $_.FullName }
} else {
    Write-Host "No similar files found."
}

# 5. Check execution policy
Write-Host "`nExecution Policy:"
Write-Host (Get-ExecutionPolicy -Scope CurrentUser)

Write-Host "`n=== TRACE COMPLETE ==="
