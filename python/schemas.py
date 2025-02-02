from pydantic import BaseModel
from typing import List


class OrderItem(BaseModel):
    id: str
    title: str
    description: str
    price: float
    category: str
    cartQuantity: int


class OrderSchema(BaseModel):
    orderId: str
    userId: str  
    items: List[OrderItem]
