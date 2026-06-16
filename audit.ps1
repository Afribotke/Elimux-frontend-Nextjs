Write-Host "=== Elimux full audit started ===" -ForegroundColor Cyan

# 1. Install deps (safe if already installed)
Write-Host "`n[1/3] Ensuring dependencies are installed..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
  Write-Host "`nDependency install failed. Stopping audit." -ForegroundColor Red
  exit 1
}

# 2. Lint + TypeScript + Build
Write-Host "`n[2/3] Running ESLint + TypeScript + Next build..." -ForegroundColor Yellow
npm run audit

if ($LASTEXITCODE -ne 0) {
  Write-Host "`n❌ Audit failed. Check the errors above." -ForegroundColor Red
  exit 1
}

Write-Host "`n✅ Audit passed. Safe to push & deploy." -ForegroundColor Green
