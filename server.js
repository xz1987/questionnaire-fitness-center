/**
 * Finger Lakes Fitness Center Renovation Survey - Backend Server
 * 
 * 运行说明：
 * 1. 安装依赖：npm install
 * 2. 启动服务器：node server.js
 * 3. 在浏览器中访问：http://localhost:3000
 * 
 * CSV列映射说明（按顺序）：
 * 1. Timestamp - 提交时间戳 (YYYY-MM-DD HH:MM:SS)
 * 2. Overall_Satisfaction - 总体满意度
 * 3. Ranked_Factor_1 - 排名第一的因素
 * 4. Ranked_Factor_2 - 排名第二的因素
 * 5. Ranked_Factor_3 - 排名第三的因素
 * 6. Ranked_Factors_Other - "其他"选项的文本输入
 * 7. Image_Version_Shown - 显示的图片版本 (comfort-zone-v1 或 comfort-zone-v2)
 * 8. Comfort_Zone_Amenity_1 - 排名第一的舒适区设施
 * 9. Comfort_Zone_Amenity_2 - 排名第二的舒适区设施
 * 10. Comfort_Zone_Amenity_3 - 排名第三的舒适区设施
 * 11. Comfort_Zone_Other - "其他"选项的文本输入
 * 12. Usage_Frequency - 使用频率
 * 13. Membership_Type - 会员类型
 * 14. Membership_Type_Other - "其他"会员类型的文本输入
 * 15. Membership_Duration - 会员时长（如果适用）
 * 16. Membership_Impact_Renewal - 会员续费影响（会员版本）
 * 17. Membership_Impact_Join - 会员加入影响（非会员版本）
 * 18. Wellness_Q1 到 Wellness_Q6 - 6个健康声明的Likert量表评分 (1-5)
 * 19. Age_Group - 年龄段
 * 20. Gender - 性别
 * 21. Gender_Self_Describe - "其他"性别的文本输入
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CSV_FILE = path.join(__dirname, 'responses.csv');

// 中间件配置
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // 提供静态文件服务

/**
 * CSV列定义（按顺序）
 * 修改此数组以更改CSV列的排列顺序
 */
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
 * 确保CSV文件存在，如果不存在则创建并添加表头
 */
function ensureCSVFile() {
    if (!fs.existsSync(CSV_FILE)) {
        fs.writeFileSync(CSV_FILE, CSV_COLUMNS.join(',') + '\n', 'utf8');
    } else {
        // 检查文件是否有正确的表头
        const firstLine = fs.readFileSync(CSV_FILE, 'utf8').split('\n')[0];
        if (firstLine !== CSV_COLUMNS.join(',')) {
            // 如果表头不匹配，备份旧文件并创建新文件
            const backupFile = path.join(__dirname, `responses_backup_${Date.now()}.csv`);
            fs.copyFileSync(CSV_FILE, backupFile);
            console.log(`Old CSV file backed up to: ${backupFile}`);
            fs.writeFileSync(CSV_FILE, CSV_COLUMNS.join(',') + '\n', 'utf8');
        }
    }
}

/**
 * 转义CSV字段中的特殊字符
 * @param {string} field - 要转义的字段
 * @returns {string} - 转义后的字段
 */
function escapeCSVField(field) {
    if (field === null || field === undefined || field === '') {
        return '';
    }
    const stringField = String(field);
    // 如果包含逗号、引号或换行符，需要用引号括起来，并转义内部引号
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return '"' + stringField.replace(/"/g, '""') + '"';
    }
    return stringField;
}

/**
 * 将响应转换为CSV行
 * @param {Object} responses - 响应对象
 * @param {string} timestamp - 时间戳
 * @returns {string} - CSV格式的行
 */
