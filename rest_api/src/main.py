from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import game_earning, customer_income, login, auth, logout, kpi, country_income, product_income

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
app.include_router(auth.router)
app.include_router(logout.router)
app.include_router(kpi.router)
app.include_router(country_income.router)
app.include_router(product_income.router)
