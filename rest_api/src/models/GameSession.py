from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric
from sqlalchemy.orm import relationship
from database import database

class GameSession(database.Base):
    __tablename__ = 'game_session'
    id = Column(Integer, primary_key=True, index=True)
    currency = Column(String(32), nullable=False)
    player_id = Column(Integer(), ForeignKey('player.id'), nullable=False)
    player = relationship('Player', back_populates='game_sessions')
    date_played = Column(Date(), nullable=False)
    game_id = Column(Integer(), ForeignKey('game.id'), nullable=False)
    game = relationship('Game', back_populates='game_sessions')
    client_platform_id = Column(Integer(), ForeignKey('client_platform.id'), nullable=False)
    client_platform = relationship('ClientPlatform', back_populates='client_platforms')
    total_game_bet = Column(Numeric(10, 2, asdecimal=True), nullable=False)
    total_game_win = Column(Numeric(10, 2, asdecimal=True), nullable=False)
    total_game_income = Column(Numeric(10, 2, asdecimal=True), nullable=False)
