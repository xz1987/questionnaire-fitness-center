# 🔧 修复：让 GitHub Pages 使用 tablet-version

## 问题
GitHub Pages 仍然显示主文件夹的 `index.html`，而不是 `tablet-version/index.html`。

## 解决方案

### 方法 1：在 GitHub 网页上正确设置（推荐）

1. **访问你的 GitHub 仓库**
2. **点击 Settings（设置）**
3. **在左侧菜单找到 Pages（页面）**
4. **在 Source（源）部分**：
   - 选择 **"Deploy from a branch"**
   - **Branch（分支）**：选择 `main`（或你的默认分支）
   - **Folder（文件夹）**：**必须选择 `/tablet-version`** ⬅️ 关键！
5. **点击 Save（保存）**
6. **等待 1-2 分钟让 GitHub 重新部署**

### 方法 2：创建重定向页面（如果方法1不行）

如果设置正确但还是显示主版本，可以在根目录创建一个简单的重定向页面。

**步骤：**
1. 备份当前的 `index.html`（如果需要保留）
2. 将根目录的 `index.html` 替换为简单的重定向页面
3. 这样访问根 URL 会自动跳转到 tablet-version

### 方法 3：将 tablet-version 内容复制到根目录

如果想用平板版本完全替换主版本。

---

## 📋 检查清单

在 GitHub Pages 设置中，确认：

- [ ] Source: **Deploy from a branch**（不是 "Deploy from a branch" 的其他选项）
- [ ] Branch: **main**（或你的默认分支名）
- [ ] **Folder: `/tablet-version`** ⬅️ 这个最重要！
- [ ] 点击了 **Save** 按钮
- [ ] 等待了 1-2 分钟

## 🔍 验证

设置完成后，访问你的网站：
```
https://[username].github.io/[repository-name]
```

应该看到：
- ✅ 平板优化版本的调查问卷
- ✅ 表格布局（不是 flexbox/grid）
- ✅ 28px 大小的表单输入
- ✅ 所有选项都可见

如果还是看到主版本，请尝试：
1. 清除浏览器缓存
2. 使用无痕模式访问
3. 等待更长时间（GitHub 可能需要 5 分钟）

