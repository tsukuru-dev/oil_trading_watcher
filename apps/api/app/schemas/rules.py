from pydantic import BaseModel


class RuleRead(BaseModel):
    id: str
    name: str
    query: str
    enabled: bool

