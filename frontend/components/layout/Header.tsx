import Link from 'next/link';
import { Database, BarChart3, TrendingUp, PieChart } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-primary-600" />
            <h1 className="text-xl font-bold text-gray-900">
              数据爬取系统
            </h1>
          </div>
          
          <nav className="flex space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <Database className="w-4 h-4" />
              <span>统计</span>
            </Link>
            <Link
              href="/trends"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <TrendingUp className="w-4 h-4" />
              <span>趋势</span>
            </Link>
            <Link
              href="/distribution"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <PieChart className="w-4 h-4" />
              <span>分布</span>
            </Link>
            <Link
              href="/data"
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              <span>数据</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
