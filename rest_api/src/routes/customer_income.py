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
    tags=['Customer Income'],
    prefix='/customer-income'
)

@router.get('')
def fetch_income_of_customers(
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

    customers = {}
    for game_session in game_sessions:
        if not game_session.player.operator.is_transfer:
            customers[game_session.player.operator.brand] = {}
        else:
            customers[game_session.player.kiosk.brand] = {}
 
    for game_session in game_sessions:
        if not game_session.player.operator.is_transfer:
            if game_session.date_played in customers[game_session.player.operator.brand]:
                customers[game_session.player.operator.brand][game_session.date_played] = game_session.total_game_income + customers[game_session.player.operator.brand][game_session.date_played]
            else:
                customers[game_session.player.operator.brand][game_session.date_played] = game_session.total_game_income
        else:
            if game_session.date_played in customers[game_session.player.kiosk.brand]:
                customers[game_session.player.kiosk.brand][game_session.date_played] = game_session.total_game_income + customers[game_session.player.kiosk.brand][game_session.date_played]
            else:
                customers[game_session.player.kiosk.brand][game_session.date_played] = game_session.total_game_income

    sorted_customers = []
    for customer, earnings in customers.items():
        earning_list = [] 
        total_earnings = 0 
        for date, earning in earnings.items(): 
            earning_list.append({ 
                'date': date, 
                'earning': earning 
            }) 
            total_earnings += earning 
        sorted_customers.append({ 
            'name': customer, 
            'total_earnings': total_earnings, 
            'daily_earnings': earning_list 
        }) 
        
    return sorted_customers[0:14]
