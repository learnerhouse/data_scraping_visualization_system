import DistributionData from '../../public/data/distribution.json';
import DistributionPieChart from '@/components/charts/PieChart';
import DistributionBarChart from '@/components/charts/BarChart';

export default function DistributionPage() {
  const data = Array.isArray(DistributionData) ? DistributionData : [];
  const totalRecords = data.reduce((sum, item) => sum + item.count, 0);
  const topSource = data.length > 0 ? data.reduce((max, item) => item.count > max.count ? item : max, data[0]) : { source: 'N/A', count: 0, percentage: 0 };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          数据源分布
        </h1>
        <p className="text-gray-600">
          各数据源的数据量分布和占比分析
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">饼图分布</h2>
            <p className="text-sm text-gray-600 mt-1">
              各数据源占比
            </p>
          </div>
          <DistributionPieChart data={data} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">柱状图分布</h2>
            <p className="text-sm text-gray-600 mt-1">
              各数据源数据量对比
            </p>
          </div>
          <DistributionBarChart data={data} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          分布详情
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数据源
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  数据量
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  占比
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  状态
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{
                          backgroundColor: [
                            '#3b82f6',
                            '#10b981',
                            '#f59e0b',
                            '#ef4444',
                            '#8b5cf6',
                            '#ec4899',
                          ][index % 6],
                        }}
                      />
                      <div className="text-sm font-medium text-gray-900">
                        {item.source}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {((item.percentage) * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      正常
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">数据统计</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">总记录数</span>
              <span className="font-semibold">{totalRecords.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">数据源数量</span>
              <span className="font-semibold">{data.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">平均量</span>
              <span className="font-semibold">
                {Math.round(totalRecords / data.length).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">占比分析</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">最大占比</span>
              <span className="font-semibold text-blue-600">
                {((topSource.percentage) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">最大数据源</span>
              <span className="font-semibold">{topSource.source}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">数据量</span>
              <span className="font-semibold">{topSource.count.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">分布特征</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">分布均匀度</span>
              <span className="font-semibold text-green-600">良好</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">集中度</span>
              <span className="font-semibold">中等</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">多样性</span>
              <span className="font-semibold">4 类</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
