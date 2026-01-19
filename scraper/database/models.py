from dataclasses import dataclass
from datetime import datetime
from typing import List, Dict, Any, Optional

@dataclass
class ScrapedItem:
    id: Optional[int] = None
    source: str = ''
    title: str = ''
    content: str = ''
    url: str = ''
    category: str = ''
    tags: List[str] = None  # type: ignore
    metadata: Dict[str, Any] = None  # type: ignore
    scraped_at: Optional[datetime] = None
    published_at: Optional[datetime] = None

    def __post_init__(self):
        if self.tags is None:
            self.tags = []
        if self.metadata is None:
            self.metadata = {}
        if self.scraped_at is None:
            self.scraped_at = datetime.now()

@dataclass
class DailyStats:
    id: Optional[int] = None
    date: Optional[datetime] = None
    total_count: int = 0
    new_count: int = 0
    source_counts: Dict[str, int] = None  # type: ignore
    created_at: Optional[datetime] = None

    def __post_init__(self):
        if self.source_counts is None:
            self.source_counts = {}
        if self.created_at is None:
            self.created_at = datetime.now()

@dataclass
class SpiderResult:
    source: str
    success: bool
    count: int = 0
    error: Optional[str] = None
    duration: float = 0.0
