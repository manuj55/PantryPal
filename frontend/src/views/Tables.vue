<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-12">
        <authors-table :products="products" @remove-item="removeProduct" />
      </div>
    </div>
  </div>
</template>

<script>
import AuthorsTable from "./components/AuthorsTable";

export default {
  name: "Tables",
  components: {
    AuthorsTable,
  },
  data() {
    return {
      products: [
        { photo: require('@/assets/img/dashboard/big-mac.png'), name: "Big Mac", price: 5.99, quantity: 1 },
        { photo: require('@/assets/img/dashboard/mc-chicken.png'), name: "Mc Chicken", price: 4.99, quantity: 1 },
        { photo: require('@/assets/img/dashboard/double-cb.png'), name: "Double Cheese Burger", price: 2.99, quantity: 1 },
        { photo: require('@/assets/img/dashboard/fries.png'), name: "Fries", price: 2.99, quantity: 1 },
        { photo: require('@/assets/img/dashboard/nuggets.png'), name: "Mc Nuggets", price: 3.49, quantity: 1 },
        { photo: require('@/assets/img/dashboard/salad.png'), name: "Salad", price: 2.79, quantity: 1 },
        { photo: require('@/assets/img/dashboard/cola.png'), name: "Coke", price: 1.99, quantity: 1 },
        { photo: require('@/assets/img/dashboard/lipton.png'), name: "Ice Tea", price: 1.99, quantity: 1 },
        { photo: require('@/assets/img/dashboard/water.png'), name: "Water", price: 1.49, quantity: 1 },
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
