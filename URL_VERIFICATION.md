# URL 配置验证指南

## ✅ 当前配置状态

**Web App URL 已配置**：
```
https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec
```

**配置文件位置**：`index.html` 第 963 行

## 🧪 验证步骤

### 步骤 1: 测试 Web App URL

在浏览器中访问你的 URL：
```
https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec
```

**期望结果** ✅：
```json
{
  "success": true,
  "message": "Google Apps Script is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**如果看到错误** ❌：
- `Script function not found: doGet` → 需要重新部署（参考 `DEPLOY_FIX_STEPS.md`）
- `401 Unauthorized` → 检查访问权限设置
- 其他错误 → 检查 Google Apps Script 代码

### 步骤 2: 验证前端配置

1. 打开 `index.html` 文件
2. 确认第 963 行：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec';
   ```
3. 确认 URL 完全匹配

### 步骤 3: 测试表单提交

1. **打开表单页面**
   - 本地文件或 GitHub Pages

2. **打开浏览器开发者工具**
   - 按 `F12` 或右键 → 检查
   - 切换到 **Console**（控制台）标签

3. **填写并提交表单**
   - 填写所有必填字段
   - 点击 **"Submit Survey"** 按钮

4. **观察控制台输出**

   **成功时的输出** ✅：
   ```
   📋 Form data collected: {responses: {...}, timestamp: "..."}
   🔄 Attempting to submit to Google Sheets...
   📤 Submitting to Google Sheets: {url: "...", data: {...}}
   ✅ Successfully submitted to Google Sheets
   💾 Saving to localStorage...
   ✅ Successfully saved to localStorage
   ```

   **失败时的输出** ❌：
   ```
   ❌ Google Sheets submission error: ...
   ```

5. **检查页面反馈**
   - 成功：显示绿色成功消息
   - 失败：显示红色错误消息

### 步骤 4: 验证 Google Sheets

1. 打开你的 Google Sheets
2. 检查是否有新数据行
3. 验证数据字段是否正确

## 🔧 如果 URL 不工作

### 问题 1: Script function not found

**解决方案**：
1. 打开 Google Apps Script 编辑器
2. 确认 `Code.gs` 已保存
3. 重新部署 Web App
4. 参考 `DEPLOY_FIX_STEPS.md` 获取详细步骤

### 问题 2: 需要更新 URL

如果 Google Apps Script 部署后生成了新的 URL：

1. **复制新 URL**
2. **更新 `index.html`**：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = '新的 URL';
   ```
3. **保存文件**
4. **重新测试**

## 📋 配置检查清单

- [ ] Web App URL 在 `index.html` 中正确配置
- [ ] 访问 URL 返回 JSON 响应（不是错误）
- [ ] Google Apps Script 代码已正确部署
- [ ] Web App 访问权限设置为 "任何人"
- [ ] `SPREADSHEET_ID` 在 `Code.gs` 中已配置
- [ ] 表单可以成功提交
- [ ] Google Sheets 中有新数据

## 🎯 快速测试命令

如果你想快速测试 URL 是否工作，可以在浏览器控制台运行：

```javascript
// 测试 GET 请求
fetch('https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec')
  .then(response => response.text())
  .then(data => console.log('Response:', data))
  .catch(error => console.error('Error:', error));
```

**期望输出**：
```
Response: {"success":true,"message":"Google Apps Script is running","timestamp":"..."}
```

## ✅ 配置确认

你的 URL 已经在代码中正确配置。现在需要：

1. ✅ **确认 Google Apps Script 已正确部署**
   - 访问 URL 应该返回 JSON，而不是错误

2. ✅ **测试表单提交功能**
   - 填写表单并提交
   - 检查控制台输出
   - 验证 Google Sheets 数据

3. ✅ **如果遇到问题**
   - 参考 `DEPLOY_FIX_STEPS.md` 修复部署问题
   - 参考 `TESTING_AND_DEBUG.md` 进行调试

---

**当前状态**：URL 已配置 ✅  
**下一步**：验证 Google Apps Script 部署是否正常工作

