from fastapi import FastAPI, APIRouter, File, UploadFile, Form
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.params import Depends
from sqlalchemy.orm import Session
import shutil
import os

from database import database
from src.schemas.CustomerContractRequest import CustomerContractRequest
from src.models.CustomerModule import CustomerModule
from src.models.ContractStatus import ContractStatus
from src.models.ContractFile import ContractFile

router = APIRouter(
    tags = ['Customer Contract'],
    prefix = '/customer/{customer_id}/contract'
)

security = HTTPBearer()

@router.get('')
def fetch_customer_contract(
        customer_id: int, 
        db: Session = Depends(database.get_db),
        credentials: HTTPAuthorizationCredentials = Depends(security)
    ):
    customer = (db
        .query(CustomerModule)
        .filter(CustomerModule.id == customer_id)
        .first()
    )

    customer.contract_status
    customer.contract_files

    return customer

@router.post('')
def update_customer_contract(
        customer_id: int,
        contract_file: UploadFile,
        contract_status_id: int = Form(None),
        contract_label: str = Form(None),
        db: Session = Depends(database.get_db),
        credentials: HTTPAuthorizationCredentials = Depends(security)
    ):
    upload_dir = os.path.join(os.getcwd(), 'uploads')

    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)

    destination = os.path.join(upload_dir, contract_file.filename)

    with open(destination, 'wb') as buffer:
        shutil.copyfileobj(contract_file.file, buffer)

 
    customer = (db
        .query(CustomerModule)
        .filter(CustomerModule.id == customer_id)
        .first() 
    )

    if not customer:
        # TODO: return 404 here
        pass

    customer.contract_status_id = contract_status_id
    customer.contract_label = contract_label

    db.commit()
    db.refresh(customer)

    db.query(ContractFile).filter(ContractFile.customer_id == customer_id).delete()

    contract_file = ContractFile(
            customer_id = customer_id,
            file_url = '',
            filename = contract_file.filename
    )
    db.add(contract_file)
    db.commit()
    db.refresh(contract_file)

    return {
        'contract_file_id': contract_file.id,
        'contact_status_id': contract_status_id,
        'contract_label': contract_label
    }
