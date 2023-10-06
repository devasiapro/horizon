import argparse
import os

from database import database
from src.models.UserRole import UserRole

parser = argparse.ArgumentParser()
parser.add_argument('--file', type=str, required=True)
parser.add_argument('--instance', type=str, required=True)

args = parser.parse_args()
file = args.file
instance = args.instance

db = database.Session()

user_role = UserRole(
                name = 'test'
            )
db.add(user_role)
db.commit()
db.refresh(user_role)

