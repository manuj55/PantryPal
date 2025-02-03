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
                  <button class="edit-btn" @click="openEditModal(product)">Edit</button>
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
            <option>Vegetables</option>
          </select>
  
          <div class="modal-buttons">
            <button @click="saveChanges">Save</button>
            <button class="cancel-btn" @click="modalActive = false">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from "vuex";
  
  export default {
    data() {
      return {
        searchQuery: "",
        selectedCategory: "",
        modalActive: false,
        addModalActive: false,
        newProduct: {
          name: "",
          status: "",
          price: "0",
          description: "",
          quantity: "",
          category: "",
          image: null
        },
        editForm: {
          name: "",
          status: "",
          price: "",
          description: "",
          quantity: "",
          category: ""
        }
      };
    },
    computed: {
      ...mapGetters(["getAllProducts", "getCategories"]),
      filteredProducts() {
        if (!this.getAllProducts) return [];
        return this.getAllProducts.filter(product => {
          if (!product || !product.title) return false;
          product.status = product.quantity > 0 ? "Available" : "NA";
          return product.title.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
            (!this.selectedCategory || product.category === this.selectedCategory);
        });
      }
    },
    methods: {
      ...mapActions(["fetchAllProducts_admin", "updateProduct", "deleteProduct", "addProduct"]),
      
      openAddModal() {
  this.addModalActive = true;
  this.newProduct = {
    name: "",
    status: "Available", // Default status
    price: 0,
    description: "",
    quantity: 0,
    category: "",
    image: null
  };
  console.log("Add Product Modal Opened");
},

async saveNewProduct() {
  try {
    if (this.newProduct.imageFile) {
      this.newProduct.image = await this.convertToBase64(this.newProduct.imageFile);
    }
    const response = await fetch("http://localhost:5004/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("adminToken")}` // Retrieve stored token
      },
      body: JSON.stringify(this.newProduct)
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const addedProduct = await response.json();
    console.log("Added Product:", addedProduct);
    
    this.addModalActive = false; // Close modal after successful addition
    await this.fetchAllProducts_admin(); // Refresh the product list
  } catch (error) {
    console.error("Error adding product:", error);
  }
},

      openEditModal(product) {
        this.editForm = { ...product };
        this.editForm.name = product.title;
        this.modalActive = true;
        console.log("Edit Modal Opened for:", this.editForm);
      },
  
    async saveChanges() {
      try {
        const response = await fetch(`http://localhost:5004/api/products/${this.editForm.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}` // Retrieve stored token
        },
        body: JSON.stringify(this.editForm)
        });
        if (!response.ok) {
        throw new Error('Failed to update product');
        }
        const updatedProduct = await response.json();
        console.log("Updated Product:", updatedProduct);
        this.modalActive = false;
        await this.fetchAllProducts_admin();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
    },
    async created() {
      await this.fetchAllProducts_admin();
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    height: 900px;
    max-width: 90%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
  
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

    @media (max-width: 1200px) {
  .container {
    max-width: 100%;
    padding: 15px;
  }
  .modal-content {
    width: 80%;
  }
  .table-container {
    padding: 10px;
  }
}

@media (max-width: 992px) {
  .toolbar {
    flex-direction: column;
    gap: 5px;
  }
  .search-input, .category-filter, .add-btn {
    width: 100%;
  }
  .table-container {
    overflow-x: auto;
  }
  table {
    font-size: 14px;
  }
  th, td {
    padding: 8px;
  }
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    padding: 15px;
  }
  .modal-buttons {
    flex-direction: column;
  }
  .modal-buttons button {
    width: 100%;
    margin-top: 10px;
  }
  .action-buttons {
    flex-direction: column;
    gap: 8px;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 10px;
  }
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-input, .category-filter, .add-btn {
    width: 100%;
    font-size: 14px;
  }
  .modal-content {
    width: 95%;
  }
  table {
    font-size: 12px;
  }
  th, td {
    padding: 5px;
  }
  .action-buttons {
    flex-direction: column;
    gap: 5px;
  }
}

    </style>