from __future__ import annotations

from sqlalchemy import Table, Integer
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy.orm import DeclarativeBase
from database import database

customer_currency = Table(
    'customer_currency',
    database.Base.metadata,
    Column('customer_id', Integer, ForeignKey('customer_module.id')),
    Column('currency_id', Integer, ForeignKey('currency.id')),
)
