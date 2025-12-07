# 如何将 tablet-version 设置为 GitHub Pages 发布版本

## 🎯 目标

让 GitHub Pages 使用 `tablet-version/` 目录作为网站的主页。

## 方法 1：在 GitHub Pages 设置中选择文件夹（推荐）

这是最简单的方法，不需要修改代码。

### 步骤：

1. **确保文件已提交到 GitHub**
   ```bash
   git add tablet-version/
   git commit -m "Add tablet-optimized version"
   git push origin main
   ```

2. **在 GitHub 网页上配置**
   - 访问你的 GitHub 仓库
   - 点击 **Settings**（设置）
   - 在左侧菜单找到 **Pages**（页面）
   - 在 **Source**（源）部分：
     - 选择 **"Deploy from a branch"**
     - Branch（分支）：选择 **"main"**（或你的默认分支）
     - Folder（文件夹）：**选择 "/tablet-version"** ⬅️ 重要！
   - 点击 **Save**（保存）

3. **等待部署**
   - GitHub 通常需要 1-2 分钟来部署
   - 部署完成后，你的网站地址将是：
     ```
     https://[username].github.io/[repository-name]
     ```
   - 网站将直接显示 `tablet-version/index.html` 的内容

### 优点：
- ✅ 不需要修改代码
- ✅ 保留原始版本在根目录
- ✅ 可以随时切换回根目录版本

---

## 方法 2：创建重定向（保留两个版本）

如果你想保留两个版本，可以让根目录的 `index.html` 重定向到 `tablet-version/`。

### 步骤：

1. **修改根目录的 `index.html`**（创建一个简单的重定向页面）

   在根目录的 `index.html` 开头添加：
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="refresh" content="0; url=tablet-version/">
       <title>Redirecting...</title>
   </head>
   <body>
       <p>正在跳转到平板优化版本...</p>
       <p>如果没有自动跳转，请<a href="tablet-version/">点击这里</a>。</p>
   </body>
   </html>
   ```

2. **提交更改**
   ```bash
   git add index.html
   git commit -m "Redirect to tablet-version"
   git push origin main
   ```

3. **在 GitHub Pages 设置中选择根目录**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: **"/ (root)"**

### 优点：
- ✅ 访问根 URL 自动跳转到平板版本
- ✅ 可以直接访问 `tablet-version/` 查看平板版本
- ✅ 可以保留原始版本在其他位置

---

## 方法 3：将 tablet-version 内容复制到根目录

如果你想用平板版本完全替换当前版本。

### 步骤：

1. **备份当前版本**（可选）
   ```bash
   mkdir -p backup
   cp index.html backup/index-original.html
   ```

2. **复制 tablet-version 到根目录**
   ```bash
   cp tablet-version/index.html index.html
   cp -r tablet-version/images images
   ```

3. **更新图片路径**（如果需要）
   - 检查 `index.html` 中的图片路径
   - 确保路径是 `images/comfort-zone-v1.jpg` 而不是 `tablet-version/images/...`

4. **提交更改**
   ```bash
   git add index.html images/
   git commit -m "Replace with tablet-optimized version"
   git push origin main
   ```

5. **在 GitHub Pages 设置中选择根目录**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: **"/ (root)"**

### 优点：
- ✅ 网站直接使用平板版本
- ✅ URL 更简洁（不需要 `/tablet-version/`）

### 缺点：
- ⚠️ 会覆盖原始版本（除非已备份）

---

## 方法 4：使用 GitHub Actions 自动部署（高级）

创建 GitHub Actions 工作流来自动部署。

### 步骤：

1. **创建 `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy Tablet Version to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       permissions:
         contents: read
         pages: write
         id-token: write
       
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Pages
           uses: actions/configure-pages@v3
         
         - name: Copy tablet-version to root
           run: |
             cp -r tablet-version/* .
             cp -r tablet-version/images images
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             path: '.'
         
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v2
   ```

2. **在 GitHub 设置中启用 Pages**
   - Settings → Pages
   - Source: **"GitHub Actions"** ⬅️ 选择这个！

3. **提交并推送**
   ```bash
   git add .github/
   git commit -m "Add GitHub Actions deployment"
   git push origin main
   ```

---

## 📋 推荐方案

**我推荐使用方法 1**（在 GitHub Pages 设置中选择 `/tablet-version` 文件夹），因为：
- ✅ 最简单，不需要修改代码
- ✅ 保留原始版本
- ✅ 可以随时切换
- ✅ 不需要额外的配置

## 🔍 验证部署

部署成功后，访问你的网站：
```
https://[username].github.io/[repository-name]
```

应该能看到平板优化版本的调查问卷。

## ⚠️ 注意事项

1. **图片路径**：确保 `tablet-version/index.html` 中的图片路径是相对路径：
   - ✅ 正确：`images/comfort-zone-v1.jpg`
   - ❌ 错误：`/images/comfort-zone-v1.jpg` 或 `tablet-version/images/...`

2. **部署时间**：GitHub Pages 通常需要 1-2 分钟来部署更改

3. **缓存**：如果看不到更新，尝试：
   - 清除浏览器缓存
   - 使用无痕模式访问
   - 或等待几分钟后重试

## 🆘 遇到问题？

如果部署后看不到更新：
1. 检查 GitHub Pages 设置中的文件夹选择是否正确
2. 检查文件是否已推送到 GitHub
3. 查看 GitHub Actions（如果使用）是否有错误
4. 等待几分钟后重试（GitHub 需要时间部署）

