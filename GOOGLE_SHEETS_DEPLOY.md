# Google Sheets 集成部署指南

本指南将帮助你配置表单数据自动提交到 Google Sheets 的功能。

## 📋 目录

1. [准备工作](#准备工作)
2. [创建 Google Sheets](#创建-google-sheets)
3. [设置 Google Apps Script](#设置-google-apps-script)
4. [部署 Web App](#部署-web-app)
5. [配置前端代码](#配置前端代码)
6. [测试](#测试)
7. [故障排除](#故障排除)

---

## 准备工作

### 所需条件

- ✅ Google 账号
- ✅ 访问 Google Drive 和 Google Sheets 的权限
- ✅ 访问 Google Apps Script 的权限

---

## 创建 Google Sheets

### 步骤 1: 创建新的 Google Sheets

1. 访问 [Google Sheets](https://sheets.google.com)
2. 点击 **"空白"** 创建新的电子表格
3. 给电子表格命名（例如：`Fitness Center Survey Responses`）

### 步骤 2: 获取 Spreadsheet ID

1. 查看浏览器地址栏，URL 格式如下：
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```
2. 复制 `SPREADSHEET_ID`（这是 URL 中 `/d/` 和 `/edit` 之间的部分）
3. 保存这个 ID，稍后会用到

**示例：**
- URL: `https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit`
- Spreadsheet ID: `1a2b3c4d5e6f7g8h9i0j`

---

## 设置 Google Apps Script

### 步骤 1: 打开 Apps Script 编辑器

1. 在 Google Sheets 中，点击顶部菜单 **扩展程序** → **Apps Script**
2. 这会打开一个新的标签页，显示 Apps Script 编辑器

### 步骤 2: 复制代码

1. 打开项目中的 `Code.gs` 文件
2. 复制所有代码
3. 在 Apps Script 编辑器中，删除默认的 `myFunction()` 代码
4. 粘贴复制的代码

### 步骤 3: 配置 Spreadsheet ID

1. 在代码中找到这一行：
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
2. 将 `YOUR_SPREADSHEET_ID_HERE` 替换为你在步骤 2 中复制的 Spreadsheet ID
   ```javascript
   const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j';
   ```

### 步骤 4: 配置 Sheet 名称（可选）

1. 默认 Sheet 名称是 `Sheet1`
2. 如果你想使用不同的名称，修改这一行：
   ```javascript
   const SHEET_NAME = 'Sheet1'; // 改为你想要的名称
   ```

### 步骤 5: 保存项目

1. 点击顶部菜单 **文件** → **保存**
2. 给项目命名（例如：`Survey Data Handler`）
3. 点击 **确定**

---

## 部署 Web App

### 步骤 1: 部署为 Web App

1. 在 Apps Script 编辑器中，点击顶部菜单 **部署** → **新建部署**
2. 点击 **选择类型** 旁边的齿轮图标 ⚙️
3. 选择 **Web 应用**

### 步骤 2: 配置部署设置

1. **说明**（可选）：输入部署说明，例如 "Survey Form Handler v1"
2. **执行身份**：选择 **"我"**（Me）
3. **谁可以访问**：选择 **"任何人"**（Anyone）
   - ⚠️ **重要**：必须选择 "任何人"，否则前端无法访问
4. 点击 **部署**

### 步骤 3: 授权访问

1. 首次部署时，Google 会要求你授权
2. 点击 **"授权访问"**
3. 选择你的 Google 账号
4. 点击 **"高级"** → **"转到 [项目名称]（不安全）"**
   - 这是正常的，因为这是你自己的脚本
5. 点击 **"允许"** 授予权限

### 步骤 4: 获取 Web App URL

1. 部署成功后，你会看到一个对话框，显示 **"Web 应用"**
2. 复制 **Web 应用 URL**（格式类似：`https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`）
3. 保存这个 URL，稍后会用到

**示例 URL：**
```
https://script.google.com/macros/s/AKfycbx1234567890abcdefghijklmnopqrstuvwxyz/exec
```

### 步骤 5: 测试部署（可选）

1. 在浏览器中打开 Web App URL
2. 你应该看到 JSON 响应：
   ```json
   {
     "success": true,
     "message": "Google Apps Script is running",
     "timestamp": "2024-01-01T12:00:00.000Z"
   }
   ```
3. 如果看到这个响应，说明部署成功！

---

## 配置前端代码

### 步骤 1: 打开 index.html

1. 在项目中打开 `index.html` 文件
2. 找到 `<script>` 标签开始的部分

### 步骤 2: 配置 Google Apps Script URL

1. 找到这一行：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = '';
   ```
2. 将你在步骤 4 中复制的 Web App URL 粘贴进去：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

### 步骤 3: 保存文件

1. 保存 `index.html` 文件
2. 如果使用 GitHub Pages，提交并推送更改

---

## 测试

### 步骤 1: 打开表单页面

1. 在浏览器中打开你的表单页面
2. 打开浏览器开发者工具（F12 或右键 → 检查）
3. 切换到 **Console**（控制台）标签

### 步骤 2: 填写并提交表单

1. 填写表单的所有必填字段
2. 点击 **"Submit Survey"** 按钮
3. 观察控制台输出

### 步骤 3: 检查结果

**成功的情况：**
- 控制台显示：`Successfully submitted to Google Sheets`
- 页面显示成功消息：`Thank you! Your response has been saved successfully.`
- 在 Google Sheets 中，你应该看到新的一行数据

**失败的情况：**
- 控制台显示错误信息
- 页面可能显示错误消息
- 参考 [故障排除](#故障排除) 部分

### 步骤 4: 验证 Google Sheets

1. 打开你的 Google Sheets
2. 检查第一行是否有表头（自动创建）
3. 检查是否有新的数据行
4. 验证数据是否正确

---

## 故障排除

### 问题 1: CORS 错误

**错误信息：**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**解决方案：**
1. 确保 Google Apps Script Web App 的访问权限设置为 **"任何人"**
2. 重新部署 Web App
3. 清除浏览器缓存并重试

### 问题 2: 401 未授权错误

**错误信息：**
```
HTTP error! status: 401
```

**解决方案：**
1. 检查 Web App 的访问权限是否为 **"任何人"**
2. 重新部署 Web App
3. 确保 URL 正确

### 问题 3: 数据没有写入 Google Sheets

**可能原因：**
1. Spreadsheet ID 配置错误
2. Sheet 名称不匹配
3. 权限问题

**解决方案：**
1. 检查 `Code.gs` 中的 `SPREADSHEET_ID` 是否正确
2. 检查 `SHEET_NAME` 是否与 Google Sheets 中的 Sheet 名称匹配
3. 在 Apps Script 编辑器中运行 `testFunction()` 进行测试
4. 检查 Apps Script 的执行日志（查看 → 执行日志）

### 问题 4: 表头没有自动创建

**解决方案：**
1. 确保 Google Sheets 的第一行是空的，或者
2. 手动删除第一行，让脚本自动创建表头

### 问题 5: 数据格式不正确

**解决方案：**
1. 检查 `Code.gs` 中的 `CSV_COLUMNS` 数组是否与前端一致
2. 检查 `convertDataToRow()` 函数中的字段映射是否正确

### 问题 6: 响应解析错误

**错误信息：**
```
Failed to submit to Google Sheets: ...
```

**解决方案：**
1. 检查浏览器控制台的详细错误信息
2. 在 Apps Script 编辑器中查看执行日志
3. 确保 `doPost()` 函数返回正确的 JSON 格式

---

## 高级配置

### 自定义 Sheet 名称

如果你想将数据写入不同的 Sheet：

1. 在 Google Sheets 中创建新的 Sheet（或使用现有的）
2. 在 `Code.gs` 中修改：
   ```javascript
   const SHEET_NAME = '你的 Sheet 名称';
   ```
3. 重新部署 Web App

### 添加数据验证

你可以在 `doPost()` 函数中添加数据验证：

```javascript
function doPost(e) {
  try {
    let data = JSON.parse(e.postData.contents);
    
    // 添加验证
    if (!data.overall_satisfaction) {
      throw new Error('Overall satisfaction is required');
    }
    
    // ... 其余代码
  } catch (error) {
    // ... 错误处理
  }
}
```

### 发送邮件通知（可选）

如果你想在收到新提交时收到邮件通知，可以在 `doPost()` 函数末尾添加：

```javascript
// 在 doPost() 函数的成功响应之前添加
MailApp.sendEmail({
  to: 'your-email@example.com',
  subject: 'New Survey Response',
  body: 'A new survey response has been received.'
});
```

---

## 安全注意事项

1. **Web App URL 是公开的**：任何人拥有 URL 都可以提交数据
2. **限制访问**：考虑添加简单的验证机制（如 API 密钥）
3. **数据隐私**：确保 Google Sheets 的共享设置符合你的隐私要求
4. **定期备份**：定期导出 Google Sheets 数据作为备份

---

## 更新部署

如果你修改了 `Code.gs` 代码：

1. 在 Apps Script 编辑器中保存更改
2. 点击 **部署** → **管理部署**
3. 点击部署旁边的编辑图标（铅笔图标）
4. 选择 **"新版本"**
5. 点击 **部署**
6. 使用相同的 Web App URL（不需要修改前端代码）

---

## 常见问题 (FAQ)

### Q: 可以同时使用 localStorage 和 Google Sheets 吗？

**A:** 是的！代码已经配置为同时保存到两个位置。如果 Google Sheets 提交失败，数据仍会保存到 localStorage。

### Q: 如何查看提交历史？

**A:** 在 Google Sheets 中，你可以看到所有提交的数据。每行代表一次提交。

### Q: 可以限制谁可以提交数据吗？

**A:** 可以，但需要额外的验证机制。Google Apps Script Web App 本身不支持身份验证限制（如果设置为"任何人"）。你可以：
- 添加简单的 API 密钥验证
- 使用 Google OAuth 进行身份验证
- 在服务器端添加验证

### Q: 数据会自动刷新吗？

**A:** Google Sheets 会实时更新。当你提交表单后，数据会立即出现在 Google Sheets 中。

### Q: 可以修改数据格式吗？

**A:** 可以。修改 `Code.gs` 中的 `CSV_COLUMNS` 和 `convertDataToRow()` 函数，然后重新部署。

---

## 支持

如果遇到问题：

1. 检查浏览器控制台的错误信息
2. 检查 Apps Script 的执行日志
3. 参考本文档的故障排除部分
4. 确保所有配置步骤都正确完成

---

## 总结

完成以上步骤后，你的表单数据将自动提交到 Google Sheets。每次用户提交表单时：

1. ✅ 数据以 JSON 格式发送到 Google Apps Script
2. ✅ Google Apps Script 接收数据并写入 Google Sheets
3. ✅ 用户收到成功/失败反馈
4. ✅ 数据同时保存到 localStorage（作为备份）

祝你部署顺利！🎉

