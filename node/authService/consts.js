const AUTH_SERVICE = "http://authservice:5001/api/login";

const AUTH_SERVICE_JKU = "http://authservice:5001"

const USER_SERVICES = "http://userservice:5002/api/users";



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
