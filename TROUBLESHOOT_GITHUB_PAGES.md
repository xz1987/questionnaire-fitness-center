# GitHub Pages 显示问题排查指南

## 问题：GitHub Pages 显示效果与本地不同

### 可能的原因和解决方案

#### 1. 图片不显示

**问题**：图片路径在 GitHub Pages 上不正确

**解决方案**：
- 确保 `tablet-version/images/` 文件夹已上传到 GitHub
- 检查图片路径是否为相对路径：`images/comfort-zone-v1.jpg`
- 如果从 `/tablet-version` 文件夹部署，路径应该是 `images/`（不是 `/images/` 或 `./images/`）

**验证方法**：
1. 在 GitHub 仓库中检查 `tablet-version/images/` 文件夹是否存在
2. 在浏览器中打开开发者工具（F12）
3. 查看 Console（控制台）是否有 404 错误
4. 查看 Network（网络）标签，检查图片请求的 URL

#### 2. CSS 样式不生效

**问题**：内联样式应该总是生效，但如果表格不显示，可能是 CSS 被覆盖

**解决方案**：
- 所有样式都使用了 `!important`，应该能覆盖
- 检查浏览器控制台是否有 CSS 错误
- 尝试清除浏览器缓存

#### 3. JavaScript 不执行

**问题**：ES5 代码应该兼容，但可能有语法错误

**解决方案**：
1. 打开浏览器开发者工具（F12）
2. 查看 Console（控制台）标签
3. 检查是否有 JavaScript 错误
4. 如果有错误，截图发给我修复

#### 4. 文件没有正确部署

**问题**：GitHub Pages 可能没有检测到最新更改

**解决方案**：
1. 确认文件已提交并推送：
   ```bash
   git status
   git log --oneline -5
   ```
2. 在 GitHub 仓库页面检查文件是否存在
3. 在 GitHub Pages 设置中：
   - 确认 Source 选择了正确的分支
   - 确认 Folder 选择了 `/tablet-version`
   - 点击 "Save" 重新部署

#### 5. 缓存问题

**问题**：浏览器或 GitHub Pages 缓存了旧版本

**解决方案**：
1. **清除浏览器缓存**：
   - Chrome/Edge: Ctrl+Shift+Delete (Windows) 或 Cmd+Shift+Delete (Mac)
   - 选择"缓存的图片和文件"
   - 点击"清除数据"

2. **强制刷新**：
   - Windows: Ctrl+F5
   - Mac: Cmd+Shift+R

3. **使用无痕模式**：
   - 打开新的无痕/隐私窗口
   - 访问网站

4. **等待 GitHub 更新**：
   - GitHub Pages 可能需要 1-5 分钟更新
   - 可以尝试在 URL 后加随机参数：`?v=123`

#### 6. GitHub Pages 设置错误

**问题**：选择了错误的文件夹或分支

**解决方案**：
1. 进入仓库 Settings → Pages
2. 确认设置：
   - Source: **Deploy from a branch**
   - Branch: **main** (或你的默认分支)
   - Folder: **/tablet-version** ⬅️ 必须是这个！
3. 点击 Save
4. 等待 1-2 分钟

---

## 🔍 诊断步骤

### 步骤 1：检查文件是否在 GitHub 上

1. 访问你的 GitHub 仓库
2. 点击进入 `tablet-version/` 文件夹
3. 确认以下文件存在：
   - ✅ `index.html`
   - ✅ `images/comfort-zone-v1.jpg`
   - ✅ `images/comfort-zone-v2.jpg`
   - ✅ `README.md`

### 步骤 2：检查 GitHub Pages 设置

1. 仓库 → Settings → Pages
2. 确认：
   - Source: Deploy from a branch
   - Branch: main (或 master)
   - **Folder: /tablet-version** ⬅️ 关键！

### 步骤 3：检查浏览器控制台

1. 打开网站
2. 按 F12 打开开发者工具
3. 查看 **Console** 标签：
   - 是否有红色错误？
   - 截图发给我

4. 查看 **Network** 标签：
   - 刷新页面
   - 检查哪些资源加载失败（红色）
   - 特别是图片文件

### 步骤 4：检查实际 URL

**如果从 `/tablet-version` 文件夹部署**：
- 网站 URL: `https://[username].github.io/[repo]/`
- 实际文件: `https://[username].github.io/[repo]/index.html`
- 图片路径应该是: `images/comfort-zone-v1.jpg`（相对路径）

**验证图片 URL**：
- 在浏览器中直接访问：`https://[username].github.io/[repo]/images/comfort-zone-v1.jpg`
- 如果能看到图片，说明路径正确
- 如果 404，说明图片文件没有上传或路径错误

---

## 🛠️ 快速修复

### 如果图片不显示：

1. **检查图片文件是否上传**：
   ```bash
   # 在本地检查
   ls -la tablet-version/images/
   
   # 应该看到：
   # comfort-zone-v1.jpg
   # comfort-zone-v2.jpg
   ```

2. **重新上传图片**：
   ```bash
   git add tablet-version/images/
   git commit -m "Fix: Ensure images are uploaded"
   git push origin main
   ```

3. **等待 GitHub Pages 更新**（1-2 分钟）

### 如果样式不显示：

所有样式都是内联的，应该总是生效。如果表格不显示：
1. 检查浏览器控制台错误
2. 尝试不同的浏览器
3. 检查是否有浏览器扩展干扰

### 如果 JavaScript 不工作：

1. 打开浏览器控制台（F12）
2. 查看错误信息
3. 截图发给我

---

## 📸 需要的信息

如果问题仍然存在，请提供：

1. **GitHub 仓库 URL**
2. **GitHub Pages 网站 URL**
3. **浏览器控制台截图**（F12 → Console）
4. **Network 标签截图**（F12 → Network，刷新页面）
5. **GitHub Pages 设置截图**（Settings → Pages）

---

## ✅ 验证清单

部署成功后，应该能看到：

- [ ] 页面标题："Finger Lakes Fitness Center - Renovation Survey"
- [ ] 所有表格都显示（有边框）
- [ ] 所有单选按钮和复选框都可见（28px 大小）
- [ ] 图片显示（舒适区渲染图）
- [ ] 表单可以填写
- [ ] 提交按钮可以点击
- [ ] 没有控制台错误

如果以上任何一项不满足，请按照上面的诊断步骤检查。

