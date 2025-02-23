# PantryPal - Node.js Microservices  

This repository has Node.js microservices for **PantryPal**. It includes **Auth Service** for user authorization and **User Service** for managing user data. The services use the **MVC pattern** and follow **REST API** design.  

---

## About Me  
Hi, I'm **Manu Janardhana**. I am a **Full Stack Developer** who likes to build reliable and secure web services using **Node.js** and **Express**. I focus on writing clean code and using good security practices like **JWT** for authorization.  

---

## Node Folder Path  
You can find the Node.js services in the [node](https://github.com/manuj55/PantryPal/tree/main/node) folder of this repository.  
To see the commits for the Node.js services, check the `node` folder [here](https://github.com/manuj55/PantryPal/commits/main/node).  

---

## Service Development (Node.js, REST APIs)  
- Created **Auth Service** (for authorization) and **User Service** (for user data) using the **MVC pattern**.  
- Used **Swagger** for API documentation.  

---

## Auth Service
- Used **JWT tokens** with **asymmetric encryption** for secure authorization.  [link](https://github.com/manuj55/PantryPal/blob/main/node/authService/routes/auth/loginRoute.js)
- Added **user roles** in tokens to control access.  
- Auth Service calls the **User Service** to check user data. 
- folder [link](https://github.com/manuj55/PantryPal/tree/main/node/authService) 

---

## User Service  
- Added **CRUD endpoints** (GET, POST, PUT, DELETE) to manage user data. [link](https://github.com/manuj55/PantryPal/blob/main/node/userService/routes/userRoute.js)
- **Email verification** is required during signup. [link](https://github.com/manuj55/PantryPal/blob/main/node/userService/routes/verifyRoute.js)
- Users can only change their own data, but **admins** can delete any account.  
- Uses **REST calls** to get and update data.  
- folder [link](https://github.com/manuj55/PantryPal/tree/main/node/userService)

---

## Extra Features  
- **Logger with Correlation ID**: Added to track logs across services for better debugging. [link](https://github.com/manuj55/PantryPal/blob/main/node/userService/logging.js)
- **Rate Limiter**: Used to prevent too many requests and keep the service secure.  [link](https://github.com/manuj55/PantryPal/blob/main/node/userService/index.js#L17)
- **Jest Tests**: Tests were written to check if the services work correctly.  [link](https://github.com/manuj55/PantryPal/blob/main/node/userService/__tests__/userService.test.js)

---

## 🐳 Docker Integration  
Both **Auth Service** and **User Service** are containerized for easy deployment:  
The following are the Docker images of node application:

| Service         | Docker Image                                |
|-----------------|---------------------------------------------|
| **Auth Service** | manujana/node-authservice:latest         |
| **User Service** | manujana/node-userservice:latest         |
