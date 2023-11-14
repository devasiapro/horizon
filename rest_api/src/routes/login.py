from fastapi import FastAPI, APIRouter, status, HTTPException
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from operator import itemgetter
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError

from src.models.User import User
from src.models.UserRole import UserRole
from src.models.GameSession import GameSession
from src.models.Player import Player
from src.models.Operator import Operator
from src.models.Kiosk import Kiosk
from src.models.Customer import Customer 
from src.models.Game import Game 
from src.models.ClientType import ClientType
from src.models.GameType import GameType
from src.models.ClientPlatform import ClientPlatform
from src.models.TopLevelEntity import TopLevelEntity

from database import database
from src.schemas.Login import Login
from src.schemas.LoginResponse import LoginResponse 

import os
import pandas

router = APIRouter(
    tags=['Login user'],
    prefix='/login'
)

SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
ALGORITHM = os.environ.get("JWT_ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("JWT_ACCESS_TOKEN_EXPIRE_MINUTES"))

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

def generate_token(data: dict):
    to_encode = data.copy() 
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
    return encoded_jwt

@router.post('')
def login(
        request: Login, 
        db: Session = Depends(database.get_db)
    ) -> LoginResponse:

    user = db.query(User).filter(User.username == request.username).first()

    if not user or not pwd_context.verify(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail = 'username or password not found'
        )

    access_token = generate_token(
        data = {
            "sub": user.username
        }
    )

    return {
        "token": access_token, 
        "token_type": "bearer",
        "user": user
    }
