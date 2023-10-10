from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class Game(database.Base):
    __tablename__ = 'game'
    id = Column(Integer, primary_key=True, index=True)
    client_type_id = Column(Integer, ForeignKey('client_type.id'), nullable=False)
    client_type = relationship('ClientType', back_populates='games')
    name = Column(String(256), nullable=False)
    game_type_id = Column(Integer, ForeignKey('game_type.id'), nullable=False)
    game_type = relationship('GameType', back_populates='games', lazy=False)
    game_sessions = relationship('GameSession', back_populates='game')
