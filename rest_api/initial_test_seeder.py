from passlib.context import CryptContext

import argparse
import os
import pandas
import numpy
import math

from database import database
from src.models.User import User
from src.models.UserRole import UserRole

db = database.Session()
user_role = UserRole(
    name = "Admin"
)
db.add(user_role)
db.commit()
db.refresh(user_role)

pwd_context = CryptContext(schemes = ["bcrypt"], deprecated = "auto")

user = User(
    first_name = "Razer",
    last_name = "Mantis",
    password = pwd_context.hash("testpassword"),
    email = "razer@mantis.com",
    user_role_id = user_role.id
)

db.add(user)
db.commit()
db.refresh(user)
