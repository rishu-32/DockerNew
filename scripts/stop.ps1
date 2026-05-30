$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
Write-Host "Stopping BookStore containers..." -ForegroundColor Yellow
docker compose down
Write-Host "Stopped." -ForegroundColor Green
