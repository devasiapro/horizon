from pydantic import BaseModel
from typing import Annotated
from fastapi import Query

class Login(BaseModel):
    username: Annotated[str, Query(min_length = 1)]
    password: Annotated[str, Query(min_length = 1)]
