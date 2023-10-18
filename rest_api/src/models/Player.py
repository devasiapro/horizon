from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class Player(database.Base):
    __tablename__ = 'player'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(256), nullable=False)
    operator_id = Column(Integer, ForeignKey('operator.id'), nullable=False)
    operator = relationship('Operator', back_populates='players', lazy=False)
    player_currency = Column(String(45), nullable=False)
    language = Column(String(64), nullable=False)
    country = Column(String(64), nullable=False)
    player_code = Column(String(45), nullable=False)
    game_sessions = relationship('GameSession', back_populates='player')
    kiosk_id = Column(Integer, ForeignKey('kiosk.id'), nullable=False)
    kiosk = relationship('Kiosk', back_populates='players', lazy=False)
