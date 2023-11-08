from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import math

from database import database
from src.schemas.CustomerResponse import CustomerResponse
from src.models.CustomerModule import CustomerModule
from src.models.Currency import Currency
from src.models.Language import Language
from src.models.IpWhitelist import IpWhitelist
from src.models.DomainWhitelist import DomainWhitelist

router = APIRouter(
    tags=['Customer'],
    prefix='/customer'
)

@router.get('')
def list_customer(page: int = 1, size = 20, db: Session = Depends(database.get_db)):
    total = db.query(CustomerModule).count()
    offset = 20 * (page - 1)
    customers = db.query(CustomerModule).offset(offset).limit(size).all()

    for customer in customers:
        currencies = customer.currencies

    return {
        "items": customers,
        "total": total,
        "page": page,
        "size": size,
        "pages": math.ceil(total / size)
    }

@router.get('/:customer_id')
def view_customer():
    pass

@router.put(':/customer_id')
def edit_customer():
    pass

@router.delete(':/customer_id')
def delete_customer():
    pass

@router.post('')
def create_customer():
    pass
