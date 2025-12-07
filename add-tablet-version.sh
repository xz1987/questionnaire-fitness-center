#!/bin/bash
# 添加 tablet-version 目录到 Git 并提交

echo "正在添加 tablet-version 目录到 Git..."
git add tablet-version/

echo "检查 Git 状态..."
git status

echo ""
echo "如果看到 tablet-version/ 目录在 'Changes to be committed' 下，"
echo "请运行以下命令提交："
echo ""
echo "  git commit -m 'Add tablet-optimized version of survey'"
echo ""
echo "然后推送到 GitHub："
echo ""
echo "  git push origin main"
echo ""
echo "（如果您的默认分支是 master，请使用 'git push origin master'）"

