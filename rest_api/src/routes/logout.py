from fastapi import Depends, FastAPI, APIRouter, status, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
import os

from database import database
from src.schemas.LoginResponse import LoginResponse 
from src.models.User import User

router = APIRouter(
    tags=['Logout'],
    prefix='/logout'
)

SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = os.environ.get("JWT_ALGORITHM")

security = HTTPBearer()

@router.post('/')
def logout():
    return {
        "message": "OK"
    }
