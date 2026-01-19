import { Database, Globe, TrendingUp, Clock } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: number | null;
  icon?: 'database' | 'source' | 'trending' | 'clock';
}

export default function StatCard({ title, value, change, icon = 'database' }: StatCardProps) {
  const iconMap = {
    database: Database,
    source: Globe,
    trending: TrendingUp,
    clock: Clock,
  };

  const Icon = iconMap[icon];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === 'number' ? formatNumber(value) : value}
          </p>
          {change !== undefined && change !== null && (
            <div className="mt-2 flex items-center">
              <span className={cn(
                'text-sm font-medium',
                change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-gray-600'
              )}>
                {change > 0 ? '+' : ''}{change}
              </span>
              <span className="text-sm text-gray-500 ml-1">较昨日</span>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          <div className="p-3 bg-primary-50 rounded-lg">
            <Icon className="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
