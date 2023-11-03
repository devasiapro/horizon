from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class IpWhitelist(database.Base):
    __tablename__ = 'ip_whitelist'
    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String(45), nullable=False)
    customer_id = Column(Integer, ForeignKey('customer_module.id'), nullable=False)
    customer = relationship(
            'CustomerModule', 
            back_populates='ip_whitelist', 
            lazy=False
        )
