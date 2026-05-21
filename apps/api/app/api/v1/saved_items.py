from fastapi import APIRouter

router = APIRouter()


@router.get("")
async def list_saved_items() -> list[dict]:
    return []
