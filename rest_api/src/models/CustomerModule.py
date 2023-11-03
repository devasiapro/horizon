from __future__ import annotations

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from database import database

from src.models.Currency import Currency
from src.models.Language import Language
from src.models.customer_currency import customer_currency
from src.models.customer_language import customer_language

class CustomerModule(database.Base):
    __tablename__ = 'customer_module'
    id = Column(Integer, primary_key=True, index=True)
    merchant_english_name = Column(String(256), nullable=False)
    merchant_chinese_name = Column(String(256), nullable=True)
    wallet_type = Column(String(128), nullable=True)
    prefix = Column(String(128), nullable=True)
    business_contact = Column(String(128), nullable=True)
    billing_contact = Column(String(128), nullable=True)
    technical_contact = Column(String(128), nullable=True)
    customer_contact = Column(String(128), nullable=True)
    maintainer_contact = Column(String(128), nullable=True)
    company_contact = Column(String(128), nullable=True) 
    brand_name = Column(String(128), nullable=True)
    staging_desktop_lobby_url = Column(String(128), nullable=True)
    staging_mobile_lobby_url = Column(String(128), nullable=True)
    staging_wallet_endpoint = Column(String(128), nullable=True)
    staging_wallet_ip_port = Column(String(128), nullable=True)
    staging_service_api_ip = Column(String(128), nullable=True)
    production_desktop_lobby_url = Column(String(128), nullable=True)
    production_mobile_lobby_url = Column(String(128), nullable=True)
    production_wallet_endpoint = Column(String(128), nullable=True)
    production_wallet_ip_port = Column(String(128), nullable=True)
    production_service_api_ip = Column(String(128), nullable=True)
    currencies = relationship(
        'Currency',
        secondary=customer_currency,
        backref='customers'
    )
    languages = relationship(
        'Language',
        secondary=customer_language,
        backref='languages'
    )
    ip_whitelist = relationship('IpWhitelist', back_populates='customer')
    domain_whitelist = relationship('DomainWhitelist', back_populates='customer')
