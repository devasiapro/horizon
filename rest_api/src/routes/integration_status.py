from fastapi import FastAPI, APIRouter, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.params import Depends
from sqlalchemy.orm import Session

from database import database
from src.models.IntegrationStatus import IntegrationStatus

router = APIRouter(
    tags = ['Integration Status'],
    prefix = '/integration-status'
)

security = HTTPBearer()

@router.get('')
def list_integration_statuses(
        credentials: HTTPAuthorizationCredentials = Depends(security),
        db: Session = Depends(database.get_db)
    ):
    integration_statuses = db.query(IntegrationStatus).order_by('id').all()
    return integration_statuses
