# ✅ Google Sheets 提交功能验证

## 📋 配置状态

### ✅ 已配置项

1. **Google Apps Script URL**
   - URL: `https://script.google.com/macros/s/AKfycbyJoQ3FQE-XzU3X-Lp3-XEBuyfj6E5GljvP_j3-geymMcxzTfTKIuLOQ-daGrQ_ub9rlw/exec`
   - 位置：`index.html` 第 976 行
   - 状态：✅ 已配置

2. **提交功能**
   - 使用 `XMLHttpRequest`（ES5 兼容）
   - 自动启用（如果 URL 存在）
   - 包含错误处理和重试逻辑
   - 本地存储备份（即使 Google Sheets 失败也会保存）

3. **数据格式匹配**
   - ✅ 所有字段名与 `Code.gs` 中的 `CSV_COLUMNS` 匹配
   - ✅ 时间戳格式正确
   - ✅ 所有问题字段都已包含

## 🧪 测试步骤

### 方法 1：浏览器控制台测试

1. **打开调查问卷页面**
   - 本地：打开 `index.html`
   - 在线：访问你的 GitHub Pages URL

2. **打开浏览器开发者工具**
   - Chrome/Edge: `F12` 或 `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Firefox: `F12` 或 `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
   - Safari: `Cmd+Option+I` (需要先启用开发者菜单)

3. **切换到 Console（控制台）标签**

4. **填写并提交表单**
   - 填写所有必填项
   - 点击 "Submit Survey" 按钮

5. **查看控制台输出**
   - 应该看到以下日志：
     ```
     📋 Form data prepared for submission: {...}
     📤 Submitting to Google Sheets: {...}
     📥 Google Sheets response: {...}
     ✅ Google Sheets submission successful
     ✅ Success message displayed to user
     ```

### 方法 2：检查 Google Sheets

1. **打开你的 Google Sheets**
   - 访问：https://docs.google.com/spreadsheets/
   - 找到对应的表格文件

2. **检查新行**
   - 提交表单后，应该立即在表格中看到新的一行
   - 包含时间戳和所有答案

3. **验证数据**
   - 检查所有字段是否正确填写
   - 检查时间戳格式是否正确

### 方法 3：网络请求检查

1. **打开浏览器开发者工具**
   - 切换到 **Network（网络）** 标签

2. **提交表单**

3. **查找请求**
   - 查找对 `script.google.com` 的 POST 请求
   - 检查：
     - ✅ 状态码：200 或 0（CORS 模式下可能是 0）
     - ✅ 请求 URL 正确
     - ✅ 请求体包含所有表单数据

## 🔍 常见问题排查

### 问题 1：控制台显示 "❌ Google Sheets submission failed"

**可能原因：**
- Google Apps Script Web App 未正确部署
- URL 错误
- 网络连接问题

**解决方法：**
1. 检查 Google Apps Script 部署状态
2. 确认 Web App URL 正确
3. 检查网络连接
4. 查看控制台错误详情

### 问题 2：状态码 404

**可能原因：**
- Google Apps Script Web App URL 错误
- Web App 未部署或已删除

**解决方法：**
1. 重新部署 Google Apps Script
2. 复制新的 Web App URL
3. 更新 `index.html` 中的 `GOOGLE_APPS_SCRIPT_URL`

### 问题 3：状态码 0（CORS 问题）

**说明：**
- 这是正常的！Google Apps Script 在 CORS 模式下可能返回状态码 0
- 数据可能已经成功提交，只是无法验证响应

**解决方法：**
1. 检查 Google Sheets 是否收到数据
2. 如果收到数据，说明功能正常
3. 如果没收到，检查 Google Apps Script 的 CORS 设置

### 问题 4：数据格式不匹配

**检查项：**
1. 确认 `Code.gs` 中的 `CSV_COLUMNS` 与前端字段名匹配
2. 字段名格式：
   - 前端：`overall_satisfaction` (小写+下划线)
   - Google Sheets：`Overall_Satisfaction` (首字母大写+下划线)
   - `Code.gs` 会自动转换

## 📊 数据字段对照表

| 前端字段名 | Google Sheets 列名 | 说明 |
|-----------|-------------------|------|
| `timestamp` | `Timestamp` | 提交时间 |
| `overall_satisfaction` | `Overall_Satisfaction` | 总体满意度 |
| `ranked_factor_1` | `Ranked_Factor_1` | 排名因素 1 |
| `ranked_factor_2` | `Ranked_Factor_2` | 排名因素 2 |
| `ranked_factor_3` | `Ranked_Factor_3` | 排名因素 3 |
| `ranked_factors_other` | `Ranked_Factors_Other` | 其他因素 |
| `image_version_shown` | `Image_Version_Shown` | 显示的图片版本 |
| `comfort_zone_amenity_1` | `Comfort_Zone_Amenity_1` | 舒适区设施 1 |
| `comfort_zone_amenity_2` | `Comfort_Zone_Amenity_2` | 舒适区设施 2 |
| `comfort_zone_amenity_3` | `Comfort_Zone_Amenity_3` | 舒适区设施 3 |
| `comfort_zone_other` | `Comfort_Zone_Other` | 其他舒适区设施 |
| `usage_frequency` | `Usage_Frequency` | 使用频率 |
| `membership_type` | `Membership_Type` | 会员类型 |
| `membership_type_other` | `Membership_Type_Other` | 其他会员类型 |
| `membership_duration` | `Membership_Duration` | 会员时长 |
| `membership_impact_renewal` | `Membership_Impact_Renewal` | 续费影响 |
| `membership_impact_join` | `Membership_Impact_Join` | 加入影响 |
| `wellness_q1` - `wellness_q6` | `Wellness_Q1` - `Wellness_Q6` | 健康声明 1-6 |
| `age_group` | `Age_Group` | 年龄组 |
| `gender` | `Gender` | 性别 |
| `gender_self_describe` | `Gender_Self_Describe` | 性别自我描述 |

## ✅ 验证清单

提交表单后，确认：

- [ ] 控制台显示 "✅ Google Sheets submission successful"
- [ ] 页面显示 "Thank you! Your response has been submitted to Google Sheets."
- [ ] Google Sheets 中出现新的一行数据
- [ ] 所有字段数据正确
- [ ] 时间戳格式正确（YYYY-MM-DD HH:MM:SS）

## 🔧 调试模式

当前已启用调试模式（`DEBUG_GOOGLE_SHEETS = true`），会在控制台显示详细日志。

如需关闭调试模式，在 `index.html` 第 981 行修改：
```javascript
var DEBUG_GOOGLE_SHEETS = false;
```

## 📝 注意事项

1. **本地存储备份**
   - 即使 Google Sheets 提交失败，数据也会保存到浏览器本地存储
   - 可以通过 "Export CSV" 按钮导出所有本地保存的数据

2. **网络连接**
   - 提交需要网络连接
   - 如果网络断开，会显示错误信息，但数据会保存到本地

3. **Google Apps Script 配额**
   - Google Apps Script 有每日执行配额限制
   - 如果超过限制，提交会失败
   - 检查 Google Apps Script 执行日志

4. **CORS 设置**
   - Google Apps Script Web App 需要设置为 "Anyone" 可以访问
   - 否则会出现 CORS 错误

