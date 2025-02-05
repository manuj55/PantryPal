<template>
  <div class="failure-container">
    <div class="failure-card">
      <h1>❌ Payment Failed</h1>
      <p>Unfortunately, your payment could not be processed.</p>
      <p v-if="loading">Retrying payment...</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <router-link v-if="!loading" to="/dashboard" class="retry-button">Try Again</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FailureView",
  data() {
    return {
      loading: true,
      errorMessage: "",
    };
  },
  computed: {
    ...mapGetters(["getCartItems", "getUserId", "getUserName"]),
  },
  methods: {
    ...mapActions(["paymentDetails"]),
    async handleFailedPayment() {
      if (this.getCartItems.length === 0) {
        this.errorMessage = "No items in cart. Redirecting...";
        setTimeout(() => this.$router.push("/dashboard"), 3000);
        return;
      }

      try {
        const paymentData = {
          userId: this.getUserId,
          name: this.getUserName,
          amount: this.getCartItems.reduce((sum, item) => sum + item.price * item.cartQuantity * 10, 0),
          paymentstring: "failure",
        };

        await this.paymentDetails(paymentData);
      } catch (error) {
        this.errorMessage = "Failed to process failure status. Try again.";
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.handleFailedPayment(); 
  },
};
</script>

<style scoped>
.failure-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8d7da;
}

.failure-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: 2px solid #dc3545;
}

h1 {
  color: #dc3545;
}

p {
  margin: 10px 0;
  font-size: 1.2rem;
}

.error-message {
  color: red;
  font-weight: bold;
}

.retry-button {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.retry-button:hover {
  background-color: #c82333;
}
</style>
