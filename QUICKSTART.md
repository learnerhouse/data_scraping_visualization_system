# 快速开始指南

## 前置要求

- Node.js 18+
- Python 3.10+
- Git

## 本地开发

### 1. 克隆项目

```bash
git clone <repository-url>
cd note
```

### 2. 初始化 Git LFS

```bash
git lfs install
git lfs pull
```

### 3. 安装前端依赖

```bash
cd frontend
npm install
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

### 5. 运行爬虫

```bash
cd scraper
pip install -r requirements.txt
python main.py
```

### 6. 生成数据文件

```bash
python data_generator.py
```

## 配置数据源

编辑 `scraper/config/sources.py`，修改 `SOURCES` 列表：

```python
SOURCES: List[SourceConfig] = [
    SourceConfig(
        name='数据源名称',
        type='social_media',  # 或 'news', 'api'
        base_url='https://example.com',
        selectors={
            'item': '.item-class',
            'title': '.title-class',
            'content': '.content-class',
            'url': 'a.link-class',
        },
        enabled=True,  # 设置为 True 启用
    ),
]
```

## 部署到 GitHub Pages

### 1. 初始化 Git 仓库

```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. 推送到 GitHub

```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### 3. 启用 GitHub Pages

1. 访问仓库 Settings
2. 找到 "Pages" 部分
3. 在 "Source" 下选择 "GitHub Actions"

### 4. 配置 GitHub Secrets（可选）

如果需要 API 密钥等敏感信息，在仓库 Settings > Secrets and variables > Actions 中添加。

## 工作流说明

### 每日自动爬取

- 触发时间：每天 UTC 0:00（北京时间 8:00）
- 工作流：`.github/workflows/scrape.yml`
- 功能：运行爬虫 → 生成数据 → 提交到仓库 → 触发构建

### 自动构建部署

- 触发条件：代码推送或爬虫完成
- 工作流：`.github/workflows/build.yml`
- 功能：构建 Next.js → 静态导出 → 部署到 GitHub Pages

## 目录结构

```
note/
├── frontend/              # Next.js 前端
│   ├── app/              # 页面
│   ├── components/       # 组件
│   ├── lib/             # 工具库
│   └── public/data/     # 静态数据
├── scraper/              # Python 爬虫
│   ├── config/          # 配置
│   ├── core/            # 爬虫引擎
│   ├── database/        # 数据库
│   └── utils/           # 工具
├── data/                # 数据存储
└── .github/workflows/   # GitHub Actions
```

## 常见问题

### Q: 如何修改爬取频率？

A: 编辑 `.github/workflows/scrape.yml`，修改 `cron` 表达式。

### Q: 如何添加新的数据源？

A: 参考 `scraper/config/sources.py`，添加新的 `SourceConfig`。

### Q: 如何自定义图表样式？

A: 编辑 `frontend/components/charts/` 下的组件文件。

### Q: 数据库文件太大怎么办？

A: 使用 Git LFS 管理，定期清理旧数据，或考虑使用外部数据库。

## 许可证

MIT License
