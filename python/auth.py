from fastapi import HTTPException, Request
import httpx
from jose import jwt

async def decode_jwt_token(request: Request):
    """ Extract JWT token, fetch public key from JWKS, format it as PEM, and verify JWT """

    auth_header = request.headers.get("Authorization")
    print("[STEP 1] Received Authorization Header:", auth_header)

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid token")
    
    token = auth_header.split(" ")[1]
    print("[STEP 2] Extracted Token:", token)

    try:
        jwt_header = jwt.get_unverified_header(token)
        print("[STEP 3] JWT Header:", jwt_header)

        jku_url = jwt_header.get("jku")
        kid = jwt_header.get("kid")

        if not jku_url:
            raise HTTPException(status_code=401, detail="Missing 'jku' in token header")

        async with httpx.AsyncClient() as client:
            response = await client.get(jku_url)
            print("[STEP 4] JKU Response Status:", response.status_code)

            if response.status_code != 200:
                raise HTTPException(status_code=401, detail="Failed to fetch public keys")

            jwks = response.json()
            print("[STEP 5] JWKS Response:", jwks)

            keys = jwks.get("keys", [])
            public_key_data = next((key for key in keys if key["kid"] == kid), None)

            if not public_key_data:
                raise HTTPException(status_code=401, detail="No matching key found in JWKS")

        print("[STEP 6] Extracting Public Key from JWKS...")


        raw_public_key = public_key_data["n"]
        pem_public_key = (
            "-----BEGIN PUBLIC KEY-----\n"
            + raw_public_key
            + "\n-----END PUBLIC KEY-----"
        )

        print("[STEP 7] Constructed Public Key (PEM Format):\n", pem_public_key)


        try:
            decoded_token = jwt.decode(token, pem_public_key, algorithms=["RS256"])
            print("[STEP 8] Successfully Decoded Token:", decoded_token)
            return decoded_token
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.JWTError as jwt_error:
            print("[ERROR] Token verification failed:", jwt_error)
            raise HTTPException(status_code=401, detail=f"Token verification failed: {str(jwt_error)}")

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Unexpected error: {str(e)}")
