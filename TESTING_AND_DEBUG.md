# 测试和调试指南

## 🔍 当前状态

根据你提供的 Web App URL，访问时出现了 "Script function not found: doGet" 错误。这说明 Google Apps Script 代码可能没有正确部署。

## ✅ 已完成的配置

1. ✅ **URL 已配置**：`index.html` 中已设置你的 Web App URL
2. ✅ **跨域请求配置**：使用 `no-cors` 模式处理跨域
3. ✅ **加载状态指示器**：提交按钮显示加载动画
4. ✅ **调试模式**：已启用，控制台会输出详细信息

## 🛠️ 修复 Google Apps Script 部署问题

### 问题：Script function not found: doGet

这个错误通常是因为：
1. 代码没有正确保存
2. 部署时选择了错误的版本
3. 函数名称拼写错误

### 解决步骤

#### 步骤 1: 检查 Code.gs 文件

1. 打开 Google Apps Script 编辑器
2. 确认 `Code.gs` 文件中包含以下函数：
   - `doPost(e)` - 处理 POST 请求
   - `doGet(e)` - 处理 GET 请求（用于测试）

#### 步骤 2: 保存代码

1. 在 Apps Script 编辑器中，点击 **文件** → **保存**
2. 或者按 `Ctrl+S` (Windows) / `Cmd+S` (Mac)
3. 确认保存成功（没有错误提示）

#### 步骤 3: 重新部署

1. 点击 **部署** → **管理部署**
2. 找到现有的部署，点击编辑图标（铅笔图标）
3. 选择 **"新版本"**
4. 点击 **部署**
5. 确认使用相同的 Web App URL

#### 步骤 4: 测试部署

在浏览器中访问你的 Web App URL：
```
https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec
```

