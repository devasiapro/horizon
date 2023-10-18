from fastapi import HTTPException, status
from datetime import date
from pydantic import BaseModel, Field, field_validator, FieldValidationInfo
from typing import ClassVar

from src.models.GameType import GameType

ORDER_ASC = "asc"
ORDER_DESC = "desc"

class FetchGameEarningsRequest(BaseModel):
    ORDER_ASC: ClassVar[str] = ORDER_ASC
    ORDER_DESC: ClassVar[str] = ORDER_DESC

    date_from: date
    date_to: date
    game_type: str
    order: str
    count: int
   
    #STUB: comment out because having issue getting "date_to" in values.data.
    #@field_validator('date_from')
    def validate_date_from(cls, value: date, values: FieldValidationInfo) -> date:
        date_to = values.data.get('date_to')
        if value <= date_to:
            raise HTTPException(
                    status_code = 422, 
                    detail = "End date must be greater than the start date."
            )
        return value

    @field_validator('game_type')
    def validate_game_type(cls, value: date, values) -> str:
        if value not in [GameType.GAME_TYPE_LIVE, GameType.GAME_TYPE_SLOT]:
            raise HTTPException(
                    status_code = 422, 
                    detail = "Game type value must be 'live' or 'slot' only."
            )
        return value

    @field_validator('order')
    def validate_order(cls, value: date, values) -> str:
        if value not in [ORDER_ASC, ORDER_DESC]:
            raise HTTPException(
                    status_code = 422, 
                    detail = "Order value must be 'asc' or 'desc' only."
            )
        return value
