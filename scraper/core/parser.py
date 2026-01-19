import logging
from typing import Dict, Any, List
from bs4 import BeautifulSoup, Tag
from datetime import datetime
import re

logger = logging.getLogger(__name__)

class Parser:
    def __init__(self, selectors: Dict[str, Any]):
        self.selectors = selectors

    def parse_items(self, html: str) -> List[Dict[str, Any]]:
        soup = BeautifulSoup(html, 'html.parser')
        item_elements = soup.select(self.selectors.get('item', ''))
        
        items = []
        for item_elem in item_elements:
            try:
                item = self._parse_item(item_elem)
                if item:
                    items.append(item)
            except Exception as e:
                logger.warning(f"Failed to parse item: {e}")
                continue
        
        return items

    def _parse_item(self, element: Tag) -> Dict[str, Any]:
        item = {}
        
        title_elem = element.select_one(self.selectors.get('title', ''))
        if title_elem:
            item['title'] = self._clean_text(title_elem.get_text())
        
        content_elem = element.select_one(self.selectors.get('content', ''))
        if content_elem:
            item['content'] = self._clean_text(content_elem.get_text())
        
        link_elem = element.select_one(self.selectors.get('url', ''))
        if link_elem:
            item['url'] = link_elem.get('href', '')
        
        date_elem = element.select_one(self.selectors.get('date', ''))
        if date_elem:
            date_str = self._clean_text(date_elem.get_text())
            item['published_at'] = self._parse_date(date_str)
        
        category_elem = element.select_one(self.selectors.get('category', ''))
        if category_elem:
            item['category'] = self._clean_text(category_elem.get_text())
        
        tags_elements = element.select(self.selectors.get('tags', ''))
        if tags_elements:
            item['tags'] = [
                self._clean_text(tag.get_text()) 
                for tag in tags_elements
            ]
        
        return item

    def _clean_text(self, text: str) -> str:
        return re.sub(r'\s+', ' ', text).strip()

    def _parse_date(self, date_str: str) -> datetime:
        date_formats = [
            '%Y-%m-%d',
            '%Y-%m-%d %H:%M:%S',
            '%Y/%m/%d',
            '%Y年%m月%d日',
            '%m/%d/%Y',
        ]
        
        for fmt in date_formats:
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue
        
        logger.warning(f"Failed to parse date: {date_str}")
        return datetime.now()
