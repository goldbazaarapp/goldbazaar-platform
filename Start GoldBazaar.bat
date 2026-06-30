@echo off
title GoldBazaar Local Server
color 0A

echo.
echo  +-----------------------------------------+
echo  ^|      GoldBazaar Local Server            ^|
echo  ^|  http://localhost:8080                  ^|
echo  ^|  No-cache mode - always loads latest    ^|
echo  ^|  Press Ctrl+C to stop                  ^|
echo  +-----------------------------------------+
echo.

cd /d "%~dp0"

:: Try Python 3 first
where python >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080"
    python serve.py
    goto :end
)

:: Try py launcher
where py >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080"
    py serve.py
    goto :end
)

:: Try Python 3 explicitly
where python3 >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080"
    python3 serve.py
    goto :end
)

echo ERROR: Python not found.
echo Please install Python from https://python.org
echo Then run this file again.
echo.
pause

:end
