# GitHub Pages 快速部署指南

## 🚀 一键部署命令

### 方法 1: 使用部署脚本（推荐）

**macOS/Linux:**
```bash
./DEPLOY_TO_GITHUB_PAGES.sh
```

**Windows:**
```cmd
DEPLOY_TO_GITHUB_PAGES.bat
```

### 方法 2: 手动部署

```bash
# 1. 初始化 Git（如果还没有）
git init

# 2. 添加文件
git add index.html images/ .nojekyll

# 3. 提交
git commit -m "Deploy to GitHub Pages"

# 4. 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/[username]/[repository-name].git

# 5. 推送
git branch -M main
git push -u origin main
```

## ⚙️ 启用 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings** → **Pages**
3. 在 **Source** 下选择 **"Deploy from a branch"**
4. 选择 **"main"** 分支和 **"/ (root)"** 文件夹
5. 点击 **Save**
6. 等待 1-2 分钟，访问 `https://[username].github.io/[repository-name]`

## 📋 已完成的修改

✅ **所有文件路径改为相对路径**
- 图片路径：`images/${selectedImageVersion}.jpg`
- 所有资源使用相对路径

✅ **移除所有文件系统操作**
- 不再使用 `fs.writeFileSync`、`fs.appendFileSync` 等
- 不再依赖 Node.js 服务器

✅ **使用 localStorage 保存数据**
- 响应保存在浏览器本地
- 提供 CSV 导出功能（访问 `?admin=1`）

✅ **创建配置文件**
- `.nojekyll` - 禁用 Jekyll 处理

## 📁 需要部署的文件

- ✅ `index.html`
- ✅ `images/` 文件夹
- ✅ `.nojekyll`

## 🔧 管理员功能

访问 `https://[your-site-url]/?admin=1` 可以：
- 查看导出按钮
- 导出所有保存在该浏览器中的响应为 CSV

## ⚠️ 重要提示

- 数据保存在浏览器 localStorage 中
- 每个浏览器独立存储
- 清除浏览器数据会删除所有响应
- 需要定期导出数据备份

## 📚 详细文档

查看 `GITHUB_PAGES_DEPLOY.md` 获取完整部署说明。

