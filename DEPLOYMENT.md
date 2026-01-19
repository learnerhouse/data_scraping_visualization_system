# 部署指南

## 部署到 GitHub Pages

### 前提条件

1. GitHub 账号
2. Git 已安装
3. 仓库已创建

### 步骤 1: 初始化 Git 仓库

```bash
git init
git add .
git commit -m "Initial commit: Data scraping and visualization system"
```

### 步骤 2: 配置 Git LFS

```bash
git lfs install
```

### 步骤 3: 添加远程仓库

```bash
git remote add origin https://github.com/your-username/your-repo.git
```

### 步骤 4: 推送到 GitHub

```bash
git branch -M main
git push -u origin main
```

### 步骤 5: 配置 GitHub Pages

1. 访问你的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

### 步骤 6: 启用 GitHub Actions

GitHub Actions 会自动启用，首次推送后会运行：
- `scrape.yml` - 爬虫工作流（手动触发或定时）
- `build.yml` - 构建和部署工作流（自动触发）

### 步骤 7: 配置定时爬取（可选）

编辑 `.github/workflows/scrape.yml` 中的 cron 表达式：

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 0:00 运行
```

Cron 格式：`分 时 日 月 周`

常用示例：
- `0 0 * * *` - 每天 0:00
- `0 */6 * * *` - 每 6 小时
- `0 8 * * 1` - 每周一 8:00

### 步骤 8: 访问你的网站

等待构建完成后（约 5-10 分钟），访问：
```
https://your-username.github.io/your-repo/
```

## 自定义配置

### 修改仓库名称

如果仓库名不是 `note`，需要修改 `frontend/next.config.js`：

```javascript
module.exports = {
  basePath: '/your-repo-name',
  // ...其他配置
};
```

### 添加数据源

编辑 `scraper/config/sources.py`：

```python
SOURCES: List[SourceConfig] = [
    SourceConfig(
        name='新数据源',
        type='news',  # 或 'social_media', 'api'
        base_url='https://example.com',
        selectors={
            'item': '.item-selector',
            'title': '.title-selector',
            'content': '.content-selector',
            'url': 'a.link-selector',
            'date': '.date-selector',
        },
        enabled=True,  # 启用爬虫
    ),
]
```

### 添加 GitHub Secrets

如果需要存储敏感信息（API 密钥等）：

1. 访问仓库 Settings
2. 点击 **Secrets and variables** > **Actions**
3. 点击 **New repository secret**
4. 添加 secret 名称和值
5. 在工作流中引用：`${{ secrets.YOUR_SECRET_NAME }}`

## 故障排查

### 构建失败

1. 检查 **Actions** 标签下的工作流日志
2. 常见问题：
   - Node.js 版本不兼容
   - 依赖安装失败
   - 构建超时

### 页面无法访问

1. 检查 **Pages** 设置是否正确
2. 确认工作流运行成功
3. 清除浏览器缓存

### 数据未更新

1. 检查爬虫是否启用（`enabled=True`）
2. 查看爬虫工作流日志
3. 确认数据源 URL 可访问

### Git LFS 问题

```bash
# 查看 LFS 状态
git lfs ls-files

# 拉取 LFS 文件
git lfs pull

# 跟踪新文件
git lfs track "*.db"
```

## 监控和维护

### 查看工作流状态

访问仓库的 **Actions** 标签查看所有工作流运行记录。

### 手动触发爬虫

在 GitHub 网页界面：
1. 访问 **Actions** 标签
2. 选择 **Daily Scraping** 工作流
3. 点击 **Run workflow**

### 清理旧数据

定期清理数据库以减小文件大小：

```bash
# 连接到 SQLite 数据库
sqlite3 data/scraper.db

# 删除 30 天前的数据
DELETE FROM scraped_data WHERE scraped_at < datetime('now', '-30 days');

# 退出
.quit
```

## 性能优化

### 减少构建时间

1. 限制爬取的数据量
2. 使用缓存策略
3. 优化数据库查询

### 减小文件大小

1. 压缩 JSON 数据
2. 删除不必要的字段
3. 定期清理历史数据

## 扩展功能

### 添加通知

在 `.github/workflows/scrape.yml` 中添加邮件或通知步骤：

```yaml
- name: Send notification
  if: failure()
  run: |
    # 添加你的通知逻辑
```

### 使用外部数据库

对于大规模数据，考虑使用：
- PostgreSQL
- MySQL
- MongoDB

修改 `scraper/database/db_manager.py` 适配新数据库。

## 安全建议

1. **不要提交敏感信息**
   - API 密钥使用 GitHub Secrets
   - 配置文件中的敏感信息使用环境变量

2. **限制访问频率**
   - 遵守目标网站的 robots.txt
   - 实现适当的请求延迟

3. **数据备份**
   - 定期备份数据库
   - 使用 Git 标签标记重要版本

## 许可证

MIT License
