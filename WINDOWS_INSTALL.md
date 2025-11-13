# Windows Installation Guide

## 系统要求

- Windows 7 或更高版本
- Node.js 12 或更高版本
- 管理员权限（用于安装Node.js）

## 安装步骤

### 1. 安装 Node.js

1. 访问 https://nodejs.org/
2. 下载 LTS 版本（推荐）
3. 运行安装程序
4. 安装时选择 "Add to PATH" 选项
5. 完成安装后，重启命令提示符

### 2. 验证安装

打开命令提示符（CMD）或 PowerShell，运行：

```cmd
node --version
npm --version
```

如果显示版本号，说明安装成功。

### 3. 安装项目依赖

在项目文件夹中打开命令提示符，运行：

```cmd
npm install
```

### 4. 添加图片

将以下图片放入 `images/` 文件夹：
- `comfort-zone-v1.jpg`
- `comfort-zone-v2.jpg`

### 5. 启动服务器

#### 方法 1：使用批处理文件（推荐）

双击 `start.bat` 文件

#### 方法 2：使用命令提示符

```cmd
node server.js
```

或

```cmd
npm start
```

### 6. 访问应用

在浏览器中打开：**http://localhost:3000**

## 常见问题

### 问题：双击 start.bat 没有反应

**解决方案：**
1. 右键点击 `start.bat` → 属性
2. 如果看到"解除锁定"按钮，点击它
3. 或者从命令提示符运行：`start.bat`

### 问题：提示 "Node.js 不是内部或外部命令"

**解决方案：**
1. 确保已安装 Node.js
2. 重启命令提示符
3. 检查环境变量 PATH 是否包含 Node.js 路径

### 问题：端口 3000 已被占用

**解决方案：**
- `start.bat` 脚本会自动尝试释放端口
- 或手动停止占用端口的进程：
  ```cmd
  netstat -ano | findstr :3000
  taskkill /PID <PID号> /F
  ```

### 问题：无法创建 CSV 文件

**解决方案：**
1. 确保项目文件夹不是只读的
2. 右键文件夹 → 属性 → 取消"只读"选项
3. 以管理员身份运行命令提示符

## 文件说明

- `start.bat` - 完整的启动脚本（包含错误检查）
- `start-simple.bat` - 简单的启动脚本
- `server.js` - 服务器主文件
- `index.html` - 前端页面
- `package.json` - 项目依赖配置

## 技术支持

如果遇到问题，请检查：
1. Node.js 是否正确安装
2. 依赖是否已安装（`node_modules` 文件夹是否存在）
3. 端口 3000 是否可用
4. 防火墙是否阻止了 Node.js



