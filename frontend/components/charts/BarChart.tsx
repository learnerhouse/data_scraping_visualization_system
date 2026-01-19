'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DistributionData } from '@/lib/types';
import { formatPercentage } from '@/lib/utils';

interface DistributionBarChartProps {
  data: DistributionData[];
}

export default function DistributionBarChart({ data }: DistributionBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="source"
          tick={{ fontSize: 12 }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
          formatter={(value: number, name: string, props: any) => [
            `${value.toLocaleString()} 条 (${formatPercentage(props.payload.percentage)})`,
            name,
          ]}
        />
        <Legend />
        <Bar
          dataKey="count"
          fill="#3b82f6"
          name="数据量"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
