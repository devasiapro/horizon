from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class Regulation(database.Base):
    __tablename__ = 'regulation'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=True)
    description = Column(String(256), nullable=False)
    customer_id = Column(Integer(), ForeignKey('customer_module.id'), nullable = False)
    customer = relationship(
            'CustomerModule',
            back_populates = 'regulations',
            lazy = False
        )
