from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class ClientPlatform(database.Base):
    __tablename__ = 'client_platform'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(45), nullable=False)
    client_platforms = relationship('GameSession', back_populates='client_platform')
