from pydantic import BaseModel


class AppSettingsRead(BaseModel):
    timezone: str = "Europe/London"

