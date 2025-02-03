from pydantic import BaseModel,Field
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


class PaymentRequest(BaseModel):
    user_id: str
    name: str
    amount: float  
    
class PaymentDetails(BaseModel):
    userId: str
    name: str
    amount: int # Large number support
    paymentStatus: str