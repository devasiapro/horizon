import argparse
import os
import pandas
import numpy
import math

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

parser = argparse.ArgumentParser()
parser.add_argument('--file', type=str, required=True, help="Absolute Excel file path with file name in Y-m-d format")
parser.add_argument('--instance', type=str, required=True, help="'dragon' or 'dragon88'")

args = parser.parse_args()
file = args.file
instance_type = args.instance

db = database.Session()
game_sessions = numpy.array(pandas.read_excel(file, skiprows=3))
for index, game_session in enumerate(game_sessions):
    print(f"Game session # {index}")
    factory = InstanceFactory()
    instance = factory.buildInstance(instance_type)

    operator_model = db.query(Operator).filter(Operator.brand == game_session[instance.INDEX_INSTANCE]).first()
    if not operator_model:
        operator_model = Operator(
            brand = game_session[instance.INDEX_INSTANCE],
            is_transfer = game_session[instance.INDEX_INSTANCE] == 'dragon88'
        )
        db.add(operator_model)
        db.commit()
        db.refresh(operator_model)

    player_model = db.query(Player).filter(Player.username == game_session[instance.INDEX_USERNAME]).first()
    if not player_model:
        player_model = Player(
            username = game_session[instance.INDEX_USERNAME],
            operator_id = operator_model.id,
            player_currency = game_session[instance.INDEX_PLAYER_CURRENCY],
            language = game_session[instance.INDEX_LANGUAGE],
            country = game_session[instance.INDEX_COUNTRY],
            player_code = game_session[instance.INDEX_PLAYER_CODE]
        )
        db.add(player_model)
        db.commit()
        db.refresh(player_model)

    top_level_entity_model = None
    if not pandas.isna(game_session[instance.INDEX_TOP_LEVEL_ENTITY]):
        top_level_entity_model = db.query(TopLevelEntity).filter(TopLevelEntity.name == game_session[instance.INDEX_TOP_LEVEL_ENTITY]).first()
        if not top_level_entity_model:
            top_level_entity_model = TopLevelEntity(
                name = game_session[instance.INDEX_TOP_LEVEL_ENTITY]
            )
            db.add(top_level_entity_model)
            db.commit()
            db.refresh(top_level_entity_model)

    if not pandas.isna(game_session[instance.INDEX_KIOSK]):
        kiosk_model = db.query(Kiosk).filter(Kiosk.brand == game_session[instance.INDEX_KIOSK]).first()
        if not kiosk_model:
            kiosk_model = Kiosk(
                brand = game_session[instance.INDEX_KIOSK],
                operator_id = operator_model.id,
                top_level_entity_id = operator_model.id
            )
            db.add(kiosk_model)
            db.commit()
            db.refresh(kiosk_model)

    client_type_model = db.query(ClientType).filter(ClientType.name == game_session[instance.INDEX_CLIENT_TYPE]).first()
    if not client_type_model:
        client_type_model = ClientType(
            name = game_session[instance.INDEX_CLIENT_TYPE] 
        )
        db.add(client_type_model)
        db.commit()
        db.refresh(client_type_model)

    game_type_model = db.query(GameType).filter(GameType.name == game_session[instance.INDEX_GAME_TYPE]).first()
    if not game_type_model:
        game_type_model = GameType(
            name = game_session[instance.INDEX_GAME_TYPE]
        )
        db.add(game_type_model)
        db.commit()
        db.refresh(game_type_model)

    game_model = db.query(Game).filter(Game.name == game_session[instance.INDEX_GAME]).first()
    if not game_model:
        game_model = Game(
            client_type_id = client_type_model.id,
            name = game_session[instance.INDEX_GAME],
            game_type_id = game_type_model.id
        )
        db.add(game_model)
        db.commit()
        db.refresh(game_model)

    client_platform_model = db.query(ClientPlatform).filter(ClientPlatform.name == game_session[instance.INDEX_CLIENT_PLATFORM]).first()
    if not client_platform_model:
        client_platform_model = ClientPlatform(
            name = game_session[instance.INDEX_CLIENT_PLATFORM]
        )
        db.add(client_platform_model)
        db.commit()
        db.refresh(client_platform_model)
    
    file_path = os.path.basename(file)
    file_name_date = os.path.splitext(file_path)[0] 

    game_session_model = GameSession(
        currency = game_session[instance.INDEX_CURRENCY],
        player_id = player_model.id,
        date_played = file_name_date,
        game_id = game_model.id,
        client_platform_id = client_platform_model.id,
        total_game_bet = game_session[instance.INDEX_TOTAL_GAME_BET],
        total_game_win = game_session[instance.INDEX_TOTAL_GAME_WIN],
        total_game_income = game_session[instance.INDEX_TOTAL_INCOME]
    )
    db.add(game_session_model)
    db.commit()
    db.refresh(game_session_model)
