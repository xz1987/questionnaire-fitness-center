/**
 * Google Apps Script - 接收表单数据并写入 Google Sheets
 * 
 * 使用说明：
 * 1. 在 Google Drive 中创建新的 Google Sheets
 * 2. 打开 Google Sheets，点击 扩展程序 → Apps Script
 * 3. 将本文件内容复制到 Apps Script 编辑器
 * 4. 修改 SPREADSHEET_ID 和 SHEET_NAME
 * 5. 部署为 Web App
 * 6. 将 Web App URL 复制到 index.html 中的 GOOGLE_APPS_SCRIPT_URL
 */

// ============================================
// 配置区域
// ============================================

// 你的 Google Sheets ID（从 URL 中获取）
// 例如：https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Sheet 名称（通常是 "Sheet1"）
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

/**
 * 处理 POST 请求（接收表单数据）
 * @param {Object} e - 事件对象，包含请求数据
 * @returns {Object} - 返回 JSON 响应
 */
function doPost(e) {
  // CORS 头设置（所有响应都需要）
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
  
  try {
    // 解析 JSON 数据
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // 如果不是 JSON，尝试直接使用
      data = e.parameter || e.postData.contents;
    }

    // 验证数据
    if (!data || typeof data !== 'object') {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Invalid data format'
        }))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders(corsHeaders);
    }

    // 获取或创建 Sheet
    const sheet = getOrCreateSheet();

    // 确保表头存在
    ensureHeaders(sheet);

    // 将数据转换为行
    const row = convertDataToRow(data);

    // 追加数据到 Sheet
    sheet.appendRow(row);

    // 返回成功响应（添加 CORS 头）
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(corsHeaders);

  } catch (error) {
    // 返回错误响应（添加 CORS 头）
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

/**
 * 处理 OPTIONS 请求（CORS 预检请求）
 * @param {Object} e - 事件对象
 * @returns {Object} - 返回空响应，包含 CORS 头
 */
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

/**
 * 处理 GET 请求（用于测试）
 * @param {Object} e - 事件对象
 * @returns {Object} - 返回 JSON 响应
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Google Apps Script is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * 获取或创建 Sheet
 * @returns {Sheet} - Google Sheet 对象
 */
function getOrCreateSheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      // 如果 Sheet 不存在，创建它
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }
    
    return sheet;
  } catch (error) {
    throw new Error('Failed to access spreadsheet: ' + error.toString());
  }
}

/**
 * 确保表头存在
 * @param {Sheet} sheet - Google Sheet 对象
 */
function ensureHeaders(sheet) {
  const lastRow = sheet.getLastRow();
  
  // 如果 Sheet 是空的，添加表头
  if (lastRow === 0) {
    sheet.appendRow(CSV_COLUMNS);
    // 格式化表头（可选）
    const headerRange = sheet.getRange(1, 1, 1, CSV_COLUMNS.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285F4');
    headerRange.setFontColor('#FFFFFF');
  } else {
    // 检查第一行是否是表头
    const firstRow = sheet.getRange(1, 1, 1, CSV_COLUMNS.length).getValues()[0];
    const headersMatch = firstRow.length === CSV_COLUMNS.length && 
                         firstRow[0] === CSV_COLUMNS[0];
    
    if (!headersMatch) {
      // 如果表头不匹配，在顶部插入新表头
      sheet.insertRowBefore(1);
      sheet.getRange(1, 1, 1, CSV_COLUMNS.length).setValues([CSV_COLUMNS]);
      const headerRange = sheet.getRange(1, 1, 1, CSV_COLUMNS.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285F4');
      headerRange.setFontColor('#FFFFFF');
    }
  }
}

/**
 * 将数据对象转换为行数组
 * @param {Object} data - 数据对象
 * @returns {Array} - 行数据数组
 */
function convertDataToRow(data) {
  const row = [];
  
  CSV_COLUMNS.forEach(column => {
    let value = '';
    
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
      case 'Wellness_Q2':
      case 'Wellness_Q3':
      case 'Wellness_Q4':
      case 'Wellness_Q5':
      case 'Wellness_Q6':
        const wellnessNum = column.match(/\d+/)[0];
        value = data[`wellness_q${wellnessNum}`] || '';
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
  });
  
  return row;
}

/**
 * 测试函数（可选，用于调试）
 */
function testFunction() {
  const testData = {
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    overall_satisfaction: 'Satisfied',
    ranked_factor_1: 'Equipment quality',
    ranked_factor_2: 'Cleanliness',
    ranked_factor_3: 'Location',
    image_version_shown: 'comfort-zone-v1',
    comfort_zone_amenity_1: 'Seating',
    comfort_zone_amenity_2: 'Charging ports',
    comfort_zone_amenity_3: 'Plants',
    usage_frequency: 'Often',
    membership_type: 'Monthly',
    membership_duration: '1-3 Years',
    membership_impact_renewal: 'Somewhat more likely',
    wellness_q1: '4',
    wellness_q2: '5',
    wellness_q3: '3',
    wellness_q4: '4',
    wellness_q5: '5',
    wellness_q6: '4',
    age_group: '25-34',
    gender: 'F'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}

