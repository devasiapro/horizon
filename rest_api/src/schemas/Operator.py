from pydantic import BaseModel
from typing import Optional

class Operator(BaseModel):
    id: int
    brand: str
    is_transfer: str
