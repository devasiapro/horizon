from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, false
from sqlalchemy.orm import relationship
from database import database

from src.models.customer_currency import customer_currency

class Currency(database.Base):
    __tablename__ = 'currency'
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String(128), nullable = False)
    is_default = Column(Boolean, nullable = False, server_default = false())
    customers = relationship('CustomerCurrency', back_populates = 'currency')
