@echo off
REM ============================================
REM Finger Lakes Fitness Center Survey - Windows Quick Start
REM ============================================
REM Simple script to start the server
REM ============================================

cd /d "%~dp0"

echo Starting server...
echo.
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

node server.js

pause



