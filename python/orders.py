from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from config import MONGO_URI
from schemas import OrderSchema
from auth import decode_jwt_token

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
client = AsyncIOMotorClient(MONGO_URI)
db = client["orders"]
collection = db["Orders"]

@app.post("/orders/{user_id}", response_model=dict)
async def add_orders(
    user_id: str, 
    order: OrderSchema, 
    decoded_token: dict = Depends(decode_jwt_token)
):
    """ Create an order only if the user_id matches the one in the JWT token """
    
    token_user_id = decoded_token.get("id")
    if not token_user_id or token_user_id != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: Token user ID does not match the requested user ID")

    order_data = order.dict()
    order_data["userId"] = user_id  # Ensure user ID consistency

    result = await collection.insert_one(order_data)
    
    return {"message": "Order added successfully", "order_id": str(result.inserted_id)}

@app.get("/orders/{user_id}")
async def get_orders(user_id: str, decoded_token: dict = Depends(decode_jwt_token)):
    """ Fetch all orders for a user, ensuring they are authorized """

    token_user_id = decoded_token.get("id")
    if not token_user_id or token_user_id != user_id:
        raise HTTPException(status_code=401, detail="Unauthorized: Token user ID does not match the requested user ID")

    orders = await collection.find({"userId": user_id}).to_list(None)
    
    if not orders:
        raise HTTPException(status_code=404, detail="No orders found for this user")
    
    # ✅ Convert MongoDB's `ObjectId` to string before returning
    for order in orders:
        if "_id" in order and isinstance(order["_id"], ObjectId):
            order["_id"] = str(order["_id"])

    return orders
