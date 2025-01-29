<!-- <template>
    <div class="orders-container">
      <h2 class="title"> List of products</h2>
 
 
      <div v-if="loading" class="loading">
        <p>Loading orders...</p>
      </div>
 
      <table v-else-if="orders.length > 0" class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.title }}</td>
            <td>${{ order.price.toFixed(2) }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.category }}</td>
          </tr>
        </tbody>
      </table>
 
 
      <p v-else class="no-orders">No orders found.</p>
    </div>
  </template>
 
  <script>
  import { mapGetters, mapActions } from "vuex";
 
  export default {
    name: "OrdersView",
    data() {
      return {
        loading: false,
      };
    },
    computed: {
      ...mapGetters(["getOrders"]),
      orders() {
        return this.getOrders;
      },
    },
    methods: {
      ...mapActions(["fetchOrders"]),
      async loadOrders() {
        this.loading = true;
        await this.fetchOrders();
        this.loading = false;
      },
    },
    mounted() {
      this.loadOrders();
      setInterval(this.loadOrders, 10000);
    },
  };
  </script>
 
  <style scoped>
  .orders-container {
    padding: 20px;
    max-width: 900px;
    margin: 0 auto;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
 
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
  }
 
  .orders-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
 
  .orders-table th, .orders-table td {
    padding: 12px;
    border: 1px solid #ddd;
  }
 
  .orders-table th {
    background: #28a745;
    color: white;
  }
 
  .orders-table tbody tr:nth-child(even) {
    background: #f9f9f9;
  }
 
  .orders-table tbody tr:hover {
    background: #e6ffe6;
  }
 
  .no-orders {
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
  }
 
  .loading {
    font-size: 1.2rem;
    color: #555;
  }
  </style>
  -->

  <template>
    <div class="flex h-screen bg-gray-100">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-900 text-white flex flex-col">
        <div class="p-4 text-xl font-bold">iCompseller</div>
        <nav class="flex-1">
          <ul>
            <!-- <li class="sidebar-item"><a href="#">Onboarding</a></li>
            <li class="sidebar-item"><a href="#">Dashboard</a></li> -->
            <li class="sidebar-item"><a href="#">Orders</a></li>
            <li class="sidebar-item active"><a href="#">Products</a></li>
            <!-- <li class="sidebar-item"><a href="#">Customers</a></li>
            <li class="sidebar-item"><a href="#">Promotions</a></li>
            <li class="sidebar-item"><a href="#">Pages</a></li>
            <li class="sidebar-item"><a href="#">Languages</a></li>
            <li class="sidebar-item"><a href="#">Themes</a></li>
            <li class="sidebar-item"><a href="#">Apps</a></li>
            <li class="sidebar-item"><a href="#">Settings</a></li> -->
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <div class="flex-1 p-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-semibold">Products</h1>
          <div>
            <button class="btn btn-primary">Add Product</button>
          </div>
        </div>
  
        <!-- Search and Filters -->
        <div class="bg-white p-4 rounded shadow mb-4 flex gap-4">
          <input type="text" placeholder="Search for Product" class="input-field" />
          <select class="input-field">
            <option>All Categories</option>
          </select>
          <select class="input-field">
            <option>All Products</option>
          </select>
          <button class="text-blue-500">Clear Filters</button>
        </div>
  
        <!-- Product Table -->
        <div class="bg-white rounded shadow overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="table-header">
                <th class="p-3"><input type="checkbox" /></th>
                <th class="p-3">Name</th>
                <th class="p-3">Status</th>
                <th class="p-3">Stock</th>
                <th class="p-3">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="table-row">
                <td class="p-3"><input type="checkbox" /></td>
                <td class="p-3 flex items-center">
                  <img :src="product.image" alt="Product" class="product-image" />
                  {{ product.name }}
                </td>
                <td class="p-3">
                  <span :class="getStatusClass(product.status)">
                    ● {{ product.status }}
                  </span>
                </td>
                <td class="p-3">{{ product.stock }}</td>
                <td class="p-3">${{ product.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [
          {
            id: 1,
            name: "RAVENOL CVT Fluid 1 LT",
            status: "Disabled",
            stock: 12,
            price: "8,000.00",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 2,
            name: "RAVENOL Longlife LSG SAE 5W-30 5 LTS",
            status: "Available",
            stock: 5,
            price: "33,000.00",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 3,
            name: "RAVENOL VMP SAE 5W-30 1 LTS",
            status: "Available",
            stock: 15,
            price: "7,500.00",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 4,
            name: "RAVENOL Formel Super SAE 15W-40 4 LTS",
            status: "Available",
            stock: 12,
            price: "8,000.00",
            image: "https://via.placeholder.com/40"
          },
          {
            id: 5,
            name: "RAVENOL VMP SAE 5W-30 208 LTS",
            status: "Available",
            stock: 0,
            price: "150,000.00",
            image: "https://via.placeholder.com/40"
          }
        ]
      };
    },
    methods: {
      getStatusClass(status) {
        return status === "Available" ? "text-green-500" : "text-red-500";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Sidebar Styles */
  .sidebar-item {
    padding: 12px;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .sidebar-item:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .sidebar-item.active {
    font-weight: bold;
    border-left: 4px solid yellow;
    background: rgba(255, 255, 255, 0.1);
  }
  
  /* Button Styles */
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
  }
  
  .btn-primary {
    background: #28a745;
    color: white;
  }
  
  .btn-primary:hover {
    background: #218838;
  }
  
  .btn-secondary {
    background: #f3f3f3;
    color: black;
  }
  
  .btn-secondary:hover {
    background: #e0e0e0;
  }
  
  /* Input Field */
  .input-field {
    border: 1px solid #ddd;
    padding: 8px;
    border-radius: 4px;
    flex: 1;
  }
  
  /* Table Styles */
  .table-header {
    background: #f8f8f8;
    font-weight: bold;
  }
  
  .table-row {
    border-top: 1px solid #ddd;
    transition: background 0.3s;
  }
  
  .table-row:hover {
    background: #f9f9f9;
  }
  
  /* Product Image */
  .product-image {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  </style>
  