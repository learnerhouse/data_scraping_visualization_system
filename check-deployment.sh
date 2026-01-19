#!/bin/bash

echo "🔍 GitHub Pages 部署状态检查脚本"
echo "======================================"
echo ""

echo "📁 检查项目文件..."
if [ -f "frontend/next.config.js" ]; then
    echo "✅ Next.js 配置文件存在"
else
    echo "❌ Next.js 配置文件不存在"
fi

if [ -f "frontend/package.json" ]; then
    echo "✅ package.json 存在"
else
    echo "❌ package.json 不存在"
fi

if [ -f ".nojekyll" ]; then
    echo "✅ 根目录 .nojekyll 文件存在"
else
    echo "⚠️  根目录 .nojekyll 文件不存在（可选）"
fi

echo ""
echo "📂 检查数据文件..."
if [ -d "frontend/public/data" ]; then
    echo "✅ frontend/public/data 目录存在"
    if [ -f "frontend/public/data/stats.json" ]; then
        echo "✅ stats.json 存在"
    fi
    if [ -f "frontend/public/data/trends.json" ]; then
        echo "✅ trends.json 存在"
    fi
    if [ -f "frontend/public/data/distribution.json" ]; then
        echo "✅ distribution.json 存在"
    fi
    if [ -f "frontend/public/data/details.json" ]; then
        echo "✅ details.json 存在"
    fi
else
    echo "❌ frontend/public/data 目录不存在"
fi

echo ""
echo "⚙️  检查 GitHub Actions 配置..."
if [ -f ".github/workflows/build.yml" ]; then
    echo "✅ build.yml 存在"
else
    echo "❌ build.yml 不存在"
fi

if [ -f ".github/workflows/scrape.yml" ]; then
    echo "✅ scrape.yml 存在"
else
    echo "❌ scrape.yml 不存在"
fi

echo ""
echo "📋 检查配置文件..."
if [ -f "README.md" ]; then
    echo "✅ README.md 存在"
fi

if [ -f ".gitignore" ]; then
    echo "✅ .gitignore 存在"
fi

echo ""
echo "🌐 你的网站 URL:"
echo "https://learnerhouse.github.io/data_scraping_visualization_system/"
echo ""
echo "注意：仓库名拼写更正为 data_scraping_visualization_system (scraping 而不是 scraping)"
echo ""

echo "📝 下一步操作："
echo "1. 确保所有文件都已提交到 Git"
echo "2. 推送到 GitHub 仓库"
echo "3. 访问仓库的 Settings > Pages，确认 Source 为 GitHub Actions"
echo "4. 访问 Actions 标签，手动触发 Build and Deploy 工作流"
echo "5. 等待 5-10 分钟后访问网站"
echo ""

echo "🔧 如果遇到问题，请查看 TROUBLESHOOTING.md 文件"
echo ""
