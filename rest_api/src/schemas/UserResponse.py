from pydantic import BaseModel

class UserResponse(BaseModel):
    email: str
    username: str
    first_name: str
    id: int
    last_name: str
    user_role_id: int
    class Config:
        orm_mode = True
