from fastapi import APIRouter

from app.api.v1 import alerts, intelligence, prices, rules, saved_items, settings, sources

router = APIRouter()
router.include_router(intelligence.router, prefix="/intelligence", tags=["intelligence"])
router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
router.include_router(saved_items.router, prefix="/saved-items", tags=["saved-items"])
router.include_router(sources.router, prefix="/sources", tags=["sources"])
router.include_router(rules.router, prefix="/rules", tags=["rules"])
router.include_router(prices.router, prefix="/prices", tags=["prices"])
router.include_router(settings.router, prefix="/settings", tags=["settings"])

