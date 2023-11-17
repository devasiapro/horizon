from passlib.context import CryptContext

import argparse
import os
import pandas
import numpy
import math

from database import database
from src.models.User import User
from src.models.UserRole import UserRole
from src.models.CustomerModule import CustomerModule 
from src.models.IpWhitelist import IpWhitelist 
from src.models.DomainWhitelist import DomainWhitelist 
from src.models.Regulation import Regulation 
from src.models.MarketJurisdiction import MarketJurisdiction 
from src.models.OfficeIp import OfficeIp
from src.models.TestAccountStaging import TestAccountStaging
from src.models.TestAccountProduction import TestAccountProduction
from src.models.ContractStatus import ContractStatus 
from src.models.CustomerCurrency import CustomerCurrency 
from src.models.IntegrationStatus import IntegrationStatus

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
    username = "razer",
    user_role_id = user_role.id
)

db.add(user)
db.commit()
db.refresh(user)

contract_statuses = [
    {'id': 1, 'name': 'Preparation'}, 
    {'id': 2, 'name': 'Sent To Customer'},
    {'id': 3, 'name': 'Clarifications With Customer'},
    {'id': 4, 'name': 'Done'}
]

for status in contract_statuses:
    contract_status = ContractStatus(id = status['id'],  name = status['name'])
    db.add(contract_status)
    db.commit()
    db.refresh(contract_status)

integration_statuses = [
    {'id': 1, 'name': 'To Do'},
    {'id': 2, 'name': 'Staging'},
    {'id': 3, 'name': 'Production'},
    {'id': 4, 'name': 'Live'}
]

for status in integration_statuses:
    integration_status = IntegrationStatus(id = status['id'], name = status['name'])
    db.add(integration_status)
    db.commit()
    db.refresh(integration_status)
