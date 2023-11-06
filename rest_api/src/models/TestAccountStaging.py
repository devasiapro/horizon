from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class TestAccountStaging(database.Base):
    __tablename__ = 'test_account_staging'
    id = Column(Integer, primary_key = True, index = True)
    username = Column(String(256), nullable = True)
    password = Column(String(256), nullable = True)
    customer_id = Column(Integer(), ForeignKey('customer_module.id'), nullable = False)
    customer = relationship(
            'CustomerModule',
            back_populates = 'test_account_stagings',
            lazy = False
        )
