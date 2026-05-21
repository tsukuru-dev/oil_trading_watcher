from dataclasses import dataclass


@dataclass
class Rule:
    id: str
    name: str
    query: str

