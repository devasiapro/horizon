from pydantic import BaseModel
from typing import List

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
    wallet_type: str
