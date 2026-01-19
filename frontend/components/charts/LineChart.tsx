'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendData } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface TrendLineChartProps {
  data: TrendData[];
}

export default function TrendLineChart({ data }: TrendLineChartProps) {
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="formattedDate"
          tick={{ fontSize: 12 }}
          interval="preserveStartEnd"
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="total_count"
          stroke="#3b82f6"
          strokeWidth={2}
          name="总记录数"
          dot={{ fill: '#3b82f6' }}
        />
        <Line
          type="monotone"
          dataKey="new_count"
          stroke="#10b981"
          strokeWidth={2}
          name="每日新增"
          dot={{ fill: '#10b981' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
