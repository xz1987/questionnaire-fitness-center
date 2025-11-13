# 部署到其他Windows电脑的检查清单

## 需要包含的文件和文件夹

### ✅ 必需文件（必须包含）
- `index.html` - 前端页面
- `server.js` - 服务器文件
- `package.json` - 依赖配置
- `package-lock.json` - 锁定依赖版本（推荐包含）
- `start.bat` - Windows启动脚本
- `start-simple.bat` - 简单启动脚本（可选）
- `README.md` - 说明文档
- `WINDOWS_INSTALL.md` - Windows安装指南
- `images/` 文件夹（包含图片）
  - `comfort-zone-v1.jpg`
  - `comfort-zone-v2.jpg`
  - `README.md`

### ⚠️ 可选文件（建议不包含）
- `node_modules/` - **不需要包含**（脚本会自动安装）
- `responses.csv` - 响应数据（如果不需要历史数据，可以不包含）
- `responses_backup_*.csv` - 备份文件（如果不需要，可以不包含）

### 📝 说明
`start.bat` 脚本会自动检测并安装 `node_modules`，所以不需要包含这个文件夹。
这样可以大大减小文件夹大小。

## 部署步骤

### 方法 1：完整文件夹（包含 node_modules）
1. 复制整个文件夹到目标电脑
2. 双击 `start.bat` 即可运行

### 方法 2：精简文件夹（推荐，不包含 node_modules）
1. 复制以下内容到目标电脑：
   - 所有 `.js`, `.html`, `.json`, `.bat`, `.md` 文件
   - `images/` 文件夹
2. 确保目标电脑已安装 Node.js
3. 双击 `start.bat`，脚本会自动安装依赖

## 目标电脑要求

### 必需条件
- Windows 7 或更高版本
- Node.js 12 或更高版本（如果使用精简部署）

### 自动处理
- ✅ 依赖安装（如果 node_modules 不存在）
- ✅ 端口冲突处理
- ✅ 错误检查和提示

## 验证清单

在目标电脑上运行前，检查：
- [ ] `package.json` 存在
- [ ] `package-lock.json` 存在（推荐）
- [ ] `start.bat` 存在
- [ ] `server.js` 存在
- [ ] `index.html` 存在
- [ ] `images/` 文件夹存在
- [ ] 图片文件存在（comfort-zone-v1.jpg, comfort-zone-v2.jpg）
- [ ] 目标电脑已安装 Node.js（如果使用精简部署）

## 测试

在目标电脑上：
1. 双击 `start.bat`
2. 等待依赖安装（如果是精简部署）
3. 看到 "Server running at http://localhost:3000"
4. 在浏览器中访问 http://localhost:3000
5. 测试提交一个响应
6. 检查 `responses.csv` 是否创建

## 故障排除

如果无法运行，检查：
1. Node.js 是否安装：`node --version`
2. 是否在正确的文件夹中运行脚本
3. 防火墙是否阻止 Node.js
4. 查看 `start.bat` 的错误提示信息



