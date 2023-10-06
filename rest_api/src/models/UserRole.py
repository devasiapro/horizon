from sqlalchemy import Column, Integer, String, ForeignKey
from database import database
from sqlalchemy.orm import relationship

class UserRole(database.Base):
    __tablename__ = 'user_role'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(64))
