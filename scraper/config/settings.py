import os
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent

DATABASE_PATH = BASE_DIR / 'data' / 'scraper.db'
FRONTEND_DATA_DIR = BASE_DIR / 'frontend' / 'public' / 'data'

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
}

REQUEST_TIMEOUT = 30
RETRY_TIMES = 3
RETRY_DELAY = 2

LOG_LEVEL = 'INFO'
LOG_FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'

DATE_FORMAT = '%Y-%m-%d %H:%M:%S'
