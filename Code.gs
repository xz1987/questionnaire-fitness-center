/**
 * Google Apps Script - 接收表单数据并写入 Google Sheets
 * 
 * 使用说明：
 * 1. 在 Google Drive 中创建新的 Google Sheets
 * 2. 打开 Google Sheets，点击 扩展程序 → Apps Script
 * 3. 将本文件内容复制到 Apps Script 编辑器
 * 4. 修改 SPREADSHEET_ID 和 SHEET_NAME（第 19 和 22 行）
 * 5. 点击"保存"（Ctrl+S 或 Cmd+S）
 * 6. 点击"部署" → "新建部署"
 * 7. 选择"Web 应用"
 * 8. 设置：
 *    - 执行身份：我
 *    - 具有访问权限的用户：任何人
 * 9. 点击"部署"，复制 Web App URL
 * 10. 将 URL 复制到 index.html 中的 GOOGLE_APPS_SCRIPT_URL
 */

// ============================================
// 配置区域 - 必须修改！
// ============================================

// 你的 Google Sheets ID（从 URL 中获取）
// 例如：https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
// 将 YOUR_SPREADSHEET_ID_HERE 替换为你的实际 Sheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Sheet 名称（通常是 "Sheet1"）
// 如果你的 Sheet 有不同名称，修改这里
const SHEET_NAME = 'Sheet1';

// ============================================
// CSV 列定义（与前端保持一致）
// ============================================
const CSV_COLUMNS = [
  'Timestamp',
  'Overall_Satisfaction',
  'Ranked_Factor_1',
  'Ranked_Factor_2',
  'Ranked_Factor_3',
  'Ranked_Factors_Other',
  'Image_Version_Shown',
  'Comfort_Zone_Amenity_1',
  'Comfort_Zone_Amenity_2',
  'Comfort_Zone_Amenity_3',
  'Comfort_Zone_Other',
  'Usage_Frequency',
  'Membership_Type',
  'Membership_Type_Other',
  'Membership_Duration',
  'Membership_Impact_Renewal',
  'Membership_Impact_Join',
  'Wellness_Q1',
  'Wellness_Q2',
  'Wellness_Q3',
  'Wellness_Q4',
  'Wellness_Q5',
  'Wellness_Q6',
  'Age_Group',
  'Gender',
  'Gender_Self_Describe'
];

// ============================================
// 注意：CORS 头通过 Web App 部署设置来配置
// 在部署时，确保"具有访问权限的用户"设置为"任何人"
// ============================================

// ============================================
// 主要函数
// ============================================

/**
 * 处理 POST 请求（接收表单数据）
 * 这是最重要的函数，前端会调用这个函数
 */
function doPost(e) {
  try {
    // 解析 JSON 数据
    var data;
    try {
      // 尝试解析 JSON
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else if (e.parameter) {
        // 如果不是 JSON，尝试使用参数
        data = e.parameter;
      } else {
        throw new Error('No data received');
      }
    } catch (parseError) {
      // 解析失败
      return createErrorResponse('Failed to parse JSON data: ' + parseError.toString());
    }

    // 验证数据
    if (!data || typeof data !== 'object') {
      return createErrorResponse('Invalid data format: data must be an object');
    }

    // 获取或创建 Sheet
    var sheet;
    try {
      sheet = getOrCreateSheet();
    } catch (sheetError) {
      return createErrorResponse('Failed to access spreadsheet: ' + sheetError.toString());
    }

    // 确保表头存在
    try {
      ensureHeaders(sheet);
    } catch (headerError) {
      return createErrorResponse('Failed to ensure headers: ' + headerError.toString());
    }

    // 将数据转换为行
    var row;
    try {
      row = convertDataToRow(data);
    } catch (convertError) {
      return createErrorResponse('Failed to convert data: ' + convertError.toString());
    }

    // 追加数据到 Sheet
    try {
      sheet.appendRow(row);
    } catch (appendError) {
      return createErrorResponse('Failed to append row: ' + appendError.toString());
    }

    // 返回成功响应
    return createSuccessResponse('Data saved successfully');

  } catch (error) {
    // 捕获所有未预期的错误
    return createErrorResponse('Unexpected error: ' + error.toString());
  }
}

/**
 * 处理 OPTIONS 请求（CORS 预检请求）
 * 浏览器在发送 POST 请求前会先发送 OPTIONS 请求
 * 注意：Google Apps Script Web App 会自动处理 CORS，无需手动设置头
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 处理 GET 请求（用于测试）
 * 在浏览器中访问 Web App URL 可以测试是否正常工作
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script is running',
      timestamp: new Date().toISOString(),
      spreadsheetId: SPREADSHEET_ID,
      sheetName: SHEET_NAME
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// 辅助函数
// ============================================

/**
 * 创建成功响应
 */
function createSuccessResponse(message) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: message,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 创建错误响应
 */
