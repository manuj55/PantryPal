<template>
  <div class="cart-container">
    <div class="py-4 container-fluid">
      <div class="row justify-content-center">
        <div class="col-12">
          <div v-if="cartItems.length > 0">

            <!-- Success message -->
            <div v-if="orderSuccess" class="alert alert-success text-center">
              🎉 Your order has been placed successfully!
            </div>

            <!-- Loading Spinner -->
            <div v-if="loading" class="loading-overlay">
              <div class="spinner"></div>
              <p>Placing your order...</p>
            </div>

            <Tables 
              :products="cartItems" 
              @increase-quantity="increaseQuantity" 
              @decrease-quantity="decreaseQuantity"  
              @remove-item="removeProduct"  
            />

            <div class="text-center mt-4">
              <button class="buy-now-btn" @click="buyNow" :disabled="loading">Buy Now</button>
            </div>
          </div>
          <div v-else class="no-items">
            <p>No Items have been Added</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tables from "@/components/Tables.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartView",
  components: {
    Tables,
  },
  data() {
    return {
      loading: false,
      orderSuccess: false,
    };
  },
  computed: {
    ...mapGetters(["getCartItems"]),
    cartItems() {
      return this.getCartItems.map((item) => ({
        id: item.id,
        photo: item.image,
        name: item.title,
        price: item.price,
        quantity: item.cartQuantity,
      }));
    },
  },
  methods: {
    ...mapActions(["removeFromCart", "updateCartQuantity", "placeOrder"]),
    removeProduct(index) {
      const product = this.cartItems[index];
      this.removeFromCart(product.id);
    },
    increaseQuantity(index) {
      const product = this.cartItems[index];
      this.updateCartQuantity({ id: product.id, quantity: product.quantity + 1 });
    },
    decreaseQuantity(index) {
      const product = this.cartItems[index];
      if (product.quantity > 1) {
        this.updateCartQuantity({ id: product.id, quantity: product.quantity - 1 });
      }
    },
    async buyNow() {
      this.loading = true;
      this.orderSuccess = false;

      try {
        await this.placeOrder();
        this.orderSuccess = true;
      } catch (error) {
        console.error("Error placing order:", error);
      }

      this.loading = false;
    },
  },
};
</script>

<style scoped>
.cart-container {
  padding: 20px;
  background-color: #f9f9f9;
}
.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.no-items {
  text-align: center;
  font-size: 1.5rem;
  color: #888;
  font-weight: bold;
  padding: 50px 0;
}

/* Buy Now Button */
.buy-now-btn {
  display: inline-block;
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: white;
  background-color: #28a745; /* Green background */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.buy-now-btn:hover {
  background-color: #218838; /* Darker green on hover */
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.buy-now-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

/* Loading Spinner */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 999;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #28a745;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
