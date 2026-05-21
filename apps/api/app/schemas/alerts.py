from pydantic import BaseModel


class AlertRead(BaseModel):
    id: str
    severity: str
    message: str
