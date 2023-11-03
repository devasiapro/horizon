from sqlalchemy import Table, Integer
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase
from database import database

customer_language = Table(
    'customer_language',
    database.Base.metadata,
    Column('customer_id', Integer, ForeignKey('customer_module.id')),
    Column('language_id', Integer, ForeignKey('language.id'))
)
