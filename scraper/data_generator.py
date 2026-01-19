import logging
from datetime import datetime, date
from typing import Dict, Any, List
import json

from database.db_manager import DatabaseManager
from config.settings import FRONTEND_DATA_DIR
from utils.logger import setup_logger

logger = setup_logger(__name__)

class DataGenerator:
    def __init__(self, db: DatabaseManager):
        self.db = db

    def generate_stats(self) -> Dict[str, Any]:
        logger.info("Generating stats...")
        return {
            'total_records': self.db.count_total(),
            'source_count': self.db.count_sources(),
            'last_updated': self.db.last_update_time().isoformat() if self.db.last_update_time() else datetime.now().isoformat(),
            'today_new': self.db.count_today_new(),
        }

    def generate_trends(self, days: int = 30) -> List[Dict[str, Any]]:
        logger.info(f"Generating trends for last {days} days...")
        trends = self.db.get_daily_trends(days)
        
        formatted_trends = []
        for trend in trends:
            formatted_trends.append({
                'date': trend['date'],
                'total_count': trend['total_count'],
                'new_count': trend['new_count'],
            })
        
        return formatted_trends

    def generate_distribution(self) -> List[Dict[str, Any]]:
        logger.info("Generating distribution...")
        return self.db.get_source_distribution()

    def generate_details(self, limit: int = 1000) -> List[Dict[str, Any]]:
        logger.info(f"Generating details (limit: {limit})...")
        items = self.db.get_all_items(limit)
        
        formatted_items = []
        for item in items:
            formatted_item = {
                'id': item.id,
                'source': item.source,
                'title': item.title,
                'content': item.content,
                'url': item.url,
                'category': item.category,
                'tags': item.tags,
                'metadata': item.metadata,
                'scraped_at': item.scraped_at.isoformat() if item.scraped_at else None,
                'published_at': item.published_at.isoformat() if item.published_at else None,
            }
            formatted_items.append(formatted_item)
        
        return formatted_items

    def export_all(self):
        logger.info("Starting data export...")
        
        FRONTEND_DATA_DIR.mkdir(parents=True, exist_ok=True)
        
        try:
            stats = self.generate_stats()
            with open(FRONTEND_DATA_DIR / 'stats.json', 'w', encoding='utf-8') as f:
                json.dump(stats, f, ensure_ascii=False, indent=2)
            logger.info("Exported stats.json")
        except Exception as e:
            logger.error(f"Failed to export stats: {e}")
        
        try:
            trends = self.generate_trends(30)
            with open(FRONTEND_DATA_DIR / 'trends.json', 'w', encoding='utf-8') as f:
                json.dump(trends, f, ensure_ascii=False, indent=2)
            logger.info("Exported trends.json")
        except Exception as e:
            logger.error(f"Failed to export trends: {e}")
        
        try:
            distribution = self.generate_distribution()
            with open(FRONTEND_DATA_DIR / 'distribution.json', 'w', encoding='utf-8') as f:
                json.dump(distribution, f, ensure_ascii=False, indent=2)
            logger.info("Exported distribution.json")
        except Exception as e:
            logger.error(f"Failed to export distribution: {e}")
        
        try:
            details = self.generate_details(1000)
            with open(FRONTEND_DATA_DIR / 'details.json', 'w', encoding='utf-8') as f:
                json.dump(details, f, ensure_ascii=False, indent=2)
            logger.info("Exported details.json")
        except Exception as e:
            logger.error(f"Failed to export details: {e}")
        
        logger.info("Data export completed")

def main():
    logger.info("Starting data generator...")
    
    db = DatabaseManager()
    generator = DataGenerator(db)
    
    generator.export_all()
    
    logger.info("Data generator completed")

if __name__ == '__main__':
    main()
