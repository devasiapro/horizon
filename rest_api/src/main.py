from fastapi import FastAPI
from .routes import game_earning

app = FastAPI(
    title = "Horizon REST API"
)
app.include_router(game_earning.router)
