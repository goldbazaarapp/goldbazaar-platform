@echo off
echo Converting gold-loan-providers.xlsx to JS data file...
python "%~dp0convert.py"
if %errorlevel% == 0 (
    echo Done! Website data updated successfully.
) else (
    echo ERROR: Conversion failed. Make sure Python is installed.
)
pause
