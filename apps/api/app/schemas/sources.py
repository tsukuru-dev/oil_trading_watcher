from pydantic import BaseModel


class SourceRead(BaseModel):
    id: str
    name: str
    type: str
    enabled: bool
