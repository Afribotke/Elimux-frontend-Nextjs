Write-Host '🧹 Cleaning unused folders...'
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Write-Host '✅ Cleanup complete.'
