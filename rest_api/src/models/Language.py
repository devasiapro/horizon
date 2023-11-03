from sqlalchemy import Column, Integer, String
from database import database

class Language(database.Base):
    __tablename__ = 'language'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=False)
