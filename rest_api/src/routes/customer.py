from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database import database
from src.schemas.CustomerRequest import CustomerTransferRequest

router = APIRouter(
    tags=['Customer'],
    prefix='/customer'
)

@router.post('')
def create_customer(
        request: CustomerTransferRequest,
        db: Session = Depends(database.get_db)
    ):
    return request

@router.get('')
def list_customer():
    pass

@router.get('/:customer_id')
def view_customer():
    pass

@router.put(':/customer_id')
def edit_customer():
    pass

@router.delete(':/customer_id')
def delete_customer():
    pass
