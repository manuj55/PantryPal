<template>
  <div class="login-page">
    <div class="left-panel">
      <h1>FRESH BASKET.</h1>
      <p>
        Freshness Delivered, <br />
        Convenience at Your Doorstep!
      </p>
    </div>
    <div class="right-panel">
      <form @submit.prevent="validateform">
        <h2>Welcome To Fresh Basket</h2>
        <p>Register to get started</p>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your name" /> <br />
          <span v-if="errors.username" class="error">{{ errors.username }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" /><br />
          <span v-if="errors.email" class="error">{{ errors.email }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <div class="password-container">
            <input type="password" id="password" v-model="password" placeholder="Enter your password" />
            <button type="button" class="toggle-password"></button>
          </div>
          <span v-if="errors.password" class="error">{{ errors.password }}</span>
        </div>
        <button type="submit" class="register-button">Register</button>
        <p class="signup-link"> Do you already have an account? <a href="/signin">Sign In</a></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    validateform() {
      this.errors = {};

      if (!this.username) {
        this.errors.username = 'Username is required.';
      }
      if (!this.email) {
        this.errors.email = 'Email is required.';
      }
      if (!this.password) {
        this.errors.password = 'Password is required.';
      }

      if (Object.keys(this.errors).length === 0) {
        this.handleSubmit();
      }
    },
    async handleSubmit() {
      try {
        const response = await axios.post('http://localhost:5002/api/users', {
          name: this.username,
          email: this.email,
          password: this.password
        });
        if (response.status === 200) {
          alert('Registered successfully!');
        }
      } catch (error) {
        console.error('Error registering user:', error);
        alert('Failed to register. Please try again.');
      }
    }
  }
}

</script>

<style scoped>
/* General Styling */
.login-page {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* Left Panel */
.left-panel {
  flex: 1;
  background-image: linear-gradient(rgba(66, 66, 66, 0.5), rgba(51, 51, 51, 0.116)),url('../assets/unsplash.jpg');
  background-size: cover;
  background-position: left;
  color: #ffffff;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.left-panel h1 {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
}

.left-panel p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.image-container {
  width: 100%;
  text-align: center;
}

.image-container img {
  width: 100%;
  max-width: 400px;
  object-fit: cover;
}

/* Right Panel */
.right-panel {
  flex: 1;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.right-panel h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.right-panel p {
  font-size: 16px;
  margin-bottom: 20px;
}

.gmail-login {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  border: 1px solid #29a12f;
  background-color: transparent;
  color: #29a12f;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

.gmail-login img {
  width: 20px;
  height: 20px;
}

form {
  width: 80%;
  height: auto;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(119, 118, 118, 0.1);
  border-radius: 5px;
  padding: 20px;
  /* position: relative;
  left: 90px; */
  border-radius: 40px;
}

.form-group {
  text-align: left;
  margin-bottom: 20px;
  width: 100%;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #555;
}

input {
  width: 90%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.password-container {
  display: flex;
  align-items: center;
  width: 93%;
}

.password-container input {
  flex: 1;
  width: 90%;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  margin-left: 5px;
}

.forgot-password {
  font-size: 14px;
  color: #1717e4;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
}

.register-button {
  width: 50%;
  padding: 10px;
  background-color: #29a12f;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.signup-link {
  font-size: 14px;
  margin-top: 10px;
}

.signup-link a {
  color: #1717e4;
  text-decoration: none;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .left-panel, .right-panel {
    flex: none;
    width: 100%;
    padding: 20px;
  }

  .left-panel {
    align-items: center;
    text-align: center;
  }

  .right-panel {
    align-items: center;
    text-align: center;
  }

  .gmail-login {
    justify-content: center;
  }

  .password-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .toggle-password {
    margin-left: 0;
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .left-panel, .right-panel {
    padding: 10px;
  }

  .left-panel h1 {
    font-size: 28px;
  }

  .left-panel p {
    font-size: 16px;
  }

  .right-panel h2 {
    font-size: 24px;
  }

  .right-panel p {
    font-size: 14px;
  }

  .gmail-login {
    padding: 8px 16px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  input {
    padding: 8px;
  }

  .register-button {
    padding: 8px;
    font-size: 14px;
  }

  .forgot-password {
    font-size: 12px;
  }

  .signup-link {
    font-size: 12px;
  }
}
</style>