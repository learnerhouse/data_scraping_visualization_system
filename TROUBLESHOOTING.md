# GitHub Pages 部署问题排查指南

## 问题：访问 GitHub Pages 显示 README 而不是网站

### 可能的原因：

1. **GitHub Actions 工作流未成功运行**
2. **GitHub Pages Source 设置不正确**
3. **部署目录配置错误**
4. **缓存问题**

### 解决方案：

#### 1. 检查 GitHub Actions 运行状态

1. 访问你的 GitHub 仓库
2. 点击 **Actions** 标签
3. 查看 **Build and Deploy** 工作流是否成功运行
4. 如果失败，点击工作流查看错误日志

#### 2. 重新配置 GitHub Pages 设置

1. 访问仓库的 **Settings** 页面
2. 在左侧菜单中找到 **Pages**
3. 在 **Source** 部分确保选择的是 **GitHub Actions**
4. 如果显示的是其他选项，改为 **GitHub Actions**
5. 保存设置

#### 3. 手动触发构建

1. 访问仓库的 **Actions** 标签
2. 选择 **Build and Deploy** 工作流
3. 点击 **Run workflow**
4. 等待构建完成（约 5-10 分钟）

#### 4. 清除浏览器缓存

1. 按 `Ctrl + Shift + R`（Windows）或 `Cmd + Shift + R`（Mac）
2. 或者尝试使用无痕/隐私模式访问

#### 5. 检查正确的访问 URL

你的网站 URL 应该是：
```
https://learnerhouse.github.io/data_scraping_visualization_system/
```

注意：
- 仓库名拼写：`data_scraping_visualization_system`（注意是 scraping 而不是 scraping）
- URL 结尾有 `/`

### 验证部署是否成功

#### 方法 1：查看 Actions 日志

1. 访问仓库的 **Actions** 标签
2. 点击最新的 **Build and Deploy** 工作流
3. 查看日志最后几行，应该看到类似输出：
   ```
   🚀 Deploying to GitHub Pages...
   ✅ Deployment successful!
   ```

#### 方法 2：检查 gh-pages 分支

1. 访问仓库的 **main** 分支
2. 在分支下拉菜单中选择 **gh-pages**
3. 应该看到 Next.js 构建输出的文件（如 index.html、_next 目录等）

#### 方法 3：检查仓库设置

1. 访问 **Settings** > **Pages**
2. 在 **Build and deployment** 部分应该显示：
   - **Source**: GitHub Actions
   - **Status**: ✅ Deployed
   - **Last deployment**: [时间]

### 常见问题

#### Q: 为什么显示 README.md？

**A**: GitHub Pages 默认会显示根目录的 README.md，如果：
- GitHub Actions 未成功部署
- gh-pages 分支不存在或为空
- GitHub Pages 设置不正确

#### Q: 构建成功但页面还是旧的？

**A**: 可能的原因：
- 浏览器缓存：尝试清除缓存或使用无痕模式
- GitHub Pages 缓存：等待 5-10 分钟让更新生效
- 检查是否访问了正确的 URL

#### Q: 如何查看部署的文件？

**A**:
1. 切换到 `gh-pages` 分支
2. 查看该分支的文件
3. 应该包含：
   - `index.html`
   - `404.html`
   - `_next/` 目录
   - `data/` 目录
   - `.nojekyll` 文件

### 如果问题依然存在

#### 步骤 1：删除 gh-pages 分支

1. 访问仓库的 **Settings** > **Branches**
2. 找到 `gh-pages` 分支
3. 点击删除图标
4. 确认删除

#### 步骤 2：重新触发工作流

1. 访问仓库的 **Actions** 标签
2. 选择 **Build and Deploy** 工作流
3. 点击 **Run workflow**
4. 等待完成

#### 步骤 3：验证 gh-pages 分支已创建

1. 重新访问 **Settings** > **Branches**
2. 确认 `gh-pages` 分支已重新创建

#### 步骤 4：清除 CDN 缓存

如果使用 Cloudflare 或其他 CDN 服务：
1. 登录 CDN 控制面板
2. 清除该域名的缓存
3. 等待几分钟后重新访问

### 联系支持

如果以上方法都无法解决问题，请：

1. 查看 GitHub Actions 的完整日志
2. 复制错误信息
3. 在仓库中创建 Issue
4. 包含以下信息：
   - Actions 日志链接
   - 错误信息截图
   - GitHub Pages 设置截图

---

**更新时间**: 2026-01-19
