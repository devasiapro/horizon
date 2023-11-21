from fastapi import FastAPI, APIRouter, File, UploadFile, Form
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.params import Depends
from sqlalchemy.orm import Session
import shutil
import os

from database import database
from src.models.CustomerModule import CustomerModule
from src.schemas.CustomerIntegrationRequest import CustomerIntegrationRequest

router = APIRouter(
    tags = ['Customer Integration'],
    prefix = '/customer/{customer_id}/integration'
)

security = HTTPBearer()

@router.put('')
def update_customer_integration(
        request: CustomerIntegrationRequest,
        customer_id: int,
        db: Session = Depends(database.get_db),
        credentials: HTTPAuthorizationCredentials = Depends(security),
    ):
    
    customer = (db
        .query(CustomerModule)
        .filter(CustomerModule.id == customer_id)
        .first() 
    )

    if not customer:
        # TODO: return 404 here
        pass

    customer.integration_status_id = request.integration_status_id
    db.commit()
    db.refresh(customer)

    return customer
