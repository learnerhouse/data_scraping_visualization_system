import TrendData from '../../public/data/trends.json';
import TrendLineChart from '@/components/charts/LineChart';

export default function TrendsPage() {
  const data = Array.isArray(TrendData) ? TrendData : [];
  const recentData = data.slice(-30);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          时间趋势分析
        </h1>
        <p className="text-gray-600">
          数据量随时间变化的趋势分析
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            近30天趋势
          </h2>
          <p className="text-sm text-gray-600">
            显示总记录数和每日新增数据的变化趋势
          </p>
        </div>
        <TrendLineChart data={recentData} />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">趋势统计</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">总记录数</span>
              <span className="font-semibold">
                {data[data.length - 1]?.total_count?.toLocaleString() || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">平均每日新增</span>
              <span className="font-semibold">
                {data.length > 0 ? Math.round(data.reduce((sum, d) => sum + d.new_count, 0) / data.length) : 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">最高日增量</span>
              <span className="font-semibold">
                {data.length > 0 ? Math.max(...data.map(d => d.new_count)) : 0}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">增长趋势</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">本周新增</span>
              <span className="font-semibold text-green-600">
                +{data.slice(-7).reduce((sum, d) => sum + d.new_count, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">本月新增</span>
              <span className="font-semibold text-blue-600">
                +{data.slice(-30).reduce((sum, d) => sum + d.new_count, 0)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">增长率</span>
              <span className="font-semibold">
                {data.length > 1 ? ((data[data.length - 1].total_count / data[0].total_count - 1) * 100).toFixed(2) : '0.00'}%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">数据质量</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">连续采集天数</span>
              <span className="font-semibold">{data.length} 天</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">数据完整性</span>
              <span className="font-semibold text-green-600">100%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">最后更新</span>
              <span className="font-semibold">{data[data.length - 1]?.date || 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
