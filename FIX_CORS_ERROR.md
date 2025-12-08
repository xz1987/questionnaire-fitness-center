# 🔧 修复 CORS 错误

## ❌ 错误信息

```
XMLHttpRequest cannot load https://script.google.com/macros/s/.../exec due to access control checks.
```

## ✅ 解决方案

### 步骤 1：更新 Google Apps Script 代码

我已经修复了 `Code.gs` 文件，在所有响应中添加了 CORS 头。你需要：

1. **打开 Google Apps Script**
   - 访问：https://script.google.com/
   - 找到你的项目（Fitness Center Survey）

2. **复制修复后的代码**
   - 打开 `Code.gs` 文件
   - 将修复后的代码（从本仓库的 `Code.gs`）复制粘贴到编辑器

3. **关键修改点**：
   - ✅ 所有响应都添加了 CORS 头
   - ✅ 添加了 `doOptions` 函数处理 CORS 预检请求
   - ✅ 成功响应和错误响应都包含 CORS 头

### 步骤 2：重新部署 Web App

**重要**：修改代码后必须重新部署！

1. **点击"部署" → "新建部署"**
   - 或者点击现有部署旁边的"编辑"（铅笔图标）

2. **部署设置**：
   - **类型**：Web 应用
   - **执行身份**：我
   - **具有访问权限的用户**：**任何人** ⬅️ 这个很重要！
   - **说明**：可以填写 "Fixed CORS headers"

3. **点击"部署"**

4. **复制新的 Web App URL**
   - 确保 URL 格式：`https://script.google.com/macros/s/.../exec`
   - 如果 URL 改变了，需要更新 `index.html` 中的 `GOOGLE_APPS_SCRIPT_URL`

### 步骤 3：验证修复

1. **打开调查问卷页面**
   - 打开浏览器开发者工具（F12）
   - 切换到 Console（控制台）标签

2. **提交表单**

3. **检查控制台**：
   - ✅ 应该看到 "✅ Google Sheets submission successful"
   - ❌ 不应该再看到 CORS 错误

4. **检查 Google Sheets**：
   - 应该看到新的一行数据

## 🔍 如果仍然有 CORS 错误

### 方法 1：检查 Web App 部署设置

确保：
- ✅ **具有访问权限的用户**：设置为 **"任何人"**
- ✅ **执行身份**：设置为 **"我"**

### 方法 2：清除浏览器缓存

1. 按 `Ctrl+Shift+Delete` (Windows) 或 `Cmd+Shift+Delete` (Mac)
2. 清除缓存和 Cookie
3. 重新加载页面

### 方法 3：使用表单提交方式（备选方案）

如果 CORS 仍然有问题，可以使用表单提交方式。修改 `index.html` 中的提交方法：

```javascript
// 使用表单提交（不依赖 CORS）
function submitToGoogleSheetsForm(data) {
    return new Promise(function(resolve, reject) {
        var form = document.createElement('form');
        form.method = 'POST';
        form.action = GOOGLE_APPS_SCRIPT_URL;
        form.target = '_blank'; // 在新窗口打开（可选）
        
        // 添加所有数据字段
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            }
        }
        
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
        
        resolve({
            success: true,
            message: 'Form submitted (using form POST method)'
        });
    });
}
```

## 📋 修复后的代码结构

### Code.gs 关键部分：

```javascript
function doPost(e) {
  // CORS 头设置（所有响应都需要）
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // ... 处理数据 ...
    
    // 返回成功响应（添加 CORS 头）
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(corsHeaders); // ⬅️ 关键：添加 CORS 头
      
  } catch (error) {
    // 错误响应也添加 CORS 头
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(corsHeaders); // ⬅️ 关键：添加 CORS 头
  }
}

// 处理 CORS 预检请求
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    });
}
```

## ✅ 验证清单

修复后，确认：

- [ ] Google Apps Script 代码已更新
- [ ] Web App 已重新部署
- [ ] 部署设置中"具有访问权限的用户"设置为"任何人"
- [ ] 浏览器控制台不再显示 CORS 错误
- [ ] 提交表单后看到成功消息
- [ ] Google Sheets 中看到新数据

## 🆘 仍然有问题？

如果修复后仍然有 CORS 错误，请检查：

1. **Google Apps Script 执行日志**
   - 在 Apps Script 编辑器中，点击"执行" → 查看日志
   - 检查是否有错误

2. **网络请求详情**
   - 打开浏览器开发者工具 → Network（网络）标签
   - 查找对 `script.google.com` 的请求
   - 检查响应头是否包含 `Access-Control-Allow-Origin: *`

3. **Web App URL**
   - 确认 URL 正确
   - 确认 Web App 已部署且处于活动状态

