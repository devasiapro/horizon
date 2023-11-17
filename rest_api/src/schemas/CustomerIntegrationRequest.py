from pydantic import BaseModel
from typing import List

class CustomerIntegrationRequest(BaseModel):
    integration_status_id: int
