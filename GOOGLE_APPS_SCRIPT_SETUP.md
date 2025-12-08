# 📝 Google Apps Script 完整设置指南

## 🎯 快速开始

### 步骤 1：创建 Google Sheets

1. 访问 https://docs.google.com/spreadsheets/
2. 创建新的空白表格
3. 从 URL 中复制 **SPREADSHEET_ID**
   - URL 格式：`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - 例如：`https://docs.google.com/spreadsheets/d/1abc123def456/edit`
   - SPREADSHEET_ID 就是 `1abc123def456`

### 步骤 2：打开 Apps Script

1. 在 Google Sheets 中，点击 **扩展程序** → **Apps Script**
2. 会打开一个新的标签页，显示 Apps Script 编辑器

### 步骤 3：复制代码

1. 打开本地的 `Code.gs` 文件
2. **全选复制**（Ctrl+A / Cmd+A，然后 Ctrl+C / Cmd+C）
3. 在 Apps Script 编辑器中，**删除所有现有代码**
4. **粘贴**新代码（Ctrl+V / Cmd+V）

### 步骤 4：修改配置

在代码中找到这两行（大约在第 19 和 22 行）：

```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';
```

**修改为：**

```javascript
const SPREADSHEET_ID = '你的实际SheetID';  // 从步骤1复制的ID
const SHEET_NAME = 'Sheet1';  // 如果你的Sheet名称不同，修改这里
```

### 步骤 5：保存代码

1. 点击 **保存** 图标（💾）或按 `Ctrl+S` (Windows) / `Cmd+S` (Mac)
2. 给项目起个名字，比如 "Fitness Center Survey"

### 步骤 6：部署为 Web App

1. 点击右上角的 **部署** → **新建部署**
2. 点击 **选择类型** → 选择 **Web 应用**
3. **重要设置**：
   - **说明**：可以填写 "Survey Data Collection"（可选）
   - **执行身份**：选择 **我**
   - **具有访问权限的用户**：选择 **任何人** ⬅️ **这个非常重要！**
4. 点击 **部署**
5. **首次部署**：会弹出授权提示
   - 点击 **授权访问**
   - 选择你的 Google 账号
   - 点击 **高级** → **转到 [项目名称]（不安全）**
   - 点击 **允许**
6. 部署成功后，会显示 **Web 应用 URL**
7. **复制这个 URL**，格式类似：
   ```
   https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec
   ```

### 步骤 7：更新前端代码

1. 打开 `index.html` 文件
2. 找到这一行（大约在第 976 行）：
   ```javascript
   var GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
3. 将 URL 替换为步骤 6 中复制的 URL
4. 保存文件

## ✅ 测试

### 方法 1：测试 Web App（最简单）

1. 在浏览器中打开你复制的 Web App URL
2. 应该看到：
   ```json
   {
     "success": true,
     "message": "Google Apps Script is running",
     "timestamp": "2024-12-07T...",
     "spreadsheetId": "你的SheetID",
     "sheetName": "Sheet1"
   }
   ```
3. 如果看到这个，说明部署成功！

### 方法 2：测试提交功能

1. 打开调查问卷页面
2. 填写并提交表单
3. 检查：
   - 浏览器控制台（F12）应该显示 "✅ Google Sheets submission successful"
   - Google Sheets 中应该出现新的一行数据

### 方法 3：在 Apps Script 中运行测试函数

1. 在 Apps Script 编辑器中，点击 **运行** 下拉菜单
2. 选择 `testFunction`
3. 点击 **运行**（▶️）
4. 首次运行需要授权，点击 **授权访问**
5. 查看 **执行日志**（查看 → 执行日志）
6. 应该看到 "Test result: ..." 和 "Sheet now has X rows"

## 🔧 常见问题

### 问题 1：部署时提示"需要授权"

**解决方法：**
1. 点击 **授权访问**
2. 选择你的 Google 账号
3. 如果看到"Google 尚未验证此应用"，点击 **高级**
4. 点击 **转到 [项目名称]（不安全）**
5. 点击 **允许**

### 问题 2：CORS 错误

**解决方法：**
1. 确保部署时 **"具有访问权限的用户"** 设置为 **"任何人"**
2. 如果已经部署，需要重新部署：
   - 点击 **部署** → 找到现有部署 → 点击 **编辑**（铅笔图标）
   - 确保 **"具有访问权限的用户"** 是 **"任何人"**
   - 点击 **部署**（会创建新版本）

### 问题 3：数据没有保存到 Sheet

**检查清单：**
- [ ] SPREADSHEET_ID 是否正确？
- [ ] SHEET_NAME 是否正确？（区分大小写）
- [ ] 是否有权限访问这个 Sheet？
- [ ] 查看 Apps Script 执行日志（查看 → 执行日志）是否有错误？

### 问题 4：修改代码后没有生效

**解决方法：**
- 修改代码后必须 **重新部署**
- 点击 **部署** → 找到现有部署 → 点击 **编辑**
- 点击 **部署**（会创建新版本）
- 或者创建新的部署

### 问题 5：找不到 SPREADSHEET_ID

**从 URL 获取：**
1. 打开你的 Google Sheets
2. 查看浏览器地址栏
3. URL 格式：`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
4. SPREADSHEET_ID 就是 `/d/` 和 `/edit` 之间的部分

## 📋 代码结构说明

### 主要函数

1. **`doPost(e)`** - 处理 POST 请求（前端提交数据时调用）
2. **`doGet(e)`** - 处理 GET 请求（测试用）
3. **`doOptions(e)`** - 处理 OPTIONS 请求（CORS 预检）

### 辅助函数

1. **`getCorsHeaders()`** - 返回 CORS 头设置
2. **`createSuccessResponse()`** - 创建成功响应
3. **`createErrorResponse()`** - 创建错误响应
4. **`getOrCreateSheet()`** - 获取或创建 Sheet
5. **`ensureHeaders()`** - 确保表头存在
6. **`convertDataToRow()`** - 将数据对象转换为行数组

### 配置常量

1. **`SPREADSHEET_ID`** - Google Sheets ID（必须修改）
2. **`SHEET_NAME`** - Sheet 名称（通常不需要修改）
3. **`CSV_COLUMNS`** - 列定义（与前端保持一致）

## 🔒 安全提示

1. **Web App URL 是公开的**，任何人都可以访问
2. 建议：
   - 定期检查 Sheet 中的数据
   - 如果发现异常数据，可以修改部署设置
   - 考虑添加数据验证（在 `doPost` 函数中）

## 📞 需要帮助？

如果遇到问题：

1. **查看执行日志**：
   - Apps Script 编辑器 → 查看 → 执行日志
   - 查看是否有错误信息

2. **测试 Web App**：
   - 在浏览器中打开 Web App URL
   - 查看返回的 JSON 响应

3. **检查浏览器控制台**：
   - 打开调查问卷页面
   - 按 F12 打开开发者工具
   - 查看 Console 标签中的错误信息

4. **验证数据格式**：
   - 确保前端发送的数据格式与 `CSV_COLUMNS` 匹配
   - 查看 `convertDataToRow` 函数中的字段映射

