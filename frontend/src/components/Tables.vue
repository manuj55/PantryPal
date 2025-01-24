<template> 
    <div class="card mb-4">
      <div class="card-header pb-0">
        <h6>Cart</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Item</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Quantity</th>
                <th class="text-secondary opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td>
                  <div class="d-flex align-items-center">
                    <img :src="product.photo" class="avatar me-3" :alt="product.name" />
                    <div class="product-name">
                      <h6 class="mb-0 text-sm">{{ product.name }}</h6>
                    </div>
                  </div>
                </td>
                <td class="price-column">
                  <p class="text-xs font-weight-bold mb-0">${{ product.price.toFixed(2) }}</p>
                </td>
                <td>
                  <div class="d-flex align-items-center justify-content-center">
                    <button class="quantity-btn">-</button>
                    <p class="text-xs font-weight-bold mb-0 text-center mx-2">{{ product.quantity }}</p>
                    <button class="quantity-btn">+</button>
                  </div>
                </td>
                <td class="align-middle text-center">
                  <button class="remove-btn">
                    <font-awesome-icon icon="trash-alt" />
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="2" class="text-end total-label">Total:</td>
                <td class="text-center total-amount">$99.99</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "TablesView",
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card-header {
  background: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
}

h6 {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 15px;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  white-space: nowrap;
}

th {
  background: #f8f9fa;
  font-weight: bold;
  text-transform: uppercase;
  border-bottom: 2px solid #ddd;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #ddd;
}

.quantity-btn {
  background-color: #28a745;
  border: none;
  color: #fff;
  font-size: 1rem;
  padding: 5px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}

.quantity-btn:hover {
  background-color: #218838;
}

.remove-btn {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.remove-btn:hover {
  color: #b02a37;
}

.table-responsive {
  overflow-x: auto;
}

/* Total Row Styling */
.total-row {
  font-weight: bold;
  background-color: #f8f9fa;
  border-top: 2px solid #ddd;
}

.total-label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  padding-right: 20px;
}

.total-amount {
  font-size: 1rem;
  font-weight: bold;
  color: #28a745;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .product-name {
    display: none !important;
  }

  .avatar {
    width: 40px;
    height: 40px;
  }

  th, td {
    font-size: 0.85rem;
    padding: 10px;
  }

  .remove-btn {
    font-size: 1rem;
  }

  .quantity-btn {
    font-size: 0.9rem;
    padding: 4px 8px;
  }

  .price-column {
    display: none;
  }

  .total-label, .total-amount {
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  th, td {
    font-size: 0.75rem;
    padding: 10px;
  }

  .avatar {
    width: 35px;
    height: 35px;
  }

  h6 {
    font-size: 0.85rem;
  }

  .remove-btn {
    font-size: 0.9rem;
  }

  .quantity-btn {
    font-size: 0.8rem;
    padding: 3px 6px;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .total-label, .total-amount {
    font-size: 0.8rem;
  }
}
</style>
