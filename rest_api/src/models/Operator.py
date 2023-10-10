from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import database

class Operator(database.Base):
    __tablename__ = 'operator'
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String(64), nullable=False)
    is_transfer = Column(Boolean, nullable=False)
    customers = relationship('Customer', back_populates='operator')
    players = relationship('Player', back_populates='operator')
    kiosks = relationship('Kiosk', back_populates='operator')
