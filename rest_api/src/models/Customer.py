from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import database

class Customer(database.Base):
    __tablename__ = 'customer'
    id = Column(Integer, primary_key=True, index=True)
    brand = Column(String(64), nullable=False)
    operator_id = Column(Integer, ForeignKey('operator.id'), nullable=False)
    operator = relationship('Operator', back_populates='customers')
