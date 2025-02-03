import jwt
import os
from datetime import datetime, timedelta


BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get the directory of the script
PRIVATE_KEY_PATH = os.path.join(BASE_DIR, "keys", "private.key")



# JWT Header
JWT_HEADER = {
    "alg": "RS256",
    "typ": "JWT",
    "kid": "1",
    "jku": "http://localhost:5003/public-key/"  # Public Key Endpoint
}

def generate_jwt(user_id: str):
    """ Generate JWT token using private key """

    try:
        # **Read private key**
        if not os.path.exists(PRIVATE_KEY_PATH):
            raise FileNotFoundError("Private key file not found")

        with open(PRIVATE_KEY_PATH, "r") as private_key_file:
            private_key = private_key_file.read()

        # **JWT Payload**
        payload = {
            "id": user_id,
            "roles": ["order_service"],
            "iat": int(datetime.utcnow().timestamp()),  # Issued At
            "exp": int((datetime.utcnow() + timedelta(days=180)).timestamp())  # Expiry
        }

        # **Generate JWT**
        generated_token = jwt.encode(payload, private_key, algorithm="RS256", headers=JWT_HEADER)

        return generated_token

    except Exception as e:
        raise Exception(f"Error generating JWT: {str(e)}")