function createErrorResponse(errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 获取或创建 Sheet
 */
function getOrCreateSheet() {
  try {
    // 打开 Spreadsheet
    var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // 尝试获取 Sheet
    var sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // 如果 Sheet 不存在，创建它
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    return sheet;
  } catch (error) {
    throw new Error('Failed to access spreadsheet. Please check SPREADSHEET_ID and SHEET_NAME. Error: ' + error.toString());
  }
}

/**
 * 确保表头存在
 */
function ensureHeaders(sheet) {
  var lastRow = sheet.getLastRow();
  
  // 如果 Sheet 是空的，添加表头
  if (lastRow === 0) {
    sheet.appendRow(CSV_COLUMNS);
    formatHeaderRow(sheet);
  } else {
    // 检查第一行是否是表头
    var firstRow = sheet.getRange(1, 1, 1, CSV_COLUMNS.length).getValues()[0];
    var headersMatch = firstRow.length === CSV_COLUMNS.length && 
                       firstRow[0] === CSV_COLUMNS[0];
    
    if (!headersMatch) {
      // 如果表头不匹配，在顶部插入新表头
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, CSV_COLUMNS.length).setValues([CSV_COLUMNS]);
      formatHeaderRow(sheet);
    }
  }
}

/**
 * 格式化表头行（可选，美化表格）
 */
function formatHeaderRow(sheet) {
  try {
    var headerRange = sheet.getRange(1, 1, 1, CSV_COLUMNS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
  } catch (error) {
    // 格式化失败不影响功能，只记录错误
    Logger.log('Failed to format header: ' + error.toString());
  }
}

/**
 * 将数据对象转换为行数组
 * 这个函数将前端发送的数据对象转换为 Google Sheets 需要的行格式
 */
function convertDataToRow(data) {
  var row = [];
  
  // 遍历所有列，从数据中提取对应的值
  for (var i = 0; i < CSV_COLUMNS.length; i++) {
    var column = CSV_COLUMNS[i];
    var value = '';
    
    // 根据列名从数据中提取值
    switch (column) {
      case 'Timestamp':
        value = data.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 19);
        break;
      case 'Overall_Satisfaction':
        value = data.overall_satisfaction || '';
        break;
      case 'Ranked_Factor_1':
        value = data.ranked_factor_1 || '';
        break;
      case 'Ranked_Factor_2':
        value = data.ranked_factor_2 || '';
        break;
      case 'Ranked_Factor_3':
        value = data.ranked_factor_3 || '';
        break;
      case 'Ranked_Factors_Other':
        value = data.ranked_factors_other || '';
        break;
      case 'Image_Version_Shown':
        value = data.image_version_shown || '';
        break;
      case 'Comfort_Zone_Amenity_1':
        value = data.comfort_zone_amenity_1 || '';
        break;
      case 'Comfort_Zone_Amenity_2':
        value = data.comfort_zone_amenity_2 || '';
        break;
      case 'Comfort_Zone_Amenity_3':
        value = data.comfort_zone_amenity_3 || '';
        break;
      case 'Comfort_Zone_Other':
        value = data.comfort_zone_other || '';
        break;
      case 'Usage_Frequency':
        value = data.usage_frequency || '';
        break;
      case 'Membership_Type':
        value = data.membership_type || '';
        break;
      case 'Membership_Type_Other':
        value = data.membership_type_other || '';
        break;
      case 'Membership_Duration':
        value = data.membership_duration || '';
        break;
      case 'Membership_Impact_Renewal':
        value = data.membership_impact_renewal || '';
        break;
      case 'Membership_Impact_Join':
        value = data.membership_impact_join || '';
        break;
      case 'Wellness_Q1':
        value = data.wellness_q1 || '';
        break;
      case 'Wellness_Q2':
        value = data.wellness_q2 || '';
        break;
      case 'Wellness_Q3':
        value = data.wellness_q3 || '';
        break;
      case 'Wellness_Q4':
        value = data.wellness_q4 || '';
        break;
      case 'Wellness_Q5':
        value = data.wellness_q5 || '';
        break;
      case 'Wellness_Q6':
        value = data.wellness_q6 || '';
        break;
      case 'Age_Group':
        value = data.age_group || '';
        break;
      case 'Gender':
        value = data.gender || '';
        break;
      case 'Gender_Self_Describe':
        value = data.gender_self_describe || '';
        break;
      default:
        value = '';
    }
    
    row.push(value);
  }
  
  return row;
}

// ============================================
// 测试函数（可选，用于调试）
// ============================================

/**
 * 测试函数 - 可以在 Apps Script 编辑器中运行这个函数来测试
 * 点击"运行" → 选择 testFunction → 点击运行
 */
function testFunction() {
  var testData = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    overall_satisfaction: 'Satisfied',
    ranked_factor_1: 'Equipment quality',
    ranked_factor_2: 'Cleanliness',
    ranked_factor_3: 'Location',
    ranked_factors_other: '',
    image_version_shown: 'v1',
    comfort_zone_amenity_1: 'Seating',
    comfort_zone_amenity_2: 'Charging ports',
    comfort_zone_amenity_3: 'Plants',
    comfort_zone_other: '',
    usage_frequency: 'Often',
    membership_type: 'Monthly',
    membership_type_other: '',
    membership_duration: '1-3 Years',
    membership_impact_renewal: 'Somewhat more likely',
    membership_impact_join: 'Somewhat more likely',
    wellness_q1: '4',
    wellness_q2: '5',
    wellness_q3: '3',
    wellness_q4: '4',
    wellness_q5: '5',
    wellness_q6: '4',
    age_group: '25-34',
    gender: 'F',
    gender_self_describe: ''
  };
  
  var e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(e);
  Logger.log('Test result: ' + result.getContent());
  
  // 检查 Sheet 中是否有新数据
  var sheet = getOrCreateSheet();
  var lastRow = sheet.getLastRow();
  Logger.log('Sheet now has ' + lastRow + ' rows');
}
