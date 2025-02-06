# Here’s the section for the README file with instructions on how to use the .env files from Google Drive:

markdown
Copy
Edit
## Environment Setup

To run this project, you need to configure the environment variables using the provided `.env` files. Follow the instructions below to download and set them up.

### Step 1: Download the `.env` Files
The `.env` files required for the project can be found at the following Google Drive link:

[Download .env files from Google Drive](<https://docs.google.com/document/d/18X93x3kJM7F2iyxDjF9U7CRVwD2Hox9O/edit?usp=sharing&ouid=105734300263154750995&rtpof=true&sd=true>)

### Step 2: Place the Files in the Correct Location
Once downloaded, place the `.env` files in the root directory of the project (or the appropriate subdirectories if specified).
 

# Roles and responsibilities of team members

# Manu Janardhana

## Service Development (Node.js, REST APIs)
- The Auth Service (for authorization) and User Service (for user data) were developed following the MVC pattern, with REST APIs for each.
- Swagger was integrated for API documentation.

## Auth Service
- JWT tokens with asymmetric encryption (digital signatures) were used for secure authorization.
- User roles were included in tokens to control access.
- The service made internal REST calls to the User Service to verify user data.

## User Service
- Endpoints (GET, POST, PUT, DELETE) were provided to manage user information.
- Email verification was added during signup to confirm valid emails.
- Users could only manage their own data, while deletion was restricted to administrators.
- The service used REST calls for data retrieval and updates.

## Additional Features & Tools
- A logger with a correlation ID was added to trace logs across services.
- A rate limiter was included to prevent excessive requests.
- Jest tests were written for both services to ensure functionality.

##  Docker Integration
Both **AuthServices** and **UserServices** are containerized to ensure easy deployment and scalability:
- Created Docker images for each microservice.
- Docker Compose was used to make services run in "one network" services and link them within a shared network.

## Project Setup & Git Management
- The project was initialized in Git with rules for commit messages.
- Pull Requests were checked to maintain clean code; any that did not follow standards were changed or reverted.

## Technologies Used
- **Backend**: Node.js, Express  
- **Packages Used**: JWT, winston-elasticsearch, express-rate-limit, mongoose, jest
- **Database**: MongoDB  
- **Containerization**: Docker

---

# Pramukh Prakash

##  ProductService
Provides CRUD operations for managing products, along with enhanced security and performance measures.

**Key Features:**
- **CRUD Operations**:  
  - Endpoints to create, read, update, and delete product information.  
  - Product images are stored in the database as byte arrays.  
  - GET endpoints are accessible to any authenticated user.  
  - POST, PUT, and DELETE endpoints are restricted to users with the `admin` or `order_service` roles.
- **Search Functionality**: Endpoints for fetching products by name or category.
- **Security Enhancements**:  
  - **JWT Token Validation** using Public Key (asymmetric encryption) to verify signatures.  
  - **Role-Based Access Control** to protect specific endpoints.  
  - **Rate Limiting** to prevent Denial of Service (DoS) attacks.
- **Global Error Handling**: Centralized error handling with meaningful response messages and logging.
- **Clean Architecture**: Follows the MVC pattern for better maintainability and scalability.

##  PaymentService
Handles payment processing using Stripe and securely manages payment details.

**Key Features:**
- **Stripe Integration**: Provides seamless and efficient payment processing.
- **Payment Data Management**: Endpoints to store payment transaction details in the database.
- **Security**:
  - **JWT Token Validation** for verifying requests.
  - **Role-Based Access Control** to safeguard endpoints.

##  Docker Integration
Both **ProductService** and **PaymentService** are containerized to ensure easy deployment and scalability:
- Created Docker images for each microservice.
- Docker Compose was used to make services run in "one network"

## Team Management
- Led a team of **4 members**.
- Conducted **daily stand-up** meetings to track progress.
- Assigned tasks, monitored progress, and ensured timely delivery.

##  Technologies and Tools Used
- **Backend**: Java, Spring Boot, Maven
- **Security & Logging**: JWT, SLF4J
- **Database**: MongoDB
- **Containerization**: Docker

---
# Yathish Sadashivareddy

- **1. Vue.js Frontend Development**:
  - **Project Setup**: Configured Vue.js with Vue Router for navigation, Vuex for state management, and applied consistent UI styling.
  - **Key Components Developed**:
    - **Dashboard**: Displays available products, supports search by title, category filtering, and adding items to the cart.
    - **Cart**: Allows users to modify product quantities, proceed to checkout, and seamlessly integrates with Stripe for secure payments.
    - **Orders Page**: Displays past orders, fetching order history from the backend.

- **2. Orders Microservice Development**:
  - **Secure Order Management**:
    - Implements JWT-based authentication to ensure that only authorized users can place and view orders.
    - Validates user_id before creating or retrieving orders.
  - **Integration with External Services**:
    - Fetches product details securely from an external API with authentication.
    - Processes payments by verifying JWT tokens before forwarding details to the Payment Service.
  - **Order Processing & History Management**:
    - Updates order records upon successful payment.
    - Maintains a user-specific order history, allowing seamless retrieval of past purchases.
  - **Authentication & Scalability**:
    - Provides a public key endpoint in JWK format to facilitate authentication between services.
    - Uses Docker for containerization, ensuring scalability and easy deployment.

- **3. Security & Authentication**:
  - Implements JWT-based authentication for secure API access.
  - Generates and validates self-signed JWT tokens to ensure request authenticity.
  - Protects endpoints by decrypting and verifying tokens before processing requests.

- **Technologies Used**:
  - **Frontend**: Vue.js, Vuex, Vue Router
  - **Backend**: FastAPI, MongoDB, JWT Authentication
  - **Database**: MongoDB
  - **Containerization**: Docker

---
# Manoj Padmanabha

## **Developed Pages**
- **Sign In Page:** For user authentication.
- **Sign Up Page:** Allows new users to register.
- **User Profile Page:** Enables users to view and manage their personal details.
- **Admin Page:** Provides admin-specific functionalities for product management.

## **Frontend**
- Built using **Vue.js** to deliver a responsive and user-friendly interface.
- Integrated with backend API endpoints to enable essential functionalities and maintain smooth interaction between the frontend and backend.

## **CRUD Operations**
- **User Profile Page:** Supports full CRUD (Create, Read, Update, Delete) operations for managing user information.
- **Admin Page:** Admins can perform CRUD operations on products, including adding, updating, and deleting products.

## **Security**
- Role-based access control enforced through an admin token generated by the backend service.
- Secured endpoints ensure only authorized users can access sensitive admin features.

## **Deployment**
- Created a Docker image for the frontend application to facilitate deployment across multiple environments.
- Containerization enhances consistency, scalability, and simplifies maintenance.

## **Technologies Used**
- **Frontend:** Vue.js, HTML, CSS, JavaScript
- **Deployment:** Docker for containerizing the frontend application


-----------------------------------------------------


