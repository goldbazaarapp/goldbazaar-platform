@echo off
title GoldBazaar Local Server
color 0A

echo.
echo  ██████╗  ██████╗ ██╗     ██████╗
echo  ██╔════╝ ██╔═══██╗██║     ██╔══██╗
echo  ██║  ███╗██║   ██║██║     ██║  ██║
echo  ██║   ██║██║   ██║██║     ██║  ██║
echo  ╚██████╔╝╚██████╔╝███████╗██████╔╝
echo   ╚═════╝  ╚═════╝ ╚══════╝╚═════╝
echo.
echo  GoldBazaar Local Server
echo  ─────────────────────────────────
echo  Starting server on http://localhost:8080
echo  Live gold rates will load automatically.
echo.
echo  Press Ctrl+C to stop the server.
echo  ─────────────────────────────────
echo.

:: Try Python 3 first
where python >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080"
    python -m http.server 8080
    goto :end
)

:: Try py launcher
where py >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080"
    py -m http.server 8080
    goto :end
)

:: Try Python 3 explicitly
where python3 >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080"
    python3 -m http.server 8080
    goto :end
)

echo  ERROR: Python not found.
echo.
echo  Please install Python from https://python.org
echo  Then run this file again.
echo.
pause

:end
