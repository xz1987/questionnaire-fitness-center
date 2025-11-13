# Google Apps Script 部署修复步骤

## 🚨 当前问题

访问 Web App URL 时显示：`Script function not found: doGet`

**URL**: `https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec`

## ✅ 解决方案 - 逐步指南

### 步骤 1: 打开 Google Apps Script 编辑器

1. 访问 [script.google.com](https://script.google.com)
2. 找到你的项目（如果没有，需要创建新项目）
3. 点击项目名称打开编辑器

### 步骤 2: 检查并复制代码

1. **打开项目中的 `Code.gs` 文件**
   - 查看文件内容
   - 确认包含 `doGet` 和 `doPost` 函数

2. **如果代码不完整，复制完整代码**：
   - 打开项目文件夹中的 `Code.gs` 文件
   - 复制所有内容
   - 粘贴到 Google Apps Script 编辑器中
   - **重要**：确保 `doGet` 函数在第 119 行附近

### 步骤 3: 配置 Spreadsheet ID

1. 在代码中找到这一行：
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```

2. 替换为你的 Google Sheets ID：
   ```javascript
   const SPREADSHEET_ID = '你的实际 Spreadsheet ID';
   ```

3. **如何获取 Spreadsheet ID**：
   - 打开你的 Google Sheets
   - 查看浏览器地址栏
   - URL 格式：`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - 复制 `SPREADSHEET_ID` 部分

### 步骤 4: 保存代码

1. 点击顶部菜单 **文件** → **保存**
2. 或者按 `Ctrl+S` (Windows) / `Cmd+S` (Mac)
3. **确认没有红色错误提示**
4. 如果有错误，修复后再保存

### 步骤 5: 测试代码（可选但推荐）

1. 在编辑器顶部，选择 `testFunction` 函数
2. 点击运行按钮（▶️）
3. 首次运行需要授权：
   - 点击 **"授权访问"**
   - 选择你的 Google 账号
   - 点击 **"高级"** → **"转到 [项目名称]（不安全）"**
   - 点击 **"允许"**
4. 查看执行日志，确认没有错误

### 步骤 6: 删除旧部署（如果存在）

1. 点击 **部署** → **管理部署**
2. 如果看到现有部署，点击删除图标（垃圾桶图标）
3. 确认删除

### 步骤 7: 创建新部署

1. 点击 **部署** → **新建部署**
2. 点击 **选择类型** 旁边的齿轮图标 ⚙️
3. 选择 **Web 应用**

### 步骤 8: 配置部署设置

**重要设置**：

1. **说明**（可选）：输入 "Survey Form Handler v1"
2. **执行身份**：选择 **"我"** (Me)
3. **谁可以访问**：**必须选择 "任何人"** ⚠️
   - 这是关键设置！
   - 如果选择其他选项，前端无法访问
4. 点击 **部署**

### 步骤 9: 授权访问

1. 首次部署会要求授权
2. 点击 **"授权访问"**
3. 选择你的 Google 账号
4. 点击 **"高级"** → **"转到 [项目名称]（不安全）"**
5. 点击 **"允许"**

### 步骤 10: 获取 Web App URL

1. 部署成功后，会显示对话框
2. 复制 **Web 应用 URL**
3. **确认 URL 格式**：
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

### 步骤 11: 测试 Web App URL

1. 在浏览器中打开复制的 URL
2. **期望结果**：
   ```json
   {
     "success": true,
     "message": "Google Apps Script is running",
     "timestamp": "2024-01-01T12:00:00.000Z"
   }
   ```

3. **如果仍然显示错误**：
   - 等待 1-2 分钟（部署可能需要时间）
   - 刷新页面
   - 检查代码是否正确保存

### 步骤 12: 更新前端代码（如果需要）

如果新的 URL 与之前的不同：

1. 打开 `index.html` 文件
2. 找到这一行：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = '...';
   ```
3. 更新为新的 URL
4. 保存文件

## 🔍 验证清单

完成部署后，确认：

- [ ] `Code.gs` 文件已保存（没有错误提示）
- [ ] `SPREADSHEET_ID` 已正确配置
- [ ] `SHEET_NAME` 与 Google Sheets 中的名称匹配
- [ ] Web App 已部署
- [ ] 访问权限设置为 **"任何人"**
- [ ] 访问 Web App URL 返回 JSON 响应（不是错误）
- [ ] `index.html` 中的 URL 已更新（如果需要）

## 🧪 完整测试流程

### 1. 测试 Web App URL

访问 URL，应该看到：
```json
{
  "success": true,
  "message": "Google Apps Script is running",
  "timestamp": "..."
}
```

### 2. 测试表单提交

1. 打开表单页面
2. 打开浏览器控制台（F12）
3. 填写表单
4. 点击提交
5. 观察：
   - ✅ 按钮显示加载动画
   - ✅ 控制台显示调试信息
   - ✅ 页面显示成功消息

### 3. 验证 Google Sheets

1. 打开 Google Sheets
2. 检查是否有新数据行
3. 验证数据是否正确

## ⚠️ 常见问题

### 问题 1: 仍然显示 "Script function not found"

**可能原因**：
- 代码没有保存
- 部署时选择了错误的版本
- 函数名称拼写错误

**解决**：
1. 确认代码已保存
2. 检查函数名称是否正确（`doGet` 和 `doPost`）
3. 重新部署
4. 等待几分钟后重试

### 问题 2: 401 未授权错误

**原因**：访问权限设置不正确

**解决**：
1. 确保设置为 **"任何人"**
2. 重新部署

### 问题 3: 数据没有写入 Google Sheets

**原因**：Spreadsheet ID 配置错误

**解决**：
1. 检查 `SPREADSHEET_ID` 是否正确
2. 确认 Google Sheets 的访问权限
3. 检查执行日志

## 📝 Code.gs 关键函数检查

确保你的 `Code.gs` 文件包含：

1. ✅ `doGet(e)` 函数（第 119 行）
2. ✅ `doPost(e)` 函数（第 61 行）
3. ✅ `getOrCreateSheet()` 函数
4. ✅ `ensureHeaders(sheet)` 函数
5. ✅ `convertDataToRow(data)` 函数

## 🎯 成功标志

当一切正常时：

1. ✅ 访问 Web App URL 返回 JSON 响应
2. ✅ 没有 "Script function not found" 错误
3. ✅ 表单可以成功提交
4. ✅ Google Sheets 中有新数据

---

**按照以上步骤操作后，如果问题仍然存在，请检查：**
1. Google Apps Script 编辑器中的代码是否完整
2. 是否选择了正确的项目
3. 部署时是否选择了正确的版本

