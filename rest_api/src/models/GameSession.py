from sqlalchemy import Column, Integer, String, ForeignKey
from database import database
import sqlalchemy.orm import relationship

class GameSession:
    __name__ = 'game_session'
    id = Column(Integer, primary_key=True, index=True)
    currency = Column(String(32), nullable = False)
    player_id = Column(Integer(), ForeignKey('game_session.id'),  nullable = False)
