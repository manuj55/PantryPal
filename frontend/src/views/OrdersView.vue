<template>
  <div class="orders-container">
    <h2 class="title">📦 My Orders</h2>

    <div v-if="loading" class="loading">
      <p>Loading orders...</p>
    </div>

    <div v-else-if="orders.length > 0" class="orders-list">
      <div v-for="order in orders" :key="order.orderId" class="order">
        <!-- Order Header (Collapsible) -->
        <div class="order-header" @click="toggleOrder(order.orderId)">
          <span>🛒 Order ID: {{ order.orderId }}</span>
          <span class="toggle-icon">{{ expandedOrders.includes(order.orderId) ? "▼" : "▼" }}</span>
        </div>

        <!-- Order Items (Shown only if expanded) -->
        <table v-if="expandedOrders.includes(order.orderId)" class="orders-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>{{ item.title }}</td>
              <td>${{ item.price.toFixed(2) }}</td>
              <td>{{ item.cartQuantity }}</td>
              <td>{{ item.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

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
      expandedOrders: [], // Track which orders are expanded
    };
  },
  computed: {
    ...mapGetters(["getOrders"]),
    orders() {
      return this.getOrders || [];
    },
  },
  methods: {
    ...mapActions(["fetchOrders"]),
    async loadOrders() {
      if (this.loading) return;

      this.loading = true;
      try {
        await this.fetchOrders();
        console.log("Orders fetched:", this.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
      this.loading = false;
    },
    toggleOrder(orderId) {
      if (this.expandedOrders.includes(orderId)) {
        this.expandedOrders = this.expandedOrders.filter((id) => id !== orderId);
      } else {
        this.expandedOrders.push(orderId);
      }
    },
  },
  mounted() {
    this.loadOrders();
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

/* Order Header (Collapsible) */
.order-header {
  background: #f8f9fa;
  font-weight: bold;
  padding: 14px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.order-header:hover {
  background: #28a745;
  color: white;
}

.toggle-icon {
  font-weight: bold;
}

/* Table styling similar to cart */
.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 5px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.orders-table th, .orders-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

/* Table header */
.orders-table th {
  background: #f8f9fa;
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
}

/* Alternating row colors */
.orders-table tbody tr:nth-child(even) {
  background: #f9f9f9;
}

.orders-table tbody tr:hover {
  background: #e6ffe6;
}

/* No orders found */
.no-orders {
  font-size: 1.2rem;
  color: #888;
  margin-top: 20px;
}

/* Loading state */
.loading {
  font-size: 1.2rem;
  color: #555;
}
</style>
