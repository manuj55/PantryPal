<template>
  <div class="upper-pannel">
    <p class="welcome-text">Welcome to Groyo, we are happy to have you here. Order grocery online and get it delivered to your doorstep.</p>
  </div>
    <div class="container">
        <!-- Background Image -->
        
        
        <!-- Header Section -->
        <div class="header">
            <!-- <h1 class="title">Welcome!</h1>
            <p class="subtitle">To Groyo, your onestep grocery delivery partner.</p> -->
        </div>

        <!-- Form Section -->
        <div class="form-container">
            <div class="form-wrapper">
                <h2>Register with</h2>
                <div class="social-login">
                    <button class="social-btn facebook"><i class="fab fa-facebook"></i></button>
                    <button class="social-btn apple"><i class="fab fa-instagram"></i></button>
                    <button class="social-btn google"><i class="fa fa-envelope"></i>
                    </button>
                </div>
                <p class="or-divider">or</p>
                <form @submit.prevent="handleSubmit">
                    <input type="text" v-model="name" placeholder="Name" required />
                    <input type="email" v-model="email" placeholder="Email" required />
                    <input type="password" v-model="password" placeholder="Password" required />
                    <label class="terms">
                        <input type="checkbox" v-model="acceptTerms" required /> I agree to the <a href="#">Terms and Conditions</a>
                    </label>
                    <button type="submit" :disabled="!acceptTerms">Sign Up</button>
                </form>
                <p class="login-link">Already have an account? <a href="/signin">Sign in</a></p>
            </div>
        </div>
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
        acceptTerms: false,
      };
    },
    methods: {
      handleSubmit() {
        console.log("Form submitted", { name: this.name, email: this.email, password: this.password });
      },
    },
  };
  </script>
  
  <style scoped>
  .welcome-text{
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    padding: 40px;
    color: #ffff;
  }

  .upper-pannel{
    flex: 1;
    background-image: linear-gradient(rgba(66, 66, 66, 0.5), rgba(92, 91, 91, 0.5)), url('../assets/pleasantgrocery.jpg');
    height: 500px;
    background-size: cover;
    background-position: center;
  }

  .container {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #ffffff;
    padding: 20px;
    width: 500px;
    position:relative;
    left:20px;
    bottom:300px; 
    border-radius: 40px;
  }

  .header {
    margin-bottom: 30px;
  }

  .title {
    font-size: 2.5rem;
    font-weight: bold;
    margin: 0;
  }

  .subtitle {
    color: #666;
    margin: 10px 0 20px;
  }

  .form-container {
    display: flex;
    justify-content: center;
  }

  .form-wrapper {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
  }

  .social-login {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .social-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: white;
    border: none;
    cursor: pointer;
  }

  .facebook {
    background-color: #3b5998;
  }

  .apple {
    background-color: rgb(201, 20, 201);
  }

  .google {
    background-color: #db4437;
  }

  .or-divider {
    margin: 20px 0;
    color: #999;
    font-size: 0.9rem;
  }

  form input {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  form button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background-color: #3b5998;
    color: white;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }

  form button:disabled {
    background-color: #999;
    cursor: not-allowed;
  }

  .terms {
    font-size: 0.8rem;
    color: #666;
    text-align: left;
  }

  .terms a {
    color: #3b5998;
    text-decoration: none;
  }

  .login-link {
    margin-top: 10px;
    font-size: 0.9rem;
  }

  .login-link a {
    color: #3b5998;
    text-decoration: none;
  }

  /* Media Queries */
  @media (max-width: 1200px) {
    .container {
      width: 450px;
    }
  }

  @media (max-width: 992px) {
    .container {
      width: 400px;
    }
  }

  @media (max-width: 768px) {
    .container {
      width: 350px;
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    .container {
      width: 100%;
      padding: 10px;
      left: 0;
      bottom: 0;
      border-radius: 0;
    }
  }
  </style>

  