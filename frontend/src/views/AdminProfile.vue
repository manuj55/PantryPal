<template>
    <div class="container">
      <!-- Toolbar -->
      <div class="toolbar">
        <input type="text" v-model="searchQuery" placeholder="Search for Product" class="search-input" @input="filterProducts" />
        <select v-model="selectedCategory" class="category-filter">
        <option value="">All Categories</option>
        <option value="Fruits">Fruits</option>
        <option value="Dairy">Dairy</option>
        <option value="Vegetables">Vegetables</option>
        </select>
        <button class="add-btn" @click="openAddModal">Add Product</button>
      </div>
  
      <!-- Product Table -->
      <div class="table-container">
        <table>
        <thead>
          <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Price</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Category</th>
          <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredProducts" :key="index">
          <td>{{ product.title }}</td>
          <td :class="{ 'available': product.status === 'Available', 'disabled': product.status === 'Disabled' }">
            {{ product.status }}
          </td>
          <td>${{ product.price.toFixed(2) }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.category }}</td>
          <td>
            <div class="action-buttons">
            <button class="edit-btn" @click="openEditModal(product.id)">Edit</button>
            <button class="delete-btn" @click="deleteProduct(product.id)">Delete</button>
            </div>
          </td>
          </tr>
          <tr v-if="filteredProducts.length === 0">
          <td colspan="8" class="empty-message">No products available</td>
          </tr>
        </tbody>
        </table>
      </div>
  
       <!-- Add Product Modal -->
    <div v-show="addModalActive" class="modal">
      <div class="modal-content">
        <h3>Add Product</h3>
        <label>Name:</label>
        <input type="text" v-model="newProduct.name" />

        <label>Status:</label>
        <select v-model="newProduct.status">
          <option value="Available">Available</option>
          <option value="Disabled">Disabled</option>
        </select>

        <label>Price:</label>
        <input type="number" v-model="newProduct.price" />

        <label>Description:</label>
        <textarea v-model="newProduct.description"></textarea>

        <label>Quantity:</label>
        <input type="number" v-model="newProduct.quantity" />

        <label>Category:</label>
        <select v-model="newProduct.category">
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Vegetables</option>
        </select>

        <label>Image:</label>
        <input type="file" @change="handleImageUpload" />

        <div class="modal-buttons">
          <button @click="saveNewProduct">Save</button>
          <button class="cancel-btn" @click="addModalActive = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>

      <!-- Edit Modal -->
      <div v-show="modalActive" class="modal">
        <div class="modal-content">
        <h3>Edit Product</h3>
        <br />
  
        <label>Name:</label>
        <input type="text" v-model="editForm.name" />
  
        <label>Status:</label>
        <select v-model="editForm.status">
          <option value="Available">Available</option>
          <option value="Disabled">Disabled</option>
        </select>
  
        <label>Stock:</label>
        <input type="number" v-model="editForm.stock" />
  
        <label>Price:</label>
        <input type="number" v-model="editForm.price" />
  
        <label>Description:</label>
        <textarea v-model="editForm.description"></textarea>
  
        <label>Quantity:</label>
        <input type="number" v-model="editForm.quantity" />
  
        <label>Category:</label>
        <select v-model="editForm.category">
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Vegitables</option>
        </select>
  
        <div class="modal-buttons">
          <button @click="updateProduct(editedProduct)">Save</button>
          <button class="cancel-btn" @click="modalActive = false">Cancel</button>
        </div>
        
        </div>
      </div>
      
    </template>
  
    <script>
  import axios from "axios";
    import { mapActions, mapGetters } from "vuex";
  
    export default {
      // name: "ProductTable",
      data() {
      return {
        searchQuery: "",
        selectedCategory: "",
        modalActive: false,
        addModalActive: false, // Ensure this is defined
        newProduct: {
        name: "",
        status: "",
        stock: "",
        price: "0",
        description:"",
        quantity: "",
        category: "",
        image: null
        },
        editForm: {
        name: "",
        status: "",
        stock: "",
        price: "",
        description: "",
        quantity: "",
        category: ""
        },

      };
      },
      computed: {
      ...mapGetters(["getAllProducts", "getCategories"]),
      
      // Filtered products based on search and category
      filteredProducts() {
        if (!this.getAllProducts) return [];
  
        return this.getAllProducts.filter((product) => {
        if (!product || !product.title) return false;
  
        product.status = product.quantity > 0 ? "Available" : "NA";
  
        const matchesSearch = product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
  
        return matchesSearch && matchesCategory;
        });
      },
  
      categories() {
        return this.getCategories || [];
      },
      },
      methods: {
      ...mapActions(["fetchAllProducts_admin", "fetchProductsByCategory_admin", "updateProduct", "deleteProduct", "addProduct"]),
  
      
    openAddModal() {
      this.addModalActive = true;
      this.newProduct = { name: "", status: "Available", price: "", description: "", quantity: "", category: "", image: null };
      console.log("clicked here");
    },

    async saveNewProduct() {
      const formData = new FormData();
      formData.append("title", this.newProduct.name);
      formData.append("status", this.newProduct.status);
      formData.append("price", this.newProduct.price);
      formData.append("description", this.newProduct.description);
      formData.append("quantity", this.newProduct.quantity);
      formData.append("category", this.newProduct.category);
      if (this.newProduct.image) {
        formData.append("image", this.newProduct.image);
      }

      try {
        const token = localStorage.getItem("adminToken");
        await axios.post("http://localhost:5004/api/products", formData, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
        this.fetchAllProducts_admin(); // Refresh products list
        this.addModalActive = false;
      } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
      }
    },
    handleImageUpload(event) {
      this.newProduct.image = event.target.files[0];
    },
  },

      filterProducts() {
        this.$store.dispatch("filterProducts", this.searchQuery);
      },
  
      handleCategoryChange() {
        if (this.selectedCategory) {
        this.fetchProductsByCategory(this.selectedCategory);
        } else {
        this.fetchAllProducts_admin();
        }
      },
  
      async deleteProduct(productId) {
      const confirmDelete = confirm("Are you sure you want to delete this product?");
      if (confirmDelete) {
        await this.$store.dispatch("deleteProduct", productId);
      }
    },
    openEditModal(product) {
      this.updateProduct = { ...product };
      this.modalActive = true;
      console.log(this.modalActive); 
    },
   async saveChanges() {
      // Simulate saving changes (you can add Vuex action if needed)
     await this.$store.dispatch("updateProduct", this.editForm)
      .then(() => {
        return fetch('http://localhost:5004/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.editForm)
        });
      })
      .then(response => response.json())
      .then(data => {
        console.log("Updated Product:", data);
        this.modalActive = false;
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
    
    },

    async created() {
    console.log("Checking stored tokens...");
    
    const ADMIN_TOKEN = process.env.VUE_APP_ADMIN_TOKEN;
  //  console.log("ADMIN_TOKEN:", ADMIN_TOKEN);
   localStorage.setItem("adminToken", ADMIN_TOKEN);
   await this.fetchAllProducts_admin();
   console.log("Products fetched:", this.getAllProducts);
  },
  };
  </script>
  
  <style scoped>
  .container {
    padding: 20px;
    max-width: 900px;
    border-radius: 30px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);   
    background-color: #f8f9fa;
  }
  .toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 20px;
  }
  .search-input, .category-filter {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .action-btn {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  .add-btn {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  .table-container {
    background: white;
    border-radius: 8px;
    padding: 15px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f1f1f1;
  }
  .empty-message {
    text-align: center;
    color: #888;
    font-style: italic;
  }
  .action-buttons {
    display: flex;
    gap: 5px;
  }
  .modal-content {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    max-width: 500px;
    margin: 50px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .modal-content h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 15px;
  }
  
  .modal-content label {
    font-weight: bold;
    margin-top: 10px;
    display: block;
  }
  
  .modal-content input,
  .modal-content select,
  .modal-content textarea {
    width: 100%;
    padding: 10px;
    margin: 8px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  .modal-content textarea {
    resize: vertical;
    height: 100px;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .modal-buttons button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .save-btn {
    background-color: #28a745;
    color: white;
  }
  
  .save-btn:hover {
    background-color: #218838;
  }
  
  .cancel-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .cancel-btn:hover {
    background-color: #c82333;
  }
  
  .modal-content input:focus,
  .modal-content select:focus,
  .modal-content textarea:focus {
    border-color: #28a745;
    outline: none;
  }
  </style>