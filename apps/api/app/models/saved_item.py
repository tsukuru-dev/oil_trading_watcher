from dataclasses import dataclass


@dataclass
class SavedItem:
    id: str
    intelligence_event_id: str
    user_id: str

