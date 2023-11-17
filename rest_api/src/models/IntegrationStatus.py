from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class IntegrationStatus(database.Base):
    __tablename__ = 'integration_status'
    id = Column(Integer, primary_key = True, index = True)
    name = Column(String(128), nullable = False)
    description = Column(String(256), nullable = True)
    customer_modules = relationship('CustomerModule', back_populates = 'integration_status')
