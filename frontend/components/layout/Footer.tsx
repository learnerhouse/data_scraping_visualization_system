import { Clock, Github } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function Footer() {
  const lastUpdate = new Date().toLocaleString('zh-CN');

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">最后更新: {lastUpdate}</span>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span>由 GitHub Actions 自动更新</span>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 hover:text-primary-600 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} 数据爬取系统. 基于 Next.js + Python 构建
        </div>
      </div>
    </footer>
  );
}
