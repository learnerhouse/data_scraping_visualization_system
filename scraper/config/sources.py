from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class SourceConfig:
    name: str
    type: str
    base_url: str
    selectors: Dict[str, Any]
    enabled: bool = True
    rate_limit: int = 1

SOURCES: List[SourceConfig] = [
    SourceConfig(
        name='社交媒体',
        type='social_media',
        base_url='https://example.com/social',
        selectors={
            'item': '.post-item',
            'title': '.post-title',
            'content': '.post-content',
            'url': 'a.post-link',
            'date': '.post-date',
            'tags': '.post-tags .tag',
        },
        enabled=False,
    ),
    SourceConfig(
        name='新闻网站',
        type='news',
        base_url='https://example.com/news',
        selectors={
            'item': '.news-item',
            'title': '.news-title',
            'content': '.news-summary',
            'url': 'a.news-link',
            'date': '.news-date',
            'category': '.news-category',
        },
        enabled=False,
    ),
    SourceConfig(
        name='金融 API',
        type='api',
        base_url='https://api.example.com/financial',
        selectors={
            'endpoint': '/data',
            'params': {
                'limit': 100,
                'sort': 'date',
            },
        },
        enabled=False,
    ),
]

def get_enabled_sources() -> List[SourceConfig]:
    return [source for source in SOURCES if source.enabled]

def get_source_by_name(name: str) -> SourceConfig | None:
    for source in SOURCES:
        if source.name == name:
            return source
    return None
