import Stats from '../public/data/stats.json';
import StatCard from '@/components/stats/StatCard';
import SummaryBox from '@/components/stats/SummaryBox';

export default function Home() {
  const stats = typeof Stats === 'object' ? Stats : { total_records: 0, source_count: 0, today_new: 0, last_updated: '' };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          数据统计概览
        </h1>
        <p className="text-gray-600">
          实时监控数据爬取状态和统计信息
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="总记录数"
          value={stats.total_records}
          change={stats.today_new}
          icon="database"
        />
        <StatCard
          title="数据源数量"
          value={stats.source_count}
          icon="source"
        />
        <StatCard
          title="今日新增"
          value={stats.today_new}
          change={null}
          icon="trending"
        />
        <StatCard
          title="最后更新"
          value={stats.last_updated ? new Date(stats.last_updated).toLocaleDateString('zh-CN') : 'N/A'}
          change={null}
          icon="clock"
        />
      </div>

      <SummaryBox stats={stats} />
    </div>
  );
}
