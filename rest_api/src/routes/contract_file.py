from fastapi import FastAPI, APIRouter, File, UploadFile, Form
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.params import Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import shutil
import os

from database import database
from src.schemas.CustomerContractRequest import CustomerContractRequest
from src.models.CustomerModule import CustomerModule
from src.models.ContractStatus import ContractStatus
from src.models.ContractFile import ContractFile

router = APIRouter(
    tags = ['Contract File'],
    prefix = '/contract-file'
)

security = HTTPBearer()

@router.get('/{contract_file_id}/download')
def download_contract_file(
        contract_file_id: int,
        credentials: HTTPAuthorizationCredentials = Depends(security),
        db: Session = Depends(database.get_db)
):
    contract_file = (
        db
        .query(ContractFile)
        .filter(
            ContractFile.id == contract_file_id
        )
        .first()
    )

    if not contract_file:
        #TODO: followup for 404
        pass 

    file_path = os.path.join(os.getcwd(), 'uploads') + '/' + contract_file.filename 
    return FileResponse(
            path=file_path, 
            media_type='application/octet-stream', 
            filename=contract_file.filename
    )

