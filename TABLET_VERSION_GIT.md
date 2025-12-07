# 如何将 tablet-version 添加到 GitHub

## 问题说明

`tablet-version/` 目录是新创建的，可能还没有被 Git 跟踪。需要手动添加这些文件到 Git 并提交。

## 方法 1：使用命令行（推荐）

### macOS/Linux:

```bash
# 1. 添加 tablet-version 目录到 Git
git add tablet-version/

# 2. 检查状态（确认文件已添加）
git status

# 3. 提交更改
git commit -m "Add tablet-optimized version of survey"

# 4. 推送到 GitHub
git push origin main
# 或者如果您的默认分支是 master:
# git push origin master
```

### Windows:

```cmd
# 1. 添加 tablet-version 目录到 Git
git add tablet-version/

# 2. 检查状态（确认文件已添加）
git status

# 3. 提交更改
git commit -m "Add tablet-optimized version of survey"

# 4. 推送到 GitHub
git push origin main
# 或者如果您的默认分支是 master:
# git push origin master
```

## 方法 2：使用提供的脚本

### macOS/Linux:

```bash
./add-tablet-version.sh
```

然后按照提示执行提交和推送命令。

### Windows:

双击运行 `add-tablet-version.bat`，然后按照提示执行提交和推送命令。

## 方法 3：使用 GitHub Desktop 或其他 Git GUI

1. 打开 GitHub Desktop（或其他 Git GUI 工具）
2. 您应该会看到 `tablet-version/` 目录显示为未跟踪的文件
3. 勾选 `tablet-version/` 目录
4. 在提交消息中输入：`Add tablet-optimized version of survey`
5. 点击 "Commit"
6. 点击 "Push" 推送到 GitHub

## 验证

提交后，在 GitHub 网页上检查：
- 应该能看到 `tablet-version/` 目录
- 目录下应该有：
  - `index.html`
  - `README.md`
  - `images/` 文件夹（包含两个图片文件）

## 如果遇到问题

### 问题：`git push` 被拒绝

**解决方案：** 先拉取最新更改
```bash
git pull origin main
# 或
git pull origin master
```

然后再次推送：
```bash
git push origin main
```

### 问题：找不到 `tablet-version/` 目录

**检查：**
1. 确认您在正确的目录：`/Users/ivyz/Documents/GitHub/Fitness Center`
2. 运行 `ls tablet-version/` 确认目录存在
3. 运行 `git status` 查看未跟踪的文件

### 问题：文件太大无法推送

如果图片文件太大，GitHub 可能会拒绝。可以：
1. 压缩图片文件
2. 或使用 Git LFS（Large File Storage）

## 下一步

文件推送到 GitHub 后，您可以：
1. 在 GitHub Pages 中部署 `tablet-version/index.html`
2. 或直接在 GitHub 上查看文件

