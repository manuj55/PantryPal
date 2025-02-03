<template>
  <div class="success-container">
    <div class="success-card">
      <h1>🎉 Success!</h1>
      <p>Your payment has been processed successfully.</p>
      <p v-if="loading">Processing your order...</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <router-link v-if="!loading" to="/" class="home-button">Go to Home</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "SuccessView",
  data() {
    return {
      loading: true,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["getCartItems", "getUserId","getUserName"]),
  },
  methods: {
    ...mapActions(["paymentDetails", "placeOrder"]),
    async completePaymentAndOrder() {
      if (this.getCartItems.length === 0) {
        this.errorMessage = "No items in cart. Redirecting...";
        setTimeout(() => this.$router.push("/"), 3000);
        return;
      }

      try {
        const paymentData = {
          userId: this.getUserId,
          name: this.getUserName, 
          amount: this.getCartItems.reduce((sum, item) => sum + item.price * item.cartQuantity *10, 0),
          paymentstring: "success",
        };
        await this.placeOrder();

        await this.paymentDetails(paymentData);
        

      } catch (error) {
        this.errorMessage = "Failed to complete payment or order. Try again.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.completePaymentAndOrder(); // ✅ Call when page loads
  },
};
</script>

<style scoped>
.success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}

.success-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  color: #22c55e;
}

p {
  margin: 10px 0;
  font-size: 1.2rem;
}

.error-message {
  color: red;
  font-weight: bold;
}

.home-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #22c55e;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.home-button:hover {
  background-color: #16a34a;
}
</style>
