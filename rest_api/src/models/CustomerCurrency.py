from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, false
from sqlalchemy.orm import relationship
from database import database

class CustomerCurrency(database.Base):
    __tablename__ = 'customer_currency'
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(ForeignKey('customer_module.id'))
    currency_id = Column(ForeignKey('currency.id'))
    is_default = Column('is_default', Boolean(), nullable = False, server_default = false())
    currency = relationship('Currency', back_populates = 'customers')
    customer = relationship('CustomerModule', back_populates = 'customer_currencies')
