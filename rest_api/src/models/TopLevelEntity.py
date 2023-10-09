from sqlalchemy import Column, Integer, String, ForeignKey
from database import database
from sqlalchemy.orm import relationship

class TopLevelEntity(database.Base):
    __tablename__ = 'top_level_entity'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(45), nullable=False)
    kiosks = relationship('Kiosk', back_populates('top_level_entity'))
