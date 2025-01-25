<template>
    <div class="billing-container">
      <div class="payment-card">
        <div class="card-number">
          <h4>7852 4594 1122 4562</h4>
        </div>
        <div class="card-details">
          <div>
            <p class="card-holder"><strong>Card Holder:</strong> Jack Peterson</p>
            <p class="card-expiry"><strong>Expires:</strong> 11/22</p>
          </div>
          <img src="@/assets/mastercard.png" alt="MasterCard" class="card-logo" />
        </div>
      </div>
  
      <div class="payment-methods">
        <h5>Payment Methods</h5>
        <div class="payment-list">
          <div class="payment-item">
            <img src="@/assets/mastercard.png" alt="MasterCard" />
            <span>**** **** **** 7852</span>
            <font-awesome-icon icon="pen" class="edit-icon" />
          </div>
          <div class="payment-item">
            <strong>VISA</strong>
            <span>**** **** **** 5248</span>
            <font-awesome-icon icon="pen" class="edit-icon" />
          </div>
        </div>
        <button class="add-card-btn">
          <font-awesome-icon icon="plus" /> ADD NEW CARD
        </button>
      </div>
  
      <div class="billing-info">
        <h5>Billing Information</h5>
        <div class="info-card">
          <p><strong>Oliver Liam</strong></p>
          <p><strong>Company Name:</strong> Viking Burrito</p>
          <p><strong>Email Address:</strong> <a href="mailto:oliver@burrito.com">oliver@burrito.com</a></p>
          <p><strong>VAT Number:</strong> FRB1235476</p>
          <div class="info-actions">
            <button class="delete-btn">
              <font-awesome-icon icon="trash-alt" /> Delete
            </button>
            <button class="edit-btn">
              <font-awesome-icon icon="pen" /> Edit
            </button>
          </div>
        </div>
  
        <div class="info-card">
          <p><strong>Lucas Harper</strong></p>
          <p><strong>Company Name:</strong> Stone Tech Zone</p>
          <p><strong>Email Address:</strong> <a href="mailto:lucas@stonetech.com">lucas@stonetech.com</a></p>
          <p><strong>VAT Number:</strong> FRB0987654</p>
          <div class="info-actions">
            <button class="delete-btn">
              <font-awesome-icon icon="trash-alt" /> Delete
            </button>
            <button class="edit-btn">
              <font-awesome-icon icon="pen" /> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BillingPage",
  };
  </script>
  
  <style scoped>

  .billing-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  
  
  .payment-card {
    background: url('@/assets/curved14.jpg') no-repeat center;
    background-size: cover;
    color: white;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    min-height: 250px;
    margin: 0 auto 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
  }
  
  .card-number h4 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  .card-details {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    margin-top: auto;
  }
  
  .card-holder,
  .card-expiry {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .card-logo {
    position: absolute;
    bottom: 15px;
    right: 20px;
    width: 50px;
  }
  

  .payment-methods {
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    margin-bottom: 20px;
  }
  
  .payment-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .payment-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f8f9fa;
    padding: 15px;
    border-radius: 10px;
  }
  
  .payment-item img {
    width: 40px;
  }
  
  .edit-icon {
    cursor: pointer;
    color: #6c757d;
  }
  
  .add-card-btn {
    background: #1e1e2d;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 15px;
    width: 100%;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  

  .billing-info {
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  }
  
  .info-card {
    padding: 15px;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .info-card:last-child {
    border-bottom: none;
  }
  
  .info-card p {
    margin: 5px 0;
  }
  
  .info-card a {
    color: #007bff;
    text-decoration: none;
  }
  
  .info-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
  }
  
  .delete-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
  }
  

  @media (max-width: 768px) {
    .billing-container {
      padding: 10px;
    }
    .payment-card {
      padding: 20px;
      min-height: 160px;
    }
    .card-number h4 {
      font-size: 1.3rem;
    }
    .payment-item {
      flex-direction: column;
      align-items: flex-start;
    }
    .info-actions {
      justify-content: space-between;
    }
  }
  </style>
  