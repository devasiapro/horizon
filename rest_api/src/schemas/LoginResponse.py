from pydantic import BaseModel
from .UserResponse import UserResponse

class LoginResponse(BaseModel):
    token: str
    token_type: str
    user: UserResponse
    class Config:
        orm_mode = True
