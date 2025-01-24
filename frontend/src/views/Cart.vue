<template>
    <div class="cart-container">
      <div class="py-4 container-fluid">
        <div class="row justify-content-center">
          <div class="col-12">
            <Tables :products="products" @remove-item="removeProduct" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Tables from "@/components/Tables.vue";
  
  export default {
    name: "CartView",
    components: {
      Tables,
    },
    data() {
      return {
        products: [
          { photo: require('@/assets/big-mac.png'), name: "Big Mac", price: 5.99, quantity: 1 },
          { photo: require('@/assets/mc-chicken.png'), name: "Mc Chicken", price: 4.99, quantity: 1 },
          { photo: require('@/assets/double-cb.png'), name: "Double Cheese Burger", price: 2.99, quantity: 1 },
          { photo: require('@/assets/fries.png'), name: "Fries", price: 2.99, quantity: 1 },
          { photo: require('@/assets/nuggets.png'), name: "Mc Nuggets", price: 3.49, quantity: 1 },
          { photo: require('@/assets/salad.png'), name: "Salad", price: 2.79, quantity: 1 },
          { photo: require('@/assets/cola.png'), name: "Coke", price: 1.99, quantity: 1 },
          { photo: require('@/assets/lipton.png'), name: "Ice Tea", price: 1.99, quantity: 1 },
          { photo: require('@/assets/water.png'), name: "Water", price: 1.49, quantity: 1 },
        ],
      };
    },
    methods: {
      removeProduct(index) {
        this.products.splice(index, 1);
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
  