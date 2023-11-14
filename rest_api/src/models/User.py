from sqlalchemy import Column, Integer, String, ForeignKey
from database import database
from sqlalchemy.orm import relationship

class User(database.Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key = True, index = True)
    first_name = Column(String(64), nullable = False)
    last_name = Column(String(64), nullable = False)
    password = Column(String(256), nullable = False)
    username = Column(String(256), nullable = False)
    email = Column(String(64), nullable = True)
    user_role_id = Column(Integer, ForeignKey('user_role.id'), nullable = False)
    user_role = relationship('UserRole', back_populates = 'users')
