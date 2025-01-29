const AUTH_SERVICE = "http://localhost:5001/api/login";

const USER_SERVICES = "http://localhost:5002/api/users";


// roles.js
const ROLES = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  AUTH_SERVICE: "auth_service"
});

module.exports = {
  AUTH_SERVICE,
  USER_SERVICES,
  ROLES,
};
