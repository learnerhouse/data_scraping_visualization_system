# 快速检查清单

## ✅ 部署前检查

- [ ] 所有代码已提交到 Git
- [ ] 已推送到 GitHub 仓库
- [ ] GitHub 仓库名为 `data_scraping_visualization_system`
- [ ] `frontend/next.config.js` 中的 `basePath` 已设置为 `/data_scraping_visualization_system`
- [ ] `.github/workflows/build.yml` 配置正确
- [ ] `.github/workflows/scrape.yml` 配置正确

## 🚀 GitHub Pages 设置

### 步骤 1：启用 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 下拉菜单中选择 **GitHub Actions**
5. 点击 **Save**

### 步骤 2：手动触发构建

1. 访问仓库的 **Actions** 标签
2. 在左侧选择 **Build and Deploy** 工作流
3. 点击 **Run workflow**
4. 点击绿色的 **Run workflow** 按钮
5. 等待工作流完成（约 5-10 分钟）

## 🔍 检查部署状态

### 1. 检查 Actions 工作流

- 访问 **Actions** 标签
- 查看最新的 **Build and Deploy** 工作流
- 确认状态为 ✅ **Success**
- 点击查看详细日志，确认没有错误

### 2. 检查 gh-pages 分支

- 访问仓库的 **Code** 标签
- 在分支下拉菜单中选择 **gh-pages**
- 应该看到以下文件：
  - `index.html`
  - `404.html`
  - `_next/` 目录
  - `data/` 目录
  - `.nojekyll` 文件

### 3. 检查 Pages 设置

- 访问 **Settings** > **Pages**
- 确认以下信息：
  - **Source**: GitHub Actions
  - **Status**: ✅ Deployed
  - **Last deployment**: 显示最近的部署时间

## 🌐 访问网站

### 正确的 URL

```
https://learnerhouse.github.io/data_scraping_visualization_system/
```

### 访问后看到的内容

- ✅ **正常情况**：看到网站的首页，包含统计数据卡片
- ❌ **异常情况**：看到 README.md 内容

### 如果看到 README.md

1. 清除浏览器缓存（`Ctrl + Shift + R` 或 `Cmd + Shift + R`）
2. 尝试使用无痕/隐私模式访问
3. 确认 URL 正确（结尾有 `/`）
4. 等待 5-10 分钟让 GitHub Pages 更新

## 🐛 常见问题快速解决

### 问题 1：Actions 工作流失败

**原因**：依赖安装失败或构建错误

**解决**：
1. 点击失败的 Actions 工作流
2. 查看错误日志
3. 常见错误：
   - Node.js 版本不匹配 → 检查 `package.json`
   - 依赖安装失败 → 重新运行工作流
   - 构建超时 → 优化代码或增加超时时间

### 问题 2：页面显示 404

**原因**：gh-pages 分支为空或未正确部署

**解决**：
1. 手动触发 Build and Deploy 工作流
2. 等待工作流完成
3. 清除浏览器缓存
4. 确认 URL 正确

### 问题 3：页面样式丢失

**原因**：静态资源未正确加载

**解决**：
1. 检查 `frontend/next.config.js` 配置
2. 确认 `basePath` 设置正确
3. 检查浏览器控制台是否有错误
4. 清除浏览器缓存

### 问题 4：数据未更新

**原因**：爬虫未运行或数据文件未生成

**解决**：
1. 检查爬虫工作流是否运行
2. 确认数据源是否启用（`enabled=True`）
3. 查看爬虫工作流日志
4. 手动触发爬虫工作流

## 📞 需要帮助？

如果以上方法都无法解决问题：

1. 查看 [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) 获取详细排查步骤
2. 在 GitHub 仓库创建 Issue
3. 包含以下信息：
   - GitHub Actions 日志链接
   - 错误截图
   - GitHub Pages 设置截图
   - 浏览器控制台错误信息

---

**提示**：首次部署可能需要等待 10-15 分钟才能完全生效，请耐心等待。
