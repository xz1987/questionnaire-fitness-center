# Google Sheets 集成 - 快速开始

## 🚀 5 分钟快速部署

### 步骤 1: 创建 Google Sheets（1 分钟）

1. 访问 [Google Sheets](https://sheets.google.com)
2. 创建新的电子表格
3. 从 URL 复制 Spreadsheet ID：
   ```
   https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit
   ```

### 步骤 2: 设置 Google Apps Script（2 分钟）

1. 在 Google Sheets 中：**扩展程序** → **Apps Script**
2. 复制 `Code.gs` 文件中的所有代码
3. 粘贴到 Apps Script 编辑器
4. 修改 `SPREADSHEET_ID`：
   ```javascript
   const SPREADSHEET_ID = '你的 Spreadsheet ID';
   ```
5. 保存项目

### 步骤 3: 部署 Web App（1 分钟）

1. 点击 **部署** → **新建部署**
2. 选择 **Web 应用**
3. 设置：
   - **执行身份**：我
   - **谁可以访问**：**任何人** ⚠️ 必须选择这个
4. 点击 **部署**
5. 授权访问
6. 复制 **Web 应用 URL**

### 步骤 4: 配置前端（1 分钟）

1. 打开 `index.html`
2. 找到这一行：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = '';
   ```
3. 粘贴你的 Web App URL：
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
4. 保存文件

### 步骤 5: 测试

1. 打开表单页面
2. 填写并提交表单
3. 检查 Google Sheets 是否有新数据

## ✅ 完成！

现在表单数据会自动提交到 Google Sheets。

## 📚 详细文档

查看 `GOOGLE_SHEETS_DEPLOY.md` 获取完整说明和故障排除指南。

## 🔧 关键配置

### index.html 配置
```javascript
const GOOGLE_APPS_SCRIPT_URL = '你的 Web App URL';
```

### Code.gs 配置
```javascript
const SPREADSHEET_ID = '你的 Spreadsheet ID';
const SHEET_NAME = 'Sheet1'; // 可选
```

## ⚠️ 重要提示

- Web App 访问权限必须设置为 **"任何人"**
- Spreadsheet ID 必须正确配置
- 首次部署需要授权访问