function convertToCSVRow(responses, timestamp) {
    const row = [];
    
    // 按CSV_COLUMNS顺序提取值
    CSV_COLUMNS.forEach(column => {
        let value = '';
        
        switch (column) {
            case 'Timestamp':
                value = timestamp || new Date().toISOString().replace('T', ' ').substring(0, 19);
                break;
            case 'Overall_Satisfaction':
                value = responses.overall_satisfaction || '';
                break;
            case 'Ranked_Factor_1':
                value = responses.ranked_factor_1 || '';
                break;
            case 'Ranked_Factor_2':
                value = responses.ranked_factor_2 || '';
                break;
            case 'Ranked_Factor_3':
                value = responses.ranked_factor_3 || '';
                break;
            case 'Ranked_Factors_Other':
                value = responses.ranked_factors_other || '';
                break;
            case 'Image_Version_Shown':
                value = responses.image_version_shown || '';
                break;
            case 'Comfort_Zone_Amenity_1':
                value = responses.comfort_zone_amenity_1 || '';
                break;
            case 'Comfort_Zone_Amenity_2':
                value = responses.comfort_zone_amenity_2 || '';
                break;
            case 'Comfort_Zone_Amenity_3':
                value = responses.comfort_zone_amenity_3 || '';
                break;
            case 'Comfort_Zone_Other':
                value = responses.comfort_zone_other || '';
                break;
            case 'Usage_Frequency':
                value = responses.usage_frequency || '';
                break;
            case 'Wellness_Q1':
            case 'Wellness_Q2':
            case 'Wellness_Q3':
            case 'Wellness_Q4':
            case 'Wellness_Q5':
            case 'Wellness_Q6':
                const wellnessNum = column.match(/\d+/)[0];
                value = responses[`wellness_q${wellnessNum}`] || '';
                break;
            case 'Membership_Type':
                value = responses.membership_type || '';
                break;
            case 'Membership_Type_Other':
                value = responses.membership_type_other || '';
                break;
            case 'Membership_Duration':
                value = responses.membership_duration || '';
                break;
            case 'Membership_Impact_Renewal':
                value = responses.membership_impact_renewal || '';
                break;
            case 'Membership_Impact_Join':
                value = responses.membership_impact_join || '';
                break;
            case 'Age_Group':
                value = responses.age_group || '';
                break;
            case 'Gender':
                value = responses.gender || '';
                break;
            case 'Gender_Self_Describe':
                value = responses.gender_self_describe || '';
                break;
            default:
                value = '';
        }
        
        row.push(escapeCSVField(value));
    });
    
    return row.join(',');
}

/**
 * 将响应追加到CSV文件
 * @param {Object} responses - 响应对象
 * @param {string} timestamp - 时间戳
 */
function appendToCSV(responses, timestamp) {
    const csvRow = convertToCSVRow(responses, timestamp);
    
    // 使用追加模式写入文件
    fs.appendFileSync(CSV_FILE, csvRow + '\n', 'utf8');
}

/**
 * POST端点：接收调查响应
 */
app.post('/api/submit', (req, res) => {
    try {
        const { responses, timestamp } = req.body;
        
        // 验证请求数据
        if (!responses || typeof responses !== 'object') {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid response data' 
            });
        }
        
        // 确保CSV文件存在
        ensureCSVFile();
        
        // 使用传入的时间戳，如果没有则使用当前时间
        const submitTimestamp = timestamp || new Date().toISOString().replace('T', ' ').substring(0, 19);
        
        // 追加响应到CSV文件
        appendToCSV(responses, submitTimestamp);
        
        res.json({ 
            success: true, 
            message: 'Thank you! Your response has been saved successfully.' 
        });
        
    } catch (error) {
        console.error('Error saving response:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error: Unable to save response' 
        });
    }
});

/**
 * 启动服务器
 * 监听所有网络接口，允许从局域网访问（包括平板设备）
 */
const os = require('os');

function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            // 跳过内部（非IPv4）和回环地址
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return 'localhost';
}

app.listen(PORT, '0.0.0.0', () => {
    const localIP = getLocalIPAddress();
    console.log('='.repeat(60));
    console.log(`Server running successfully!`);
    console.log('='.repeat(60));
    console.log(`Local access:    http://localhost:${PORT}`);
    console.log(`Network access:  http://${localIP}:${PORT}`);
    console.log(`Responses will be saved to: ${CSV_FILE}`);
    console.log('='.repeat(60));
    console.log(`\nTo access from tablet/phone:`);
    console.log(`1. Make sure your device is on the same network`);
    console.log(`2. Open browser and go to: http://${localIP}:${PORT}`);
    console.log('='.repeat(60));
    ensureCSVFile(); // 确保CSV文件存在
});
