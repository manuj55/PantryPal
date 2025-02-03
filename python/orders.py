from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from config import MONGO_URI
from schemas import OrderSchema,PaymentRequest,PaymentDetails
from auth import decode_jwt_token
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
import json
import jwt
import base64
import httpx
from datetime import datetime, timedelta
import os
import re
import httpx
from jwt_generator import generate_jwt


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  
PUBLIC_KEY_PATH = os.path.join(BASE_DIR, "keys", "public.key")

PUBLIC_KEY_METADATA = {
    "kty": "RSA",
    "kid": "1",
    "use": "sig",
    "alg": "RS256",
    "e": "AQAB"
}


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
    order_data["userId"] = user_id  
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
    

    for order in orders:
        if "_id" in order and isinstance(order["_id"], ObjectId):
            order["_id"] = str(order["_id"])

    return orders


@app.get("/products/")
async def get_products():
    """ Fetch all products from an external API, generating a JWT for authentication """
    
    try:

        generated_token = generate_jwt(user_id="679eb9c5f806e7cc18b12f83")  


        async with httpx.AsyncClient() as client:
            response = await client.get(
                "http://localhost:5004/api/products",
                headers={"Authorization": f"Bearer {generated_token}"}
            )

            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to fetch products")

        return response.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")
    
@app.post("/payment/")
async def process_payment(
    payment_data: PaymentRequest, 
    decoded_token: dict = Depends(decode_jwt_token)  
):
    """Decrypt auth token, verify user, generate a new token, and send payment details"""

    try:

        token_user_id = decoded_token.get("id")
        if not token_user_id or token_user_id != payment_data.user_id:
            raise HTTPException(status_code=401, detail="Unauthorized: Token user ID does not match the requested user ID")

        print("Decoded Token:", decoded_token)

 
        new_generated_token = generate_jwt(user_id=payment_data.user_id)


        payment_payload = {
            "name": payment_data.name,
            "amount": payment_data.amount
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:5005/api/payment",
                headers={"Authorization": f"Bearer {new_generated_token}"},
                json=payment_payload
            )

            print("Generated Token for Next API Call:", new_generated_token)
            print("External API Response Status:", response.status_code)
            print("External API Response Body:", response.text)

            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail="Failed to process payment")

        return response.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing payment: {str(e)}")
 
@app.post("/payment-details/")
async def process_payment(
    payment_data: PaymentDetails, 
    decoded_token: dict = Depends(decode_jwt_token)  # ✅ Automatically extracts & verifies JWT
):
    """Decode JWT token, verify user, generate a new token, and send payment details to another endpoint"""

    try:
        print("Decoded Token:", decoded_token)
        new_generated_token = generate_jwt(user_id=payment_data.userId)


        payment_payload = {
            "userId": payment_data.userId,
            "name": payment_data.name,
            "amount": payment_data.amount,
            "paymentStatus": payment_data.paymentStatus,
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(
                "http://localhost:5005/api/paymentDetails",  
                headers={"Authorization": f"Bearer {new_generated_token}"},
                json=payment_payload
            )

            print("Generated Token for Next API Call:", new_generated_token)
            print("External API Response Status:", response.status_code)
            print("External API Response Body:", response.text)

            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=f"Failed to confirm payment: {response.text}")

        return response.json()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing payment: {str(e)}")
 
 
 
    
@app.get("/public-key/", response_model=dict)
async def get_public_key():
    """ Serve the public key in JWK format (Replicating Node.js behavior) """
    try:

        with open(PUBLIC_KEY_PATH, "r") as public_key_file:
            public_key_str = public_key_file.read()


        match = re.search(
            r"-----BEGIN PUBLIC KEY-----\n(.*?)\n-----END PUBLIC KEY-----",
            public_key_str,
            re.DOTALL,
        )

        if not match:
            raise HTTPException(status_code=500, detail="Invalid public key format")


        n_b64 = match.group(1).replace("\n", "")


        PUBLIC_KEY_METADATA["n"] = n_b64

        return {"keys": [PUBLIC_KEY_METADATA]}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error serving public key: {str(e)}")
    
    
    