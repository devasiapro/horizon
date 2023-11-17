from pydantic import BaseModel
from typing import List

class TestAccountRequest(BaseModel):
    username: str
    password: str

class CustomerTransferRequest(BaseModel):
    billing_contact: str
    brand_name: str
    business_contact: str
    company_contact: str
    currencies: List[str]
    customer_contact: str
    domain_whitelist: List[str]
    ip_whitelist: List[str]
    languages: List[str]
    maintainer_contact: str
    merchant_chinese_name: str
    merchant_english_name: str
    prefix: str
    technical_contact: str
    instance: str

class CustomerSeamlessRequest(BaseModel):
    merchant_english_name: str
    brand_name: str
    regulations: List[str]
    market_jurisdiction: List[str]
    licenses: List[str]
    office_ips: List[str]
    languages_used: List[str]    
    currencies_used: List[str]
    default_currency: str
    business_contact: str
    billing_contact: str
    technical_contact: str
    customer_contact: str
    maintainer_contact: str
    company_contact: str
    staging_desktop_lobby_url: str
    staging_mobile_lobby_url: str
    test_account_stagings: List[TestAccountRequest]
    staging_wallet_endpoint: str
    staging_wallet_ip_port: str
    staging_service_api_ip: str
    production_desktop_lobby_url: str
    production_mobile_lobby_url: str
    test_account_productions: List[TestAccountRequest]
    production_wallet_endpoint: str
    production_wallet_ip_port: str
    production_service_api_ip: str
    instance: str
