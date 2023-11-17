from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from sqlalchemy.orm import Session

from database import database
from src.models.ContractStatus import ContractStatus

router = APIRouter(
    tags = ['Contract Status'],
    prefix = '/contract-status'
)

@router.get('')
def list_contract_statuses(db: Session = Depends(database.get_db)):
    contract_statuses = db.query(ContractStatus).order_by('id').all()
    return contract_statuses
