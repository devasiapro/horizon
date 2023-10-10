from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class ClientType(database.Base):
    __tablename__ = 'client_type'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(45), nullable=False)
    games = relationship('Game', back_populates='client_type') 
