<template>
    <div class="dashboard-layout">
      <div class="content">
        <div class="container-fluid py-4">
          <div class="filter-section">
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search for products..."
            />
            <select class="form-select category-filter">
              <option value="">All Categories</option>
              <option value="burgers">Burgers</option>
              <option value="sides">Sides</option>
              <option value="beverages">Beverages</option>
            </select>
          </div>
  
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div v-for="(product, index) in products" :key="index" class="col">
              <ProductCard :product="product" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProductCard from "@/components/ProductCard.vue";
  
  export default {
    name: "DashboardView",
    components: {
      ProductCard,
    },
    data() {
      return {
        products: [
          {
            image: new URL('@/assets/big-mac.png', import.meta.url).href,
            name: "Big Mac",
            description: "A delicious burger with special sauce.",
            price: 5.99,
            quantity: 1,
          },
          {
            image: new URL('@/assets/mc-chicken.png', import.meta.url).href,
            name: "Mc Chicken",
            description: "Crispy chicken patty with lettuce and mayo.",
            price: 4.99,
            quantity: 1,
          },
          {
            image: new URL('@/assets/double-cb.png', import.meta.url).href,
            name: "Double Cheese Burger",
            description: "Two beef patties with cheese.",
            price: 2.99,
            quantity: 1,
          },
          {
            image: new URL('@/assets/fries.png', import.meta.url).href,
            name: "Fries",
            description: "Golden crispy fries.",
            price: 2.99,
            quantity: 1,
          },
          {
            image: new URL('@/assets/lipton.png', import.meta.url).href,
            name: "Ice Tea",
            description: "Refreshing Lipton Ice Tea.",
            price: 1.99,
            quantity: 1,
          },
          {
            image: new URL('@/assets/cola.png', import.meta.url).href,
            name: "Coke",
            description: "Refreshing Coca-Cola.",
            price: 1.49,
            quantity: 1,
          },
        ],
      };
    },
  };
  </script>
  
  <style scoped>

  .dashboard-layout {
    display: flex;
  }
  

  .content {
    padding: 20px;
    width: 100%;
  }

  .container-fluid {
    max-width: 1400px;
    margin-left: auto;
    margin-right: auto;
  }
  

  .row {
    justify-content: center;
  }
  
  .g-4 {
    gap: 1.5rem;
  }
  

.filter-section {
  display: flex;
  justify-content: center; 
  align-items: center;
  flex-wrap: wrap;
  gap: 20px; 
  margin-bottom: 40px; 
}

.search-input {
  flex: 1;
  max-width: 600px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.category-filter {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
  

  .search-input:focus,
  .category-filter:focus {
    outline: none;
    border-color: #28a745;
    box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
  }
  

  @media (max-width: 1200px) {
    .container-fluid {
      max-width: 1000px;
    }
    .category-filter {
      width: 250px;
    }
  }
  
  @media (max-width: 992px) {
    .row-cols-md-3 {
      grid-template-columns: repeat(2, 1fr);
    }
    .search-input {
      max-width: 400px;
    }
  }
  
  @media (max-width: 768px) {
    .row-cols-md-3 {
      grid-template-columns: repeat(1, 1fr);
    }
    .filter-section {
      flex-direction: column;
      align-items: stretch;
    }
    .search-input,
    .category-filter {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .content {
      padding: 10px;
    }
    .row-cols-sm-2 {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  </style>
  