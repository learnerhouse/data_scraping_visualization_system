import logging
from datetime import datetime
from database.db_manager import DatabaseManager
from config.sources import get_enabled_sources
from utils.logger import setup_logger

logger = setup_logger(__name__)

def main():
    logger.info("Starting scraper...")
    
    db = DatabaseManager()
    
    enabled_sources = get_enabled_sources()
    if not enabled_sources:
        logger.warning("No enabled sources found")
        return
    
    logger.info(f"Found {len(enabled_sources)} enabled sources")
    
    for source_config in enabled_sources:
        logger.info(f"Processing source: {source_config.name}")
        
        try:
            from core.spider import BaseSpider
            from core.parser import Parser
            from database.models import ScrapedItem
            
            class TestSpider(BaseSpider):
                def scrape(self):
                    html = self._fetch_page(self.base_url)
                    if not html:
                        return []
                    
                    parser = Parser(source_config.selectors)
                    items_data = parser.parse_items(html)
                    
                    items = []
                    for item_data in items_data:
                        item = ScrapedItem(
                            source=self.name,
                            title=item_data.get('title', ''),
                            content=item_data.get('content', ''),
                            url=item_data.get('url', ''),
                            category=item_data.get('category', ''),
                            tags=item_data.get('tags', []),
                        )
                        items.append(item)
                    
                    return items
            
            spider = TestSpider(source_config.name, source_config.base_url)
            result = spider.run()
            
            if result.success:
                logger.info(f"Successfully scraped {result.count} items from {source_config.name}")
            else:
                logger.error(f"Failed to scrape {source_config.name}: {result.error}")
        
        except Exception as e:
            logger.error(f"Error processing {source_config.name}: {e}")
            continue
    
    logger.info("Scraper completed")

if __name__ == '__main__':
    main()
