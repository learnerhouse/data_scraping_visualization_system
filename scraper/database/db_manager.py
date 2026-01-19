import sqlite3
import json
from datetime import datetime, date
from typing import List, Dict, Any, Optional
from pathlib import Path
from contextlib import contextmanager
import logging

from config.settings import DATABASE_PATH
from database.models import ScrapedItem, DailyStats

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self, db_path: Path = DATABASE_PATH):
        self.db_path = db_path
        self.db_path.parent.mkdir(parents=True, exist_ok=True)
        self._init_db()

    @contextmanager
    def get_connection(self):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()

    def _init_db(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS scraped_data (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    source TEXT NOT NULL,
                    title TEXT,
                    content TEXT,
                    url TEXT UNIQUE,
                    category TEXT,
                    tags TEXT,
                    metadata TEXT,
                    scraped_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    published_at DATETIME
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS daily_stats (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    date DATE NOT NULL UNIQUE,
                    total_count INTEGER,
                    new_count INTEGER,
                    source_counts TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_source ON scraped_data(source)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_category ON scraped_data(category)')
            cursor.execute('CREATE INDEX IF NOT EXISTS idx_url ON scraped_data(url)')
            
            conn.commit()

    def save_item(self, item: ScrapedItem) -> bool:
        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT OR REPLACE INTO scraped_data 
                    (source, title, content, url, category, tags, metadata, scraped_at, published_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', (
                    item.source,
                    item.title,
                    item.content,
                    item.url,
                    item.category,
                    json.dumps(item.tags, ensure_ascii=False),
                    json.dumps(item.metadata, ensure_ascii=False),
                    item.scraped_at,
                    item.published_at,
                ))
                conn.commit()
                return True
        except Exception as e:
            logger.error(f"Error saving item: {e}")
            return False

    def save_items(self, items: List[ScrapedItem]) -> int:
        saved_count = 0
        for item in items:
            if self.save_item(item):
                saved_count += 1
        return saved_count

    def count_total(self) -> int:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(*) as count FROM scraped_data')
            result = cursor.fetchone()
            return result['count'] if result else 0

    def count_sources(self) -> int:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT COUNT(DISTINCT source) as count FROM scraped_data')
            result = cursor.fetchone()
            return result['count'] if result else 0

    def count_today_new(self) -> int:
        today = date.today()
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                'SELECT COUNT(*) as count FROM scraped_data WHERE DATE(scraped_at) = ?',
                (today,)
            )
            result = cursor.fetchone()
            return result['count'] if result else 0

    def last_update_time(self) -> Optional[datetime]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT MAX(scraped_at) as last_update FROM scraped_data')
            result = cursor.fetchone()
            return result['last_update'] if result and result['last_update'] else None

    def get_source_distribution(self) -> List[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT source, COUNT(*) as count
                FROM scraped_data
                GROUP BY source
                ORDER BY count DESC
            ''')
            results = cursor.fetchall()
            total = self.count_total()
            return [
                {
                    'source': row['source'],
                    'count': row['count'],
                    'percentage': row['count'] / total if total > 0 else 0,
                }
                for row in results
            ]

    def get_daily_trends(self, days: int = 30) -> List[Dict[str, Any]]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT 
                    DATE(scraped_at) as date,
                    COUNT(*) as new_count,
                    SUM(COUNT(*)) OVER (ORDER BY DATE(scraped_at)) as total_count
                FROM scraped_data
                WHERE DATE(scraped_at) >= date('now', '-' || ? || ' days')
                GROUP BY DATE(scraped_at)
                ORDER BY DATE(scraped_at)
            ''', (days,))
            results = cursor.fetchall()
            return [
                {
                    'date': row['date'],
                    'new_count': row['new_count'],
                    'total_count': row['total_count'],
                }
                for row in results
            ]

    def get_all_items(self, limit: int = 1000) -> List[ScrapedItem]:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT * FROM scraped_data
                ORDER BY scraped_at DESC
                LIMIT ?
            ''', (limit,))
            results = cursor.fetchall()
            return [
                ScrapedItem(
                    id=row['id'],
                    source=row['source'],
                    title=row['title'],
                    content=row['content'],
                    url=row['url'],
                    category=row['category'],
                    tags=json.loads(row['tags']) if row['tags'] else [],
                    metadata=json.loads(row['metadata']) if row['metadata'] else {},
                    scraped_at=datetime.fromisoformat(row['scraped_at']) if row['scraped_at'] else None,
                    published_at=datetime.fromisoformat(row['published_at']) if row['published_at'] else None,
                )
                for row in results
            ]

    def save_daily_stats(self, stats: DailyStats) -> bool:
        try:
            with self.get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('''
                    INSERT OR REPLACE INTO daily_stats 
                    (date, total_count, new_count, source_counts, created_at)
                    VALUES (?, ?, ?, ?, ?)
                ''', (
                    stats.date,
                    stats.total_count,
                    stats.new_count,
                    json.dumps(stats.source_counts, ensure_ascii=False),
                    stats.created_at,
                ))
                conn.commit()
                return True
        except Exception as e:
            logger.error(f"Error saving daily stats: {e}")
            return False
