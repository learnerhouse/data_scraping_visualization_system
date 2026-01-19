import { Activity, Zap, Database } from 'lucide-react';
import Stats from '../../public/data/stats.json';

interface SummaryBoxProps {
  stats: typeof Stats;
}

export default function SummaryBox({ stats }: SummaryBoxProps) {
  const lastUpdate = new Date(stats.last_updated);
  const now = new Date();
  const hoursSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60));

  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow-lg p-8 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">系统状态</h2>
        <Activity className="w-8 h-8 opacity-80" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-start space-x-3">
          <Zap className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm opacity-90 mb-1">系统状态</p>
            <p className="text-lg font-semibold">运行中</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Database className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm opacity-90 mb-1">上次更新</p>
            <p className="text-lg font-semibold">
              {hoursSinceUpdate < 1 ? '刚刚' : hoursSinceUpdate < 24 ? `${hoursSinceUpdate}小时前` : `${Math.floor(hoursSinceUpdate / 24)}天前`}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Activity className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm opacity-90 mb-1">今日采集</p>
            <p className="text-lg font-semibold">{stats.today_new} 条</p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/20">
        <p className="text-sm opacity-90">
          系统通过 GitHub Actions 每日自动运行，确保数据及时更新
        </p>
      </div>
    </div>
  );
}
