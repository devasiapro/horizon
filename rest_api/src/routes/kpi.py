from fastapi import FastAPI, APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from operator import itemgetter

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
from src.instances.InstanceFactory import InstanceFactory
from src.schemas.FetchGameEarningsRequest import FetchGameEarningsRequest as Request

import os
import pandas

router = APIRouter(
    tags=['KPI'],
    prefix='/kpi'
)

@router.get('')
def fetch_kpi(
        date_from: str, 
        date_to: str,
        db: Session = Depends(database.get_db)
    ): 

    kpi = {
        'income': 0,
        'bets': 0,
        'total_players': 0,
        'rtp': 0,
        'number_of_spins': 0    
    };

    game_sessions = (
        db.
        query(GameSession)
        .filter(
            GameSession.date_played.between(date_from, date_to)
        )
        .join(Player)
        .join(Operator)
        .all()
    )

    unique_player_count = (
        db
        .query(GameSession.player_id)
        .filter(
            GameSession.date_played.between(date_from, date_to)
        )
        .distinct()
        .count()
    )

    for game_session in game_sessions:
        kpi['income'] = kpi['income'] + game_session.total_game_income
        kpi['bets'] = kpi['bets'] + game_session.total_game_bet
        kpi['total_players'] = unique_player_count
        kpi['rtp'] = kpi['rtp'] + 0 if game_session.rtp == None else game_session.rtp
        kpi['number_of_spins'] = kpi['number_of_spins'] + game_session.number_of_spins

    return kpi
