import argparse
import os
import pandas
import numpy
import math

from database import database
from src.models.UserRole import UserRole
from src.instances.InstanceFactory import InstanceFactory
#from src.models.GameSession import GameSession

parser = argparse.ArgumentParser()
parser.add_argument('--file', type=str, required=True)
parser.add_argument('--instance', type=str, required=True)

args = parser.parse_args()
file = args.file
instance_type = args.instance

db = database.Session()
game_sessions = numpy.array(pandas.read_excel(file, skiprows=3))
for game_session in game_sessions:
    factory = InstanceFactory()
    instance = factory.buildInstance(instance_type)
    """
    game_session = GameSession(
        currency = game_session[INDEX_CURRENCY]
    )
    db.add(game_session)
    db.commit()
    db.refersh(game_session)
    """
    print(game_session);
