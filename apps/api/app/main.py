from fastapi import FastAPI

from app.api.v1.router import router as v1_router
from app.realtime.websocket import router as websocket_router

app = FastAPI(title="Oil Trading Watcher API")

app.include_router(v1_router, prefix="/api/v1")
app.include_router(websocket_router)


@app.get("/health")
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
