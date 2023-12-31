from __future__ import annotations

from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.orm import Mapped
from database import database

from src.models.Currency import Currency
from src.models.Language import Language
from src.models.License import License
from src.models.ContractFile import ContractFile
from src.models.IntegrationStatus import IntegrationStatus
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
    )
    languages = relationship(
        'Language',
        secondary=customer_language,
        backref='languages'
    )
    ip_whitelist = relationship('IpWhitelist', back_populates = 'customer')
    domain_whitelist = relationship('DomainWhitelist', back_populates = 'customer')
    regulations = relationship('Regulation', back_populates = 'customer')
    licenses = relationship('License', back_populates = 'customer')
    market_jurisdictions = relationship('MarketJurisdiction', back_populates = 'customer')
    office_ips = relationship('OfficeIp', back_populates = 'customer')
    test_account_stagings = relationship('TestAccountStaging', back_populates = 'customer')
    test_account_productions = relationship('TestAccountProduction', back_populates = 'customer')
    date_added = Column(DateTime, nullable = False)
    instance = Column(String(128), nullable = True)
    contract_status_id = Column(Integer, ForeignKey('contract_status.id'), nullable=False)
    contract_status = relationship(
            'ContractStatus', 
            back_populates='customer_modules', 
            lazy = False
    )
    integration_status_id = Column(Integer, ForeignKey('integration_status.id'), nullable = False)
    integration_status = relationship(
        'IntegrationStatus',
        back_populates = 'customer_modules',
        lazy = False
    )
    contract_files = relationship('ContractFile', back_populates = 'customer') 
    contract_label = Column(String(256), nullable = True)
    customer_currencies = relationship('CustomerCurrency', back_populates = 'customer')
