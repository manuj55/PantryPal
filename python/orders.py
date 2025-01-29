from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List
from bson import ObjectId

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)

# MongoDB Connection
MONGO_URI = "mongodb+srv://Yathish:Goldenhand%40008@cluster0.chil8.mongodb.net/orders?retryWrites=true&w=majority"
client = AsyncIOMotorClient(MONGO_URI)
db = client["orders"]
collection = db["Orders"]

# Order Schema
class OrderItem(BaseModel):
    id: str
    title: str
    description: str
    price: float
    category: str
    cartQuantity: int

class OrderSchema(BaseModel):
    orderId: str
    items: List[OrderItem]

# Create Order with Single Order ID
@app.post("/orders/", response_model=dict)
async def add_orders(order: OrderSchema):
    order_data = order.dict()
    result = await collection.insert_one(order_data)
    return {"message": "Order added successfully", "order_id": str(result.inserted_id)}

# Fetch All Orders
@app.get("/orders/", response_model=List[OrderSchema])
async def get_orders():
    orders = await collection.find().to_list(None)
    return orders
