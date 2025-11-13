@echo off
REM GitHub Pages 快速部署脚本 (Windows)

echo ==========================================
echo GitHub Pages 部署脚本
echo ==========================================
echo.

REM 检查是否在 Git 仓库中
if not exist ".git" (
    echo 初始化 Git 仓库...
    git init
    echo ✅ Git 仓库已初始化
    echo.
)

REM 检查是否有远程仓库
git remote | findstr /C:"origin" >nul
if errorlevel 1 (
    echo ⚠️  未检测到远程仓库
    echo 请先创建 GitHub 仓库，然后运行：
    echo   git remote add origin https://github.com/[username]/[repository-name].git
    echo.
    set /p HAS_REPO="是否已创建 GitHub 仓库？(y/n): "
    if /i not "%HAS_REPO%"=="y" (
        echo 请先创建 GitHub 仓库，然后重新运行此脚本
        pause
        exit /b 1
    )
    set /p REPO_URL="请输入 GitHub 仓库 URL: "
    git remote add origin "%REPO_URL%"
    echo ✅ 远程仓库已添加
    echo.
)

REM 添加文件
echo 添加文件到 Git...
git add index.html images/ .nojekyll GITHUB_PAGES_DEPLOY.md
echo ✅ 文件已添加
echo.

REM 提交更改
echo 提交更改...
git commit -m "Deploy to GitHub Pages: Static survey form with localStorage"
echo ✅ 更改已提交
echo.

REM 推送到 GitHub
echo 推送到 GitHub...
git branch -M main
git push -u origin main
echo ✅ 已推送到 GitHub
echo.

echo ==========================================
echo 部署完成！
echo ==========================================
echo.
echo 下一步：
echo 1. 访问你的 GitHub 仓库
echo 2. 进入 Settings → Pages
echo 3. 在 Source 下选择 "Deploy from a branch"
echo 4. 选择 "main" 分支和 "/ (root)" 文件夹
echo 5. 点击 Save
echo 6. 等待几分钟，访问你的网站
echo.
echo 网站地址格式：
echo https://[username].github.io/[repository-name]
echo.

pause

