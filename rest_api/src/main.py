from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_pagination import Page, add_pagination, paginate
from .routes import (
    game_earning, 
    customer_income, 
    login, 
    auth, 
    logout, 
    kpi, 
    country_income, 
    product_income, 
    customer,
    customer_seamless,
    customer_transfer,
    contract_status,
    customer_contract,
    contract_file
)

app = FastAPI(
    title = "Horizon REST API"
)
add_pagination(app)

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
app.include_router(customer.router)
app.include_router(customer_seamless.router)
app.include_router(customer_transfer.router)
app.include_router(contract_status.router)
app.include_router(customer_contract.router)
app.include_router(contract_file.router)
