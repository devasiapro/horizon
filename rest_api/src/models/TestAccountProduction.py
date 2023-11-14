from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class TestAccountProduction(database.Base):
    __tablename__ = 'test_account_production'
    id = Column(Integer, primary_key = True, index = True)
    username = Column(String(256), nullable = True)
    password = Column(String(256), nullable = True)
    customer_id = Column(Integer(), ForeignKey('customer_module.id'), nullable = False)
    customer = relationship(
            'CustomerModule',
            back_populates = 'test_account_productions',
            lazy = False
        )
