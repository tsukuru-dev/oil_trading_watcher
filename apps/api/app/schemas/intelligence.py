from datetime import datetime
from pydantic import BaseModel


class IntelligenceEventRead(BaseModel):
    id: str
    headline: str
    source_url: str | None = None
    timestamp: datetime
    credibility_score: float
    relevance_score: float
    flagged_reason: str | None = None

