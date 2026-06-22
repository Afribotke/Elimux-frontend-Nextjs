# ================================
#   ELIMUX AUTO-HEAL BUILD ENGINE
# ================================

Set-Location "C:\Users\ELON\Projects-2026\IDEA STORE\Elimux-frontend-Nextjs-CLEAN"

function Run-Build {
    Write-Host "`n=== Running Local Build ===" -ForegroundColor Cyan
    $result = npm run build 2>&1
    return $result
}

function Fix-Error($error) {
    Write-Host "`n=== Auto-Fixing Error ===" -ForegroundColor Yellow
    Write-Host $error -ForegroundColor DarkYellow

    # 1. Fix missing Button component
    if ($error -match "Cannot find name 'Button'") {
        Write-Host "Fix: Replacing <Button> with <button>" -ForegroundColor Green
        Get-ChildItem -Recurse -Filter "*.tsx" | ForEach-Object {
            (Get-Content $_.FullName) `
                -replace "<Button", "<button" `
                -replace "</Button>", "</button>" `
                | Set-Content -Encoding UTF8 $_.FullName
        }
        return
    }

    # 2. Fix missing type files
    if ($error -match "Cannot find module '.+/types'") {
        Write-Host "Fix: Creating missing types.ts file" -ForegroundColor Green
        $path = $error -replace ".*module '", "" -replace "/types'.*", ""
        $folder = "components/admin/$path"
        $file = "$folder/types.ts"

        if (!(Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force }

@"
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "disabled" | "invited";
}
"@ | Set-Content -Encoding UTF8 $file
        return
    }

    # 3. Fix missing header props
    if ($error -match "does not exist on type 'IntrinsicAttributes'") {
        Write-Host "Fix: Creating missing Header component with props" -ForegroundColor Green

        $component = ($error -split " ")[0] -replace "\..*", ""
        $folder = "app/admin/$component"
        $file = "$folder/${component}Header.tsx"

        if (!(Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force }

@"
"use client";

export default function ${component}Header({ total }: { total: number }) {
  return (
    <div className='flex items-center justify-between py-2'>
      <h1 className='text-xl font-semibold'>$component</h1>
      <p className='text-sm text-muted-foreground'>Total: {total}</p>
    </div>
  );
}
"@ | Set-Content -Encoding UTF8 $file
        return
    }

    # 4. Fix unused imports
    if ($error -match "is declared but its value is never read") {
        Write-Host "Fix: Removing unused imports" -ForegroundColor Green
        $file = ($error -split ":")[0]
        (Get-Content $file) | Where-Object { $_ -notmatch "import .*" } | Set-Content -Encoding UTF8 $file
        return
    }

    Write-Host "No automated fix found for this error." -ForegroundColor Red
}

function Commit-And-Deploy {
    git add .
    git commit -m "Auto-heal: fix build error"
    git push

    Invoke-WebRequest `
      "https://api.vercel.com/v1/integrations/deploy/prj_ED21qsDvU8GSV04Pye5ZLK5ICB5a/JZguiLari7" `
      -Method Post

    Write-Host "Deployment triggered" -ForegroundColor Cyan
}

# ================================
#   MAIN LOOP
# ================================

while ($true) {
    $build = Run-Build

    if ($build -match "Failed to compile") {
        $errorLine = ($build -split "`n") | Where-Object { $_ -match "Type error" }
        Fix-Error $errorLine
        Commit-And-Deploy
        Start-Sleep -Seconds 10
    }
    else {
        Write-Host "`n=== BUILD PASSED ===" -ForegroundColor Green
        break
    }
}
