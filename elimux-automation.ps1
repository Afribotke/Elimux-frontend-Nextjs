param(
    [string],
    [string] = "generated-elimux-task.ps1"
)

 = Join-Path (Get-Location) 
 = New-Object System.Text.UTF8Encoding False
[System.IO.File]::WriteAllText(, , )

Write-Host "âœ” Script written to: "

try {
     = powershell -ExecutionPolicy Bypass -File  2>&1

    Write-Host "âœ” Execution complete"
    Write-Host "-----------------------------------"
    Write-Host 
    Write-Host "-----------------------------------"

    return 
}
catch {
    Write-Host "âŒ Script failed"
    Write-Host .Exception.Message
    return .Exception.Message
}