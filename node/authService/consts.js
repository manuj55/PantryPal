const AUTH_SERVICE = "http://localhost:5001/api/login";

const AUTH_SERVICE_JKU = "http://localhost:5001"

const USER_SERVICES = "http://localhost:5002/api/users";



// roles.js
const ROLES = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  AUTH_SERVICE: "auth_service"
});

module.exports = {
  AUTH_SERVICE,
  AUTH_SERVICE_JKU,
  USER_SERVICES,
  ROLES,
};
