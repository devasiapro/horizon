from pydantic import BaseModel
from typing import List

class CustomerResponse(BaseModel):
    id: int 
    merchant_english_name: str
    merchant_chinese_name: str
