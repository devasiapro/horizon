from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class Kiosk(database.Base):
    __tablename__ = 'kiosk'
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String(45), nullable=False)
    operator_id = Column(Integer, ForeignKey('operator.id'), nullable=False)
    operator = relationship('Operator', back_populates='kiosks')
    top_level_entity_id = Column(Integer, ForeignKey('top_level_entity.id'), nullable=False)
    top_level_entity = relationship('TopLevelEntity', back_populates='kiosks')
    players = relationship('Player', back_populates='kiosk')
