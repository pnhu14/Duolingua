param(
    [Parameter(Position = 0)]
    [string]$Command,

    [Parameter(Position = 1)]
    [string]$Name,

    [Parameter(Position = 2)]
    [string]$Extra
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$migrationDir = Join-Path $projectRoot "src\main\resources\db\migration"
$undoDir = Join-Path $projectRoot "src\main\resources\db\undo"
$mainClass = "com.musicapp.backend.tool.MigrationCli"

function Normalize-MigrationName {
    param([string]$RawName)

    $normalized = $RawName.ToLowerInvariant()
    $normalized = $normalized -replace "[^a-z0-9]+", "_"
    $normalized = $normalized.Trim("_")

    if ([string]::IsNullOrWhiteSpace($normalized)) {
        throw "Migration name is invalid after normalization."
    }

    return $normalized
}

function New-MigrationFiles {
    param([string]$MigrationName)

    $normalized = Normalize-MigrationName $MigrationName
    $version = Get-Date -Format "yyyyMMddHHmmss"

    $upFile = Join-Path $migrationDir "V${version}__${normalized}.sql"
    $downFile = Join-Path $undoDir "U${version}__${normalized}.sql"

    if ((Test-Path $upFile) -or (Test-Path $downFile)) {
        throw "Migration files already exist for version $version."
    }

    $upContent = @"
-- Migration: $normalized
-- Version: $version
-- Write the forward schema/data change here.

"@

    $downContent = @"
-- Undo migration: $normalized
-- Version: $version
-- Write the rollback SQL for V${version}__${normalized}.sql here.

"@

    New-Item -ItemType Directory -Path $migrationDir -Force | Out-Null
    New-Item -ItemType Directory -Path $undoDir -Force | Out-Null
    [System.IO.File]::WriteAllText($upFile, $upContent, [System.Text.UTF8Encoding]::new($false))
    [System.IO.File]::WriteAllText($downFile, $downContent, [System.Text.UTF8Encoding]::new($false))

    Write-Host "Created:"
    Write-Host " - $upFile"
    Write-Host " - $downFile"
}

function Invoke-MigrationCli {
    param([string[]]$Arguments)

    Push-Location $projectRoot
    try {
        $joinedArguments = $Arguments -join ' '
        & .\mvnw.cmd `
            "-Dexec.mainClass=$mainClass" `
            "-Dexec.args=$joinedArguments" `
            exec:java
    }
    finally {
        Pop-Location
    }
}

switch ($Command) {
    "make:migration" {
        if (-not $Name) {
            throw "Usage: .\artisan.ps1 make:migration create_table_name"
        }

        New-MigrationFiles -MigrationName $Name
        break
    }
    "migrate" {
        Invoke-MigrationCli -Arguments @("migrate")
        break
    }
    "rollback" {
        $steps = if ($Name) { $Name } else { "1" }
        Invoke-MigrationCli -Arguments @("rollback", $steps)
        break
    }
    "migrate:rollback" {
        $steps = if ($Name) { $Name } else { "1" }
        Invoke-MigrationCli -Arguments @("rollback", $steps)
        break
    }
    "info" {
        Invoke-MigrationCli -Arguments @("info")
        break
    }
    "status" {
        Invoke-MigrationCli -Arguments @("status")
        break
    }
    "migrate:status" {
        Invoke-MigrationCli -Arguments @("status")
        break
    }
    default {
        Write-Host "Available commands:"
        Write-Host " - .\artisan.ps1 make:migration create_table_name"
        Write-Host " - .\artisan.ps1 migrate"
        Write-Host " - .\artisan.ps1 rollback [steps]"
        Write-Host " - .\artisan.ps1 migrate:rollback [steps]"
        Write-Host " - .\artisan.ps1 info"
        Write-Host " - .\artisan.ps1 status"
        Write-Host " - .\artisan.ps1 migrate:status"
        exit 1
    }
}
