from fastapi import FastAPI
from .routes import game_earning, customer_income

app = FastAPI(
    title = "Horizon REST API"
)
app.include_router(game_earning.router)
app.include_router(customer_income.router)
