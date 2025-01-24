<template>
  <div class="login-page">
    <div class="left-panel">
    <h1>GROYO.</h1>
    <p>
      Freshness Delivered, <br />
    Convenience at Your Doorstep!
    </p>
     
    </div>
    <div class="right-panel">
    <h2>Welcome Back!</h2>
    <p>Continue with Gmail or enter your details to LogIn.</p>
    <button class="gmail-login"> Login with Gmail</button>
    <form>
      <div class="form-group">
      <label for="username">Username</label>
      <input type="email" id="username" placeholder="Enter your gmail" />
      </div>
      <div class="form-group">
      <label for="password">Password</label>
      <div class="password-container">
        <input type="password" id="password" placeholder="Enter your password" />
        <button type="button" class="toggle-password"></button>
      </div>
      </div>
      <a href="#" class="forgot-password">Forget password?</a>
      <button type="submit" class="login-button">Login</button>
    </form>
    <p class="signup-link"> Dont have an account? <a href="/signup">Sign Up</a>
    </p>
    </div>
  </div>
  </template>
  
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
  border: 1px solid #5cda63;
  background-color: transparent;
  color: #5cda63;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  }

  .gmail-login img {
  width: 20px;
  height: 20px;
  }

  form {
  width: 100%;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  }

  .password-container {
  display: flex;
  align-items: center;
  }

  .password-container input {
  flex: 1;
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
  color: #5cda63;
  text-decoration: none;
  margin-bottom: 20px;
  display: inline-block;
  }

  .login-button {
  width: 100%;
  padding: 10px;
  background-color: #5cda63;
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
  color: #437ce6;
  text-decoration: none;
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

  .login-button {
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