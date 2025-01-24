<template>
    <div class="cart-container">
      <div class="py-4 container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <div v-if="cartItems.length > 0">
            <Tables 
              :products="cartItems" 
              @increase-quantity="increaseQuantity" 
              @decrease-quantity="decreaseQuantity"  
              @remove-item="removeProduct"  
            />
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
  computed: {
    ...mapGetters(["getCartItems",]),
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
    ...mapActions(["removeFromCart","updateCartQuantity"]),
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

  
  @media (max-width: 992px) {
    .container-fluid {
      max-width: 900px;
    }
  }
  
  @media (max-width: 768px) {
    .container-fluid {
      max-width: 100%;
      padding: 15px;
    }
  
    .cart-container {
      padding: 15px;
    }
  
    .row {
      margin: 0;
    }
  }
  
  @media (max-width: 576px) {
    .container-fluid {
      padding: 10px;
    }
  
    .cart-container {
      padding: 10px;
    }
  }
  

  .table-responsive {
    overflow-x: auto;
  }
  
  .text-xs {
    font-size: 0.85rem;
  }
  
  .text-sm {
    font-size: 1rem;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  