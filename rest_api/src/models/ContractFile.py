from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import database

class ContractFile(database.Base):
    __tablename__ = 'contract_file'
    id = Column(Integer, primary_key = True, index = True)
    customer_id =  Column(Integer(), ForeignKey('customer_module.id'), nullable = False)
    customer = relationship(
            'CustomerModule',
            back_populates = 'contract_files',
            lazy = False
        )
    file_url = Column(String(256), nullable = True)
    filename = Column(String(256), nullable = False)
    description = Column(String(256), nullable = True)
