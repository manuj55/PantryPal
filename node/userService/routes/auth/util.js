const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const axios = require("axios");
const { ROLES } = require("../../consts");

dotenv.config();

async function fetchJWKS(jku) {
  const response = await axios.get(jku)
  return response.data.keys;
}

function getPublicKeyFromJWKS(kid, keys) {
  const key = keys.find((k) => k.kid === kid);

  if (!key) {
    throw new Error("Unable to find a signing key that matches the 'kid'");
  }

  return `-----BEGIN PUBLIC KEY-----\n${key.n}\n-----END PUBLIC KEY-----`;
}

async function verifyJWTWithJWKS(token) {
  const decodedToken = jwt.decode(token, { complete: true }).header;
  const { jku, kid, alg } = decodedToken;
  if (!kid || !jku) {
    throw new Error("JWT header is missing 'kid' or 'jku'");
  }
  if (alg !== "RS256") {
    throw new Error(`Invalid algorithm ${alg}. Must be RS256`);
  }

  const keys = await fetchJWKS(jku);
  const publicKey = getPublicKeyFromJWKS(kid, keys);
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] })
}

// Role-based Access Control Middleware
function verifyRole(requiredRoles) {
  return async (req, res, next) => {
    console.log("req.headers", req?.headers?.authorization?.split(" ")[1]);
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Step 1: Verify the JWT
      const decodedToken = await verifyJWTWithJWKS(token);
      req.user = decodedToken;
      // Step 2: Check if the user has the required role
      const userRoles = decodedToken.roles || [];
      console.log("decodedToken", decodedToken);
      const hasRequiredRole = userRoles.some((role) => requiredRoles.includes(role));
      console.log("userRoles", userRoles);
      console.log("hasRequiredRole", hasRequiredRole);
      if (hasRequiredRole) {
        next();
      } else {
        return res.status(403).json({ message: "Access Forbidden: Insufficiant role" });
      }
    } catch (error) {
      return res.status(403).json({ message: "Invaid or expired token", error: error.message });
    }
  }
}

module.exports = {
  verifyRole,
};
