# 如何将项目部署到其他Windows电脑

## 快速部署指南

### 选项 1：包含 node_modules（完整部署）

**优点：** 无需安装依赖，可直接运行  
**缺点：** 文件夹较大（约 50-100 MB）

**步骤：**
1. 复制整个项目文件夹到目标电脑
2. 双击 `start.bat` 即可运行

### 选项 2：不包含 node_modules（精简部署，推荐）

**优点：** 文件夹小（约 1-2 MB）  
**缺点：** 首次运行需要安装依赖（需要网络）

**步骤：**
1. 复制以下内容到目标电脑：
   ```
   ├── index.html
   ├── server.js
   ├── package.json
   ├── package-lock.json  (推荐包含)
   ├── start.bat
   ├── start-simple.bat
   ├── README.md
   ├── WINDOWS_INSTALL.md
   ├── DEPLOYMENT_CHECKLIST.md
   └── images/
       ├── comfort-zone-v1.jpg
       ├── comfort-zone-v2.jpg
       └── README.md
   ```
2. 确保目标电脑已安装 Node.js
3. 双击 `start.bat`，脚本会自动安装依赖

## 目标电脑要求

### 必需条件
- ✅ Windows 7 或更高版本
- ✅ Node.js 12 或更高版本（精简部署需要）

### 自动处理
- ✅ 依赖自动安装（如果 node_modules 不存在）
- ✅ 端口冲突自动处理
- ✅ 错误自动检测和提示

## 部署前检查清单

### 源电脑（当前电脑）
- [ ] 确保 `package.json` 存在
- [ ] 确保 `package-lock.json` 存在（推荐）
- [ ] 确保所有图片文件在 `images/` 文件夹中
- [ ] 测试运行确保一切正常

### 目标电脑（新电脑）
- [ ] 已安装 Node.js（如果使用精简部署）
- [ ] 有网络连接（首次运行需要，用于安装依赖）
- [ ] 防火墙允许 Node.js 运行

## 部署步骤详解

### 1. 准备文件

**如果包含 node_modules：**
- 复制整个文件夹（包括 node_modules）

**如果不包含 node_modules（推荐）：**
- 只复制源代码文件
- 不复制 `node_modules` 文件夹
- 不复制 `responses.csv`（除非需要历史数据）

### 2. 传输到目标电脑

可以使用以下方式：
- USB 驱动器
- 网络共享
- 云存储（OneDrive, Google Drive等）
- 压缩文件（ZIP）

### 3. 在目标电脑上运行

1. 解压文件（如果使用压缩文件）
2. 打开项目文件夹
3. 双击 `start.bat`
4. 等待依赖安装（如果是精简部署）
5. 看到 "Server running at http://localhost:3000"
6. 在浏览器中访问 http://localhost:3000

## 验证部署成功

运行以下检查：

1. ✅ `start.bat` 能够启动
2. ✅ 浏览器可以访问 http://localhost:3000
3. ✅ 调查问卷页面正常显示
4. ✅ 可以提交响应
5. ✅ `responses.csv` 文件被创建

## 常见问题

### Q: 需要包含 node_modules 吗？
**A:** 不需要。`start.bat` 会自动检测并安装依赖。

### Q: 目标电脑没有网络怎么办？
**A:** 需要包含 `node_modules` 文件夹，或者在有网络的电脑上先安装依赖。

### Q: 可以放在U盘上运行吗？
**A:** 可以，但建议：
- 使用精简部署（不包含 node_modules）
- 首次运行需要网络安装依赖
- 之后可以在离线状态下运行

### Q: 需要管理员权限吗？
**A:** 通常不需要，除非：
- 端口 3000 被系统服务占用
- 文件夹权限受限

## 文件大小参考

- **精简部署**（不含 node_modules）：约 1-2 MB
- **完整部署**（含 node_modules）：约 50-100 MB

## 推荐做法

1. 使用精简部署（不包含 node_modules）
2. 确保包含 `package-lock.json`（锁定依赖版本）
3. 在目标电脑上首次运行前确保有网络连接
4. 测试运行确保一切正常



