<template>
    <div class="container">
        <!-- Background Image -->
        <!-- <div class="background-image">
          <img src="src/assets/image2.jpg">
        </div> -->
        
        <!-- Header Section -->
        <div class="header">
            <h1 class="title">Welcome!</h1>
            <p class="subtitle">To Groyo, your onestep grocery delivery partner.</p>
        </div>

        <!-- Form Section -->
        <div class="form-container">
            <div class="form-wrapper">
                <h2>Register with</h2>
                <div class="social-login">
                    <button class="social-btn facebook">F</button>
                    <button class="social-btn apple"></button>
                    <button class="social-btn google">G</button>
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
  .container {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #ffffff;
    padding: 20px;
    width: 500px;
    position:relative;
    left:400px;
    top:80px;
   
    
    

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
    background-color: black;
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
  </style>
  