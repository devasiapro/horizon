from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class OfficeIp(database.Base):
    __tablename__ = 'office_ip'
    id = Column(Integer, primary_key = True, index = True)
    ip = Column(String(128), nullable = False)
    customer_id = Column(Integer, ForeignKey('customer_module.id'), nullable = False)
    customer = relationship(
                'CustomerModule',
                back_populates = 'office_ips',
                lazy = False
            )
