from fastapi import FastAPI, APIRouter
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, Response, FastAPI, APIRouter, status, HTTPException
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from operator import itemgetter

from database import database
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
from src.instances.InstanceFactory import InstanceFactory
from src.schemas.FetchGameEarningsRequest import FetchGameEarningsRequest as Request

import os
import pandas

router = APIRouter(
    tags=['Game Earning'],
    prefix='/game-earning'
)

security = HTTPBearer()

@router.get('')
def fetch_game_earnings(
        request: Request = Depends(Request),
        credentials: HTTPAuthorizationCredentials = Depends(security),
        db: Session = Depends(database.get_db)
    ):

    game_sessions = (
        db.
        query(GameSession)
        .filter(
            GameSession.date_played.between(request.date_from, request.date_to)
        )
        .join(Game)
        .join(GameType)
    )

    if request.game_type == GameType.GAME_TYPE_LIVE:
        game_sessions = game_sessions.filter(
            GameType.name.like("%" + GameType.GAME_TYPE_LIVE +"%")
        ).all()
    else:
        game_sessions = game_sessions.filter(
            GameType.name.not_like("%" + GameType.GAME_TYPE_LIVE +"%")
        ).all()

    earnings = {}
    for game_session in game_sessions:
        total_game_income = game_session.total_game_income
        if game_session.game.name in earnings:
            total_game_income = total_game_income + earnings[game_session.game.name]["earnings"]

        earnings[game_session.game.name] = {
            "earnings": total_game_income
        }

    earnings_list = []
    for game, earning in earnings.items():
        earnings_list.append({
            "game": game,
            "earnings": earning["earnings"]
        })
    
    is_reverse = request.order == Request.ORDER_ASC
    earnings_list = sorted(earnings_list, key=itemgetter('earnings'), reverse=True)[:request.count]
    return earnings_list
