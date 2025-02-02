from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from config import MONGO_URI
from schemas import OrderSchema
from auth import decode_jwt_token

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)


client = AsyncIOMotorClient(MONGO_URI)
db = client["orders"]
collection = db["Orders"]

@app.post("/orders/", response_model=dict)
async def add_orders(order: OrderSchema, decoded_token: dict = Depends(decode_jwt_token)):
    """ Create an order, ensuring the user is authenticated """
    
    user_id = decoded_token.get("id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token, missing user ID")

 
    order_data = order.dict()
    order_data["userId"] = user_id  


    result = await collection.insert_one(order_data)
    
    return {"message": "Order added successfully", "order_id": str(result.inserted_id)}

@app.get("/orders/")
async def get_orders(decoded_token: dict = Depends(decode_jwt_token)):
    """ Fetch all orders for the authenticated user """
    
    if not isinstance(decoded_token, dict):  # Ensure token is valid
        raise HTTPException(status_code=401, detail="Invalid or missing token")

    user_id = decoded_token.get("id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token, missing user ID")

    orders = await collection.find({"userId": user_id}).to_list(None)
    
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found for this user")
    

    for order in orders:
        if "_id" in order and isinstance(order["_id"], ObjectId):
            order["_id"] = str(order["_id"])

    return orders
