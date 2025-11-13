@echo off
REM ============================================
REM Finger Lakes Fitness Center Survey
REM Portable Deployment Script for Windows
REM ============================================
REM This script ensures the application can run on any Windows computer
REM It checks all prerequisites and installs dependencies if needed
REM ============================================

echo.
echo ============================================
echo Finger Lakes Fitness Center Survey
echo Portable Deployment Script
echo ============================================
echo.

REM Change to script directory (ensures it works from any location)
cd /d "%~dp0"

REM Display current directory for debugging
echo [INFO] Working directory: %CD%
echo.

REM ============================================
REM Step 1: Check for required files
REM ============================================
echo [STEP 1] Checking required files...

set MISSING_FILES=0

if not exist "package.json" (
    echo [ERROR] package.json not found!
    set MISSING_FILES=1
)

if not exist "server.js" (
    echo [ERROR] server.js not found!
    set MISSING_FILES=1
)

if not exist "index.html" (
    echo [ERROR] index.html not found!
    set MISSING_FILES=1
)

if not exist "images" (
    echo [WARNING] images folder not found!
    echo [WARNING] Images will not display correctly
)

if %MISSING_FILES%==1 (
    echo.
    echo [ERROR] Required files are missing!
    echo Please ensure all files are in the same folder.
    echo.
    pause
    exit /b 1
)

echo [SUCCESS] All required files found
echo.

REM ============================================
REM Step 2: Check Node.js installation
REM ============================================
echo [STEP 2] Checking Node.js installation...

where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, restart this script.
    echo.
    pause
    exit /b 1
)

REM Get Node.js version
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo [SUCCESS] Node.js found: %NODE_VERSION%
echo.

REM Check npm
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH
    echo npm should come with Node.js installation.
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo [SUCCESS] npm found: %NPM_VERSION%
echo.

REM ============================================
REM Step 3: Install/Verify dependencies
REM ============================================
echo [STEP 3] Checking dependencies...

if not exist "node_modules" (
    echo [INFO] Dependencies not found
    echo [INFO] Installing dependencies (this may take 2-5 minutes)...
    echo [INFO] Please wait...
    echo.
    
    call npm install --production
    if %errorlevel% neq 0 (
        echo.
        echo [ERROR] Failed to install dependencies
        echo Possible causes:
        echo   - No internet connection
        echo   - Firewall blocking npm
        echo   - npm registry issues
        echo.
        echo Trying with full dependencies...
        call npm install
        if %errorlevel% neq 0 (
            echo [ERROR] Installation failed. Please check your internet connection.
            echo.
            pause
            exit /b 1
        )
    )
    echo.
    echo [SUCCESS] Dependencies installed successfully
) else (
    echo [INFO] Dependencies found
    echo [INFO] Verifying dependencies...
    
    REM Quick check if express is installed
    if not exist "node_modules\express" (
        echo [WARNING] Dependencies appear incomplete
        echo [INFO] Reinstalling dependencies...
        call npm install
        if %errorlevel% neq 0 (
            echo [ERROR] Failed to reinstall dependencies
            echo.
            pause
            exit /b 1
        )
    )
    echo [SUCCESS] Dependencies verified
)

echo.

REM ============================================
REM Step 4: Check port availability
REM ============================================
echo [STEP 4] Checking port availability...

netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel%==0 (
    echo [WARNING] Port 3000 is already in use
    echo [INFO] Attempting to free the port...
    
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        echo [INFO] Stopping process on port 3000 (PID: %%a)
        taskkill /PID %%a /F >nul 2>&1
    )
    
    timeout /t 2 /nobreak >nul
    
    REM Check again
    netstat -ano | findstr :3000 >nul 2>&1
    if %errorlevel%==0 (
        echo [WARNING] Port 3000 is still in use
        echo [INFO] You may need to manually stop the process
        echo [INFO] Or the server will try to use the port anyway
    ) else (
        echo [SUCCESS] Port 3000 is now available
    )
) else (
    echo [SUCCESS] Port 3000 is available
)

echo.

REM ============================================
REM Step 5: Start the server
REM ============================================
echo ============================================
echo [READY] Starting server...
echo ============================================
echo.
echo Server URL: http://localhost:3000
echo.
echo To stop the server, press Ctrl+C
echo.
echo ============================================
echo.

node server.js

REM Check exit code
if %errorlevel% neq 0 (
    echo.
    echo ============================================
    echo [ERROR] Server exited with error code: %errorlevel%
    echo ============================================
    echo.
    echo Possible causes:
    echo   - Port 3000 is still in use
    echo   - Missing dependencies
    echo   - File permissions issue
    echo   - Corrupted files
    echo.
    echo Please check the error messages above.
    echo.
)

pause
