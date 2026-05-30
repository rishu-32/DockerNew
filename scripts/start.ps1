# BookStore — one-command startup (Windows PowerShell)
$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot

Set-Location $ProjectRoot

Write-Host "`n=== BookStore DevOps — Starting ===" -ForegroundColor Cyan

if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Docker is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

Write-Host "Building and starting all containers..." -ForegroundColor Yellow
docker compose up --build -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: docker compose failed. Is Docker Desktop running?" -ForegroundColor Red
    exit 1
}

Write-Host "`nWaiting for MongoDB and services (about 40 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 40

Write-Host "`n--- Container status ---" -ForegroundColor Green
docker compose ps

Write-Host "`n--- MongoDB bookstore database ---" -ForegroundColor Green
docker exec bookstore-mongodb mongosh bookstore --quiet --eval @"
print('Collections: ' + db.getCollectionNames().join(', '));
print('Users:   ' + db.users.countDocuments());
print('Books:   ' + db.books.countDocuments());
print('Orders:  ' + db.orders.countDocuments());
"@

Write-Host "`n=== READY ===" -ForegroundColor Green
Write-Host "Website:         http://localhost" -ForegroundColor White
Write-Host "MongoDB Compass: mongodb://localhost:27018/bookstore" -ForegroundColor White
Write-Host "Database:        bookstore" -ForegroundColor White
Write-Host "Collections:     users | books | orders" -ForegroundColor White
Write-Host "`nDemo login:" -ForegroundColor Yellow
Write-Host "  Admin: admin@bookstore.com / admin123" -ForegroundColor Gray
Write-Host "  User:  user@bookstore.com  / user123" -ForegroundColor Gray
Write-Host ""
