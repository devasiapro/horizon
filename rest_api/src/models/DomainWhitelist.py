from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class DomainWhitelist(database.Base):
    __tablename__ = 'domain_whitelist'
    id = Column(Integer, primary_key=True, index=True)
    domain = Column(String(45), nullable=False)
    customer_id = Column(Integer, ForeignKey('customer_module.id'), nullable=False)
    customer = relationship(
            'CustomerModule',
            back_populates='domain_whitelist',
            lazy=False
        )
