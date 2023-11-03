from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from database import database

class Currency(database.Base):
    __tablename__ = 'currency'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(128), nullable=False)
