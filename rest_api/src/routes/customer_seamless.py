from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import database
from src.schemas.CustomerRequest import CustomerTransferRequest, CustomerSeamlessRequest
from src.models.CustomerModule import CustomerModule
from src.models.Currency import Currency
from src.models.Language import Language
from src.models.IpWhitelist import IpWhitelist
from src.models.DomainWhitelist import DomainWhitelist

router = APIRouter(
    tags=['Customer Seamless'],
    prefix='/customer/seamless'
)

@router.post('')
def create_customer(
        request: CustomerSeamlessRequest,
        db: Session = Depends(database.get_db)
    ):
    customer_model = CustomerModule(
        merchant_english_name=request.merchant_english_name, 
        brand_name=request.brand_name,
    )

    db.add(customer_model)
    db.commit()
    db.refresh(customer_model)

    return request
