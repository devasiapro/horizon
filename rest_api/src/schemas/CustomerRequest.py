from pydantic import BaseModel
from typing import List, Optional

class CustomerTransferRequest(BaseModel):
    billing_contact: Optional[str] = None
    brand_name: Optional[str] = None
    business_contact: Optional[str] = None
    company_contact: Optional[str] = None
    currencies: Optional[List[str]] = None
    customer_contact: Optional[str] = None
    domain_whitelist: Optional[List[str]] = None
    ip_whitelist: Optional[List[str]] = None
    languages: Optional[List[str]] = None
    maintainer_contact: Optional[str] = None
    merchant_chinese_name: Optional[str] = None
    merchant_english_name: Optional[str] = None
    prefix: Optional[str] = None
    technical_contact: Optional[str] = None
    wallet_type: Optional[str] = None

class CustomerSeamlessRequest(BaseModel):

    pass
