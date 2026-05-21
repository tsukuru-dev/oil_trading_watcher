from dataclasses import dataclass


@dataclass
class Alert:
    id: str
    intelligence_event_id: str
    severity: str
