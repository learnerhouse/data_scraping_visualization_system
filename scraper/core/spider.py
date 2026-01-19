import time
import logging
from typing import List, Optional
from abc import ABC, abstractmethod
import requests
from bs4 import BeautifulSoup

from config.settings import HEADERS, REQUEST_TIMEOUT, RETRY_TIMES, RETRY_DELAY
from database.models import ScrapedItem, SpiderResult

logger = logging.getLogger(__name__)

class BaseSpider(ABC):
    def __init__(self, name: str, base_url: str):
        self.name = name
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update(HEADERS)

    @abstractmethod
    def scrape(self) -> List[ScrapedItem]:
        pass

    def _fetch_page(self, url: str, params: dict = None) -> Optional[str]:
        for attempt in range(RETRY_TIMES):
            try:
                response = self.session.get(
                    url,
                    params=params,
                    timeout=REQUEST_TIMEOUT,
                )
                response.raise_for_status()
                return response.text
            except requests.RequestException as e:
                logger.warning(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt < RETRY_TIMES - 1:
                    time.sleep(RETRY_DELAY)
                else:
                    logger.error(f"Failed to fetch {url} after {RETRY_TIMES} attempts")
                    return None

    def _parse_html(self, html: str) -> BeautifulSoup:
        return BeautifulSoup(html, 'html.parser')

    def run(self) -> SpiderResult:
        start_time = time.time()
        try:
            items = self.scrape()
            duration = time.time() - start_time
            logger.info(f"{self.name} scraped {len(items)} items in {duration:.2f}s")
            return SpiderResult(
                source=self.name,
                success=True,
                count=len(items),
                duration=duration,
            )
        except Exception as e:
            duration = time.time() - start_time
            logger.error(f"{self.name} failed after {duration:.2f}s: {e}")
            return SpiderResult(
                source=self.name,
                success=False,
                error=str(e),
                duration=duration,
            )
