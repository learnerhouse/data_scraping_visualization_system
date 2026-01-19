# 数据爬取与可视化系统

基于 Next.js + Python 的多源数据爬取和可视化展示系统。

## ✨ 特性

- 🕷️ **多源数据爬取**：支持社交媒体、新闻网站、金融 API 等多种数据源
- 💾 **SQLite 数据库**：轻量级数据库存储，易于维护和备份
- 📊 **数据可视化**：使用 Recharts 实现时间趋势、分类分布等交互式图表
- 🤖 **自动化部署**：通过 GitHub Actions 实现每日定时爬取和自动部署到 GitHub Pages
- 🎨 **现代化界面**：基于 Next.js 14 + Tailwind CSS 构建响应式 UI
- 🔍 **数据搜索**：支持关键词搜索、分类筛选、来源筛选
- 📈 **实时统计**：基础统计、趋势分析、分布展示

## 🏗️ 项目结构

```
note/
├── frontend/                    # Next.js 前端应用
│   ├── app/                    # App Router 页面
│   │   ├── page.tsx           # 首页（基础统计）
│   │   ├── trends/            # 时间趋势页面
│   │   ├── distribution/      # 分类分布页面
│   │   └── data/              # 数据明细页面
│   ├── components/             # React 组件
│   │   ├── charts/            # 图表组件
│   │   ├── stats/             # 统计组件
│   │   ├── data/              # 数据组件
│   │   └── layout/            # 布局组件
│   ├── lib/                    # 工具库和类型
│   ├── public/data/            # 静态数据文件（JSON）
│   └── styles/                 # 全局样式
├── scraper/                     # Python 爬虫模块
│   ├── config/                 # 配置文件
│   ├── core/                   # 核心爬虫引擎
│   ├── sources/                # 数据源实现
│   ├── database/               # 数据库管理
│   └── utils/                  # 工具模块
├── data/                        # 数据存储目录（SQLite）
├── .github/workflows/          # GitHub Actions 配置
│   ├── scrape.yml             # 爬虫工作流
│   └── build.yml              # 构建工作流
├── README.md                   # 项目说明
├── QUICKSTART.md              # 快速开始指南
└── DEPLOYMENT.md              # 部署指南
```

## 🚀 快速开始

### 前置要求

- Node.js 18+
- Python 3.10+
- Git

### 本地开发

1. **克隆项目**

```bash
git clone <repository-url>
cd note
```

2. **安装前端依赖**

```bash
cd frontend
npm install
```

3. **启动开发服务器**

```bash
npm run dev
```

访问 http://localhost:3000 查看应用。

4. **运行爬虫**

```bash
cd scraper
pip install -r requirements.txt
python main.py
```

5. **生成数据文件**

```bash
python data_generator.py
```

## 📊 功能模块

### 前端页面

- **首页** (`/`)：基础统计数据展示（总记录数、数据源数量、今日新增等）
- **趋势页面** (`/trends`)：每日数据量变化趋势图表
- **分布页面** (`/distribution`)：各数据源占比分析（饼图、柱状图）
- **数据页面** (`/data`)：可搜索、可筛选、可排序的数据表格

### 后端模块

- **爬虫引擎**：基于 Requests + BeautifulSoup4 的多源爬虫框架
- **数据库管理**：SQLite 数据库 CRUD 操作
- **数据生成器**：自动生成前端所需的 JSON 数据文件
- **错误处理**：完善的错误重试机制和日志记录

## 🔧 技术栈

### 前端

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图表**: Recharts
- **UI**: React 18

### 后端

- **语言**: Python 3.10+
- **爬虫**: Requests + BeautifulSoup4
- **数据库**: SQLite
- **配置**: PyYAML

### 部署

- **托管**: GitHub Pages
- **CI/CD**: GitHub Actions
- **版本控制**: Git + Git LFS

## 📋 部署指南

详细的部署步骤请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)。

### 快速部署

1. **推送代码到 GitHub**

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **启用 GitHub Pages**

- 访问仓库 Settings > Pages
- 在 Source 中选择 GitHub Actions

3. **配置定时爬取**

编辑 `.github/workflows/scrape.yml` 中的 cron 表达式。

4. **访问你的网站**

等待构建完成后访问：`https://your-username.github.io/your-repo/`

## ⚙️ 配置说明

### 添加数据源

编辑 `scraper/config/sources.py`：

```python
SOURCES: List[SourceConfig] = [
    SourceConfig(
        name='数据源名称',
        type='news',  # 'news' | 'social_media' | 'api'
        base_url='https://example.com',
        selectors={
            'item': '.item-selector',
            'title': '.title-selector',
            'content': '.content-selector',
            'url': 'a.link-selector',
        },
        enabled=True,  # 启用爬虫
    ),
]
```

### 修改爬取频率

编辑 `.github/workflows/scrape.yml`：

```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 每天 UTC 0:00
```

### 自定义仓库名称

编辑 `frontend/next.config.js`：

```javascript
module.exports = {
  basePath: '/your-repo-name',
  // ...其他配置
};
```

## 🐛 故障排查

### 常见问题

1. **构建失败**：检查 Actions 日志，确认依赖安装成功
2. **页面无法访问**：确认 Pages 设置正确，等待构建完成
3. **数据未更新**：检查爬虫是否启用，查看爬虫工作流日志

更多问题请查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 中的故障排查部分。

## 📚 文档

- [快速开始指南](./QUICKSTART.md)
- [部署指南](./DEPLOYMENT.md)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- Next.js 团队
- Recharts 团队
- BeautifulSoup4 团队
- GitHub Actions 团队

---

**注意**：本项目用于学习和演示目的，请遵守目标网站的使用条款和 robots.txt 规则。
