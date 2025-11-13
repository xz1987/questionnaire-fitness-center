# 快速修复指南 - "Script function not found: doGet" 错误

## 🚨 问题

访问 Web App URL 时出现错误：`Script function not found: doGet`

## ✅ 快速解决方案

### 方法 1: 重新部署（推荐）

1. **打开 Google Apps Script 编辑器**
   - 访问 [script.google.com](https://script.google.com)
   - 找到你的项目

2. **检查代码**
   - 确认 `Code.gs` 文件中有 `doGet` 和 `doPost` 函数
   - 如果没有，复制项目中的 `Code.gs` 文件内容

3. **保存代码**
   - 点击 **文件** → **保存** (或按 `Ctrl+S` / `Cmd+S`)
   - 确认没有错误提示

4. **重新部署**
   - 点击 **部署** → **管理部署**
   - 点击现有部署旁边的编辑图标（铅笔图标）
   - 选择 **"新版本"**
   - 点击 **部署**
   - **重要**：确保访问权限设置为 **"任何人"**

5. **测试**
   - 访问你的 Web App URL
   - 应该看到 JSON 响应，而不是错误

### 方法 2: 创建新部署

如果方法 1 不起作用：

1. **删除旧部署**
   - 点击 **部署** → **管理部署**
   - 删除现有部署

2. **创建新部署**
   - 点击 **部署** → **新建部署**
   - 选择 **Web 应用**
   - 设置：
     - **执行身份**：我
     - **谁可以访问**：**任何人** ⚠️ 必须选择
   - 点击 **部署**
   - 复制新的 Web App URL

3. **更新前端代码**
   - 在 `index.html` 中更新 `GOOGLE_APPS_SCRIPT_URL`

## 🔍 验证步骤

### 步骤 1: 测试 Web App URL

在浏览器中访问你的 Web App URL，应该看到：

```json
{
  "success": true,
  "message": "Google Apps Script is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### 步骤 2: 测试表单提交

1. 打开表单页面
2. 打开浏览器控制台（F12）
3. 填写并提交表单
4. 查看控制台输出

**期望的控制台输出：**
```
📋 Form data collected: {...}
🔄 Attempting to submit to Google Sheets...
📤 Submitting to Google Sheets: {...}
✅ Successfully submitted to Google Sheets
💾 Saving to localStorage...
✅ Successfully saved to localStorage
```

### 步骤 3: 检查 Google Sheets

1. 打开你的 Google Sheets
2. 检查是否有新数据行
3. 验证数据是否正确

## ⚠️ 常见错误

### 错误 1: 仍然显示 "Script function not found"

**原因**：代码没有正确保存或部署

**解决**：
1. 确认代码已保存（没有红色错误提示）
2. 确认部署时选择了正确的版本
3. 等待几分钟后重试（部署可能需要时间）

### 错误 2: 401 未授权

**原因**：访问权限设置不正确

**解决**：
1. 确保 Web App 访问权限设置为 **"任何人"**
2. 重新部署

### 错误 3: 数据没有写入

**原因**：Spreadsheet ID 或 Sheet 名称配置错误

**解决**：
1. 检查 `Code.gs` 中的 `SPREADSHEET_ID`
2. 检查 `SHEET_NAME` 是否与 Google Sheets 中的名称匹配
3. 重新部署

## 📋 检查清单

在提交表单前，确认：

- [ ] Web App URL 可以访问（返回 JSON，不是错误）
- [ ] `Code.gs` 中的 `SPREADSHEET_ID` 已正确配置
- [ ] `Code.gs` 中的 `SHEET_NAME` 与 Google Sheets 匹配
- [ ] Web App 访问权限设置为 "任何人"
- [ ] `index.html` 中的 `GOOGLE_APPS_SCRIPT_URL` 已更新
- [ ] 浏览器控制台没有 JavaScript 错误

## 🎯 成功标志

当一切正常时：

1. ✅ 访问 Web App URL 返回 JSON 响应
2. ✅ 提交表单时按钮显示加载动画
3. ✅ 控制台显示成功消息
4. ✅ 页面显示成功提示
5. ✅ Google Sheets 中有新数据

---

**如果问题仍然存在，请查看 `TESTING_AND_DEBUG.md` 获取更详细的调试指南。**

