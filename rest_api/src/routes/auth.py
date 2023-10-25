from fastapi import Depends, FastAPI, APIRouter, status, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
import os

from database import database
from src.schemas.LoginResponse import LoginResponse 
from src.models.User import User

router = APIRouter(
    tags=['Auth'],
    prefix='/auth'
)

SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = os.environ.get("JWT_ALGORITHM")

security = HTTPBearer()

@router.post('/')
def auth(
    credentials: HTTPAuthorizationCredentials= Depends(security),
    db: Session = Depends(database.get_db)
) -> LoginResponse:
    token = credentials.credentials
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    email = payload['sub']
    user = db.query(User).filter(
        User.email == email
    ).first()
    return {
        "token": token, 
        "token_type": "bearer",
        "user": user 
    }
