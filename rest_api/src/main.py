from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import game_earning, customer_income, login

app = FastAPI(
    title = "Horizon REST API"
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(game_earning.router)
app.include_router(customer_income.router)
app.include_router(login.router)
