const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const dotenv = require("dotenv");
const axios = require("axios");
const {
  USER_SERVICES,
  AUTH_SERVICE_JKU,
  ROLES,
} = require("../../consts");
const { getCorrelationId } = require("../../correlationId");

dotenv.config();

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (req) => {
    const correlationId = getCorrelationId();
    req.headers["x-correlation-id"] = correlationId;
    return req;
  },
  (error) => Promise.reject(error)
);

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
const jku = `${AUTH_SERVICE_JKU}/.well-known/jwks.json`;

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
  const response = await axiosInstance.get(`${USER_SERVICES}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Docker container fetch users log:", response.data);
  return response.data;
}

module.exports = {
  kid,
  generateJWTWithPrivateKey,
  fetchUsers
};
