<template>
    <div class="dashboard-layout">
      <div class="content">
        <div class="container-fluid py-4">
          <div class="filter-section">
            <input
              type="text"
              class="form-control search-input"
              placeholder="Search for products..."
              v-model="searchQuery"
              @input="filterProducts"
            />
            <select class="form-select category-filter"  @change="handleCategoryChange">
              <option value="">All Categories</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Vegetables">Vegetables</option>
            </select>
          </div>
  
          <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            <div v-for="(product, index) in filteredProducts" :key="index" class="col">
              <ProductCard 
              :product="product" 
              :is-in-cart="isInCart(product.id)"
              @add-to-cart="addToCart"
              @remove-from-cart="removeFromCart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ProductCard from "@/components/ProductCard.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardView",
  components: {
    ProductCard,
  },
  data() {
    return {
      searchQuery: "",
      selectedCategory: "",
    };
  },
  computed: {
    ...mapGetters(["getAllProducts","getCartItems"]),
    filteredProducts() {
      if (!this.getAllProducts) return [];
      return this.getAllProducts.filter((product) => {
        if (!product || !product.title) return false;
        return product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
  },
  methods: {
    ...mapActions(["fetchAllProducts", "fetchProductsByCategory", "addToCart","removeFromCart"]),
    filterProducts() {
      this.$store.dispatch("filterProducts", this.searchQuery);
    },
    handleCategoryChange(event) {
    const category = event.target.value;  // Get the selected category correctly
    if (category) {
      this.fetchProductsByCategory(category);
    } else {
      this.fetchAllProducts();
    }
  },
  isInCart(productId) {
      return this.getCartItems.some((item) => item.id === productId);
    },
  },
  created() {
    this.fetchAllProducts();
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
  