**期望结果：**
```json
{
  "success": true,
  "message": "Google Apps Script is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

如果仍然出现错误，继续下一步。

## 🧪 测试表单提交

### 步骤 1: 打开表单页面

1. 打开你的表单页面（本地或 GitHub Pages）
2. 打开浏览器开发者工具（F12 或右键 → 检查）
3. 切换到 **Console**（控制台）标签

### 步骤 2: 填写表单

1. 填写所有必填字段
2. 观察控制台输出（调试模式已启用）

### 步骤 3: 提交表单

1. 点击 **"Submit Survey"** 按钮
2. 观察以下内容：

**按钮状态：**
- ✅ 按钮应该显示加载动画（旋转的圆圈）
- ✅ 按钮文本变为 "Submitting..."
- ✅ 按钮被禁用

**控制台输出（调试模式）：**
```
📋 Form data collected: {responses: {...}, timestamp: "..."}
🔄 Attempting to submit to Google Sheets...
📤 Submitting to Google Sheets: {url: "...", data: {...}}
📥 Response received: Response {...}
✅ Successfully submitted to Google Sheets
💾 Saving to localStorage...
✅ Successfully saved to localStorage
```

**页面反馈：**
- ✅ 显示成功消息："Thank you! Your response has been saved successfully. (Submitted to Google Sheets)"
- ✅ 表单被重置

### 步骤 4: 验证数据

1. 打开你的 Google Sheets
2. 检查是否有新数据行
3. 验证数据是否正确

## 🐛 常见问题和解决方案

### 问题 1: 控制台显示 CORS 错误

**错误信息：**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**解决方案：**
- ✅ 代码已使用 `no-cors` 模式，应该不会出现此错误
- 如果仍然出现，检查 Web App 访问权限是否为 "任何人"

### 问题 2: 数据没有写入 Google Sheets

**可能原因：**
1. Spreadsheet ID 配置错误
2. Sheet 名称不匹配
3. 权限问题

**调试步骤：**

1. **检查 Spreadsheet ID**
   - 打开 `Code.gs` 文件
   - 确认 `SPREADSHEET_ID` 是否正确
   - 格式应该是：`1a2b3c4d5e6f7g8h9i0j`（没有引号外的其他字符）

2. **检查 Sheet 名称**
   - 打开 Google Sheets
   - 查看底部标签页的名称
   - 确认 `Code.gs` 中的 `SHEET_NAME` 与之匹配

3. **检查执行日志**
   - 在 Apps Script 编辑器中，点击 **查看** → **执行日志**
   - 查看是否有错误信息

4. **手动测试**
   - 在 Apps Script 编辑器中，选择 `testFunction`
   - 点击运行按钮
   - 查看是否有错误

### 问题 3: 按钮一直显示加载状态

**可能原因：**
- JavaScript 错误导致 `finally` 块未执行

**解决方案：**
1. 检查控制台是否有 JavaScript 错误
2. 刷新页面重试
3. 检查网络连接

### 问题 4: 成功消息显示但数据未保存

**可能原因：**
- Google Sheets 提交失败，但 localStorage 保存成功

**解决方案：**
1. 检查控制台输出，查看是否有 Google Sheets 错误
2. 检查 Google Sheets 是否有新数据
3. 如果只有 localStorage 保存成功，检查 Google Apps Script 配置

## 📊 调试检查清单

### Google Apps Script 配置

- [ ] `Code.gs` 文件已保存
- [ ] `SPREADSHEET_ID` 已正确配置
- [ ] `SHEET_NAME` 与 Google Sheets 中的名称匹配
- [ ] Web App 已部署
- [ ] Web App 访问权限设置为 "任何人"
- [ ] 访问 Web App URL 返回 JSON 响应（不是错误）

### 前端配置

- [ ] `GOOGLE_APPS_SCRIPT_URL` 已正确配置
- [ ] `DEBUG_MODE` 已启用（用于调试）
- [ ] 浏览器控制台没有 JavaScript 错误
- [ ] 网络请求已发送（在 Network 标签中查看）

### 数据验证

- [ ] 表单数据收集正确（查看控制台输出）
- [ ] JSON 数据格式正确
- [ ] Google Sheets 中有新数据行
- [ ] 数据字段映射正确

## 🔧 高级调试技巧

### 1. 使用 Apps Script 执行日志

1. 在 Apps Script 编辑器中，点击 **查看** → **执行日志**
2. 提交表单后，查看日志中的错误信息
3. 使用 `Logger.log()` 在代码中添加日志

### 2. 使用浏览器网络监控

1. 打开开发者工具
2. 切换到 **Network**（网络）标签
3. 提交表单
4. 查找对 Google Apps Script URL 的请求
5. 检查请求状态和响应

### 3. 测试 doPost 函数

在 Apps Script 编辑器中，可以手动测试：

```javascript
function testPost() {
  const testData = {
    timestamp: new Date().toISOString(),
    overall_satisfaction: 'Satisfied',
    // ... 其他测试数据
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

运行这个函数，查看是否有错误。

## 📝 测试数据示例

使用以下测试数据验证功能：

```json
{
  "timestamp": "2024-01-01 12:00:00",
  "overall_satisfaction": "Satisfied",
  "ranked_factor_1": "Equipment quality",
  "ranked_factor_2": "Cleanliness",
  "ranked_factor_3": "Location",
  "image_version_shown": "comfort-zone-v1",
  "comfort_zone_amenity_1": "Seating",
  "comfort_zone_amenity_2": "Charging ports",
  "comfort_zone_amenity_3": "Plants",
  "usage_frequency": "Often",
  "membership_type": "Monthly",
  "membership_duration": "1-3 Years",
  "membership_impact_renewal": "Somewhat more likely",
  "wellness_q1": "4",
  "wellness_q2": "5",
  "wellness_q3": "3",
  "wellness_q4": "4",
  "wellness_q5": "5",
  "wellness_q6": "4",
  "age_group": "25-34",
  "gender": "F"
}
```

## ✅ 成功标准

当所有功能正常工作时，你应该看到：

1. ✅ 提交按钮显示加载动画
2. ✅ 控制台输出详细的调试信息
3. ✅ 页面显示成功消息
4. ✅ Google Sheets 中有新数据行
5. ✅ localStorage 中保存了数据（作为备份）

## 🆘 需要帮助？

如果问题仍然存在：

1. 检查所有配置步骤是否完成
2. 查看浏览器控制台的完整错误信息
3. 查看 Apps Script 执行日志
4. 确认 Google Sheets 权限设置正确

---

**提示**：调试完成后，可以将 `DEBUG_MODE` 设置为 `false` 以减少控制台输出。

