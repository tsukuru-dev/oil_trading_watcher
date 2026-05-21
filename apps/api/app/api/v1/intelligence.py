from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def list_intelligence_events() -> list[dict]:
    return []
