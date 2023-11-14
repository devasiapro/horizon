from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class MarketJurisdiction(database.Base):
    __tablename__ = 'market_jurisdiction'
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String(128), nullable = True)
    description = Column(String(256), nullable = True)
    customer_id = Column(Integer, ForeignKey('customer_module.id'), nullable = False)
    customer = relationship(
                'CustomerModule',
                back_populates = 'market_jurisdictions',
                lazy = False
            )
