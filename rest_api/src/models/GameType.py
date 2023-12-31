from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class GameType(database.Base):

    GAME_TYPE_LIVE = 'live'
    GAME_TYPE_SLOT = 'slot'

    __tablename__ = 'game_type'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(45), nullable=False)
    games = relationship('Game', back_populates='game_type') 
