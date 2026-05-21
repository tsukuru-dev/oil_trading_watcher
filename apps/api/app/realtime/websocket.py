from fastapi import APIRouter, WebSocket

router = APIRouter()


@router.websocket("/ws/intelligence")
async def intelligence_socket(websocket: WebSocket) -> None:
    await websocket.accept()
    await websocket.close()

