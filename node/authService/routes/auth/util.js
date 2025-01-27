const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");
const {
  USER_SERVICES,
  ROLES,
} = require("../../../consts");

dotenv.config();

// Path to your private and public keys
const privateKey = fs.readFileSync(
  path.join(__dirname, "../auth/keys/private.key"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "../auth/keys/public.key"),
  "utf8"
);

const kid = "1";
const jku = `http://localhost:${process.env.PORT}/.well-known/jwks.json`;

// Define additional headers
const customHeaders = {
  kid,
  jku,
};

// Generate a JWT using the private key
function generateJWTWithPrivateKey(payload) {
  //sign JWT using RSA256
  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "6h",
    header: customHeaders,
  });
  return token;
}

async function fetchUsers() {
  let token = generateJWTWithPrivateKey({
    id: ROLES.AUTH_SERVICE,
    roles: [ROLES.AUTH_SERVICE],
  });
  const response = await axios.get(`${USER_SERVICES}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data, "fetch users in auth");
  return response.data;
}

module.exports = {
  kid,
  generateJWTWithPrivateKey,
  fetchUsers
};
