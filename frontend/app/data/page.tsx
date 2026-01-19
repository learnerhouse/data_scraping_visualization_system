'use client';

import { useState, useMemo } from 'react';
import DetailsData from '../../public/data/details.json';
import SearchBar from '@/components/data/SearchBar';
import FilterBar from '@/components/data/FilterBar';
import DataTable from '@/components/data/DataTable';
import { ScrapedItem } from '@/lib/types';

export default function DataPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  
  const data = Array.isArray(DetailsData) ? DetailsData : [];

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(data.map(item => item.category)));
    return uniqueCategories;
  }, [data]);

  const sources = useMemo(() => {
    const uniqueSources = Array.from(new Set(data.map(item => item.source)));
    return uniqueSources;
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesSource = !selectedSource || item.source === selectedSource;
      
      return matchesSearch && matchesCategory && matchesSource;
    });
  }, [data, searchQuery, selectedCategory, selectedSource]);

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSource(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          数据明细
        </h1>
        <p className="text-gray-600">
          查看所有爬取的数据记录
        </p>
      </div>

      <div className="mb-6">
        <SearchBar onSearch={setSearchQuery} />
      </div>

      <FilterBar
        categories={categories}
        sources={sources}
        selectedCategory={selectedCategory}
        selectedSource={selectedSource}
        onCategoryChange={setSelectedCategory}
        onSourceChange={setSelectedSource}
        onReset={handleReset}
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          共找到 <span className="font-semibold text-gray-900">{filteredData.length}</span> 条数据
        </p>
      </div>

      <DataTable data={filteredData} />

      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">数据统计</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {data.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">总记录数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {sources.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">数据源数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {categories.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">分类数</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {filteredData.length}
            </div>
            <div className="text-sm text-gray-600 mt-1">筛选结果</div>
          </div>
        </div>
      </div>
    </div>
  );
}
