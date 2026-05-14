# Serves novyra-website with http-server (no cache headers).
# Default port 8766 (aligned with workspace Live Server / Cursor preview). Override: -Port 8080
# Run from repo: see LIVE-SERVER-READ-ME.txt

param(
    [int]$Port = 8766
)

$ErrorActionPreference = 'Continue'

Write-Host "Preview: http://127.0.0.1:$Port/ — stop Live Server in VS Code first if port busy"

function Stop-NodeListenersOnPort {
    param([int]$LocalPort)

    $stoppedAny = $false

    try {
        $listeners = @(
            Get-NetTCPConnection -LocalPort $LocalPort -State Listen -ErrorAction Stop
        )
        foreach ($conn in $listeners) {
            $owningPid = $conn.OwningProcess
            try {
                $proc = Get-Process -Id $owningPid -ErrorAction Stop
                if ($proc.ProcessName -eq 'node') {
                    Stop-Process -Id $owningPid -Force
                    Write-Host "Stopped Node listener (PID $owningPid) on port $LocalPort."
                    $stoppedAny = $true
                }
            }
            catch {
                Write-Host "Could not stop PID ${owningPid}: $($_.Exception.Message)"
            }
        }
    }
    catch {
        Write-Host "Get-NetTCPConnection failed: $($_.Exception.Message); trying netstat."
        try {
            $netstatLines = netstat -ano 2>$null
            foreach ($line in $netstatLines) {
                if ($line -notmatch 'LISTENING') { continue }
                if ($line -notmatch ":$LocalPort\s") { continue }
                if ($line -notmatch 'LISTENING\s+(\d+)\s*$') { continue }
                $owningPid = [int]$Matches[1]
                try {
                    $proc = Get-Process -Id $owningPid -ErrorAction Stop
                    if ($proc.ProcessName -eq 'node') {
                        Stop-Process -Id $owningPid -Force
                        Write-Host "Stopped Node listener (PID $owningPid) on port $LocalPort (netstat)."
                        $stoppedAny = $true
                    }
                }
                catch {
                    Write-Host "Could not stop PID ${owningPid}: $($_.Exception.Message)"
                }
            }
        }
        catch {
            Write-Host "netstat fallback failed: $($_.Exception.Message)"
        }
    }

    if (-not $stoppedAny) {
        Write-Host "No Node listener on port $LocalPort was stopped (or port was free); continuing."
    }
}

Stop-NodeListenersOnPort -LocalPort $Port

$websiteRoot = Split-Path -Path $PSScriptRoot -Parent
Set-Location -LiteralPath $websiteRoot
Write-Host "Serving from: $websiteRoot"
Write-Host 'Starting http-server (cache disabled via -c-1)...'
Write-Host "Preview: http://127.0.0.1:$Port/ — stop Live Server in VS Code first if port busy"

npx --yes http-server . -p $Port -c-1 -o
