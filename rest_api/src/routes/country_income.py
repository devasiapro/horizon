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
    tags=['Country Income'],
    prefix='/country-income'
)

@router.get('')
def fetch_income_of_countries(
        date_from: str, 
        date_to: str,
        db: Session = Depends(database.get_db)
    ): 

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

    countries = {}
    for game_session in game_sessions:
        countries[game_session.player.country] = {}
 
    for game_session in game_sessions:
        if game_session.date_played in countries[game_session.player.country]:
            countries[game_session.player.country][game_session.date_played] = game_session.total_game_income + countries[game_session.player.country][game_session.date_played]
        else:
            countries[game_session.player.country][game_session.date_played] = game_session.total_game_income

    sorted_countries = []
    for country, earnings in countries.items():
        earning_list = [] 
        total_earnings = 0 
        for date, earning in earnings.items(): 
            earning_list.append({ 
                'date': date, 
                'earning': earning 
            }) 
            total_earnings += earning 
        sorted_countries.append({ 
            'name': country, 
            'total_earnings': total_earnings, 
            'daily_earnings': earning_list 
        }) 
        
    return sorted_countries[0:14]
