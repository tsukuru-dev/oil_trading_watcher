from dataclasses import dataclass
from datetime import datetime


@dataclass
class IntelligenceEvent:
    id: str
    headline: str
    source_id: str
    timestamp: datetime
    credibility_score: float
    relevance_score: float
