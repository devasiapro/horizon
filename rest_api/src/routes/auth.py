from fastapi import Depends, Response, FastAPI, APIRouter, status, HTTPException
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
    response: Response,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(database.get_db)
) -> LoginResponse:

    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload['sub']
        user = db.query(User).filter(
            User.email == email
        ).first()
    except JWTError:
        raise HTTPException(
            status_code=401,
            detail='Invalid authentication'
        )

    return {
        "token": token, 
        "token_type": "bearer",
        "user": user 
    }
