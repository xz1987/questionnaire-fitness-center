# GitHub Pages 部署指南

## 📋 概述

本项目已配置为支持 GitHub Pages 部署。所有文件路径已改为相对路径，并移除了所有服务器端文件系统操作。数据现在保存在浏览器的 localStorage 中。

## ✅ 已完成的修改

1. ✅ **所有文件路径改为相对路径**
   - 图片路径：`images/${selectedImageVersion}.jpg`
   - 所有资源使用相对路径

2. ✅ **移除所有文件系统操作**
   - 不再使用 `fs.writeFileSync`、`fs.appendFileSync` 等
   - 不再依赖 Node.js 服务器

3. ✅ **使用 localStorage 保存数据**
   - 响应保存在浏览器的 localStorage 中
   - 提供 CSV 导出功能（管理员模式）

4. ✅ **创建 GitHub Pages 配置文件**
   - `.nojekyll` 文件（禁用 Jekyll 处理）

## 🚀 部署步骤

### 方法 1: 使用 GitHub Web 界面

1. **创建 GitHub 仓库**
   - 登录 GitHub
   - 点击右上角 "+" → "New repository"
   - 输入仓库名称（例如：`fitness-center-survey`）
   - 选择 Public 或 Private
   - 点击 "Create repository"

2. **上传文件**
   - 在仓库页面，点击 "uploading an existing file"
   - 拖拽以下文件到页面：
     - `index.html`
     - `images/` 文件夹（包含所有图片）
   - 点击 "Commit changes"

3. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 在左侧菜单找到 "Pages"
   - 在 "Source" 下选择 "Deploy from a branch"
   - 选择 "main" 分支和 "/ (root)" 文件夹
   - 点击 "Save"
   - 等待几分钟，GitHub 会提供你的网站 URL（格式：`https://[username].github.io/[repository-name]`）

### 方法 2: 使用 Git 命令行

#### 首次部署

```bash
# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add index.html images/ .nojekyll

# 3. 提交更改
git commit -m "Initial commit: GitHub Pages deployment"

# 4. 添加远程仓库（替换为你的仓库 URL）
git remote add origin https://github.com/[username]/[repository-name].git

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 启用 GitHub Pages

1. 在 GitHub 仓库页面，进入 **Settings** → **Pages**
2. 在 "Source" 下选择 **"Deploy from a branch"**
3. 选择 **"main"** 分支和 **"/ (root)"** 文件夹
4. 点击 **"Save"**
5. 等待几分钟，访问 `https://[username].github.io/[repository-name]`

#### 更新部署

```bash
# 1. 修改文件后，添加更改
git add .

# 2. 提交更改
git commit -m "Update survey form"

# 3. 推送到 GitHub
git push origin main
```

GitHub Pages 会自动重新部署（通常需要 1-2 分钟）。

## 📁 需要部署的文件

### 必需文件
- ✅ `index.html` - 主页面
- ✅ `images/` - 图片文件夹
  - `comfort-zone-v1.jpg`
  - `comfort-zone-v2.jpg`
- ✅ `.nojekyll` - 禁用 Jekyll 处理

### 不需要的文件（可选）
- ❌ `server.js` - 不再需要（纯静态部署）
- ❌ `package.json` - 不再需要
- ❌ `node_modules/` - 不再需要
- ❌ `responses.csv` - 数据保存在 localStorage

## 🔧 功能说明

### 数据保存
- 所有响应保存在浏览器的 **localStorage** 中
- 每个浏览器独立存储数据
- 数据不会跨设备同步

### 导出数据（管理员功能）
1. 访问：`https://[your-site-url]/?admin=1`
2. 点击 "Export Responses to CSV" 按钮
3. 下载 CSV 文件（包含所有保存在该浏览器中的响应）

**注意**：localStorage 是浏览器本地存储，只能导出当前浏览器中保存的数据。如果需要集中收集数据，建议：
- 使用第三方表单服务（如 Formspree、Google Forms）
- 或使用 GitHub Issues API（需要认证）
- 或定期从不同设备导出并合并 CSV 文件

## 🌐 访问网站

部署成功后，你的网站地址将是：
```
https://[username].github.io/[repository-name]
```

例如：
```
https://johndoe.github.io/fitness-center-survey
```

## ⚠️ 注意事项

1. **数据存储限制**
   - localStorage 有大小限制（通常 5-10MB）
   - 数据只保存在用户浏览器中
   - 清除浏览器数据会删除所有响应

2. **隐私和安全性**
   - 所有数据存储在用户本地浏览器
   - 不会发送到服务器
   - 管理员导出功能需要手动访问特定 URL

3. **跨设备数据**
   - localStorage 不会跨设备同步
   - 如果需要集中收集数据，考虑使用第三方服务

## 🔄 从服务器版本迁移

如果你之前使用服务器版本（`server.js`），现在想迁移到 GitHub Pages：

1. **导出现有数据**
   - 从 `responses.csv` 导出数据
   - 保存备份

2. **部署新版本**
   - 按照上述步骤部署到 GitHub Pages

3. **通知用户**
   - 新版本数据保存在浏览器本地
   - 需要定期导出数据

## 📞 故障排除

### 网站无法访问
- 检查 GitHub Pages 是否已启用
- 确认分支和文件夹设置正确
- 等待几分钟让 GitHub 完成部署

### 图片无法显示
- 确认 `images/` 文件夹已上传
- 检查图片文件名是否正确
- 确认使用相对路径

### 数据无法保存
- 检查浏览器是否支持 localStorage
- 检查浏览器是否禁用了本地存储
- 尝试清除浏览器缓存后重试

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

