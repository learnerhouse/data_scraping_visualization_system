export interface ScrapedItem {
  id: number;
  source: string;
  title: string;
  content: string;
  url: string;
  category: string;
  tags: string[];
  metadata: Record<string, any>;
  scraped_at: string;
  published_at: string;
}

export interface Stats {
  total_records: number;
  source_count: number;
  last_updated: string;
  today_new: number;
}

export interface TrendData {
  date: string;
  total_count: number;
  new_count: number;
}

export interface DistributionData {
  source: string;
  count: number;
  percentage: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: string;
}
