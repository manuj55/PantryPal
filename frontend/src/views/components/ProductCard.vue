<template>
    <div class="card shadow-lg text-center h-100 ">
      <div class="card-body  ">
        <div class="photo mb-3 ">
          <img
            :src="product.photo"
            alt="Product Image"
            class="img-fluid rounded-circle "
            style="max-width: 250px; height: 250px;"
          />
        </div>
        <h5 class="font-weight-bold mb-2">{{ product.name }}</h5>
        <h6 class="text-secondary font-weight-bold mb-3">${{ product.price.toFixed(2) }}</h6>
        <div>
          <!-- Decrease Button -->
          <SoftButton
            variant="fill"
            color="success"
            size="sm"
            :disabled="product.quantity <= 1"
            class="mx-1"
            @click.stop="decreaseQuantity"
          >
            -
          </SoftButton>
          <span class="font-weight-bold mx-2">{{ product.quantity }}</span>
          <!-- Increase Button -->
          <SoftButton
            variant="fill"
            color="success"
            size="sm"
            class="mx-1"
            @click.stop="increaseQuantity"
          >
            +
          </SoftButton>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SoftButton from "@/components/SoftButton.vue";
  
  export default {
    name: "ProductCard",
    components: {
      SoftButton,
    },
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      decreaseQuantity() {
        if (this.product.quantity > 1) {
          const newQuantity = this.product.quantity - 1;
          console.log("Decrease clicked", newQuantity);
          this.$emit("update-quantity", newQuantity); // Emit new quantity
        }
      },
      increaseQuantity() {
        const newQuantity = this.product.quantity + 1;
        console.log("Increase clicked", newQuantity);
        this.$emit("update-quantity", newQuantity); // Emit new quantity
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    border-radius: 1rem;
    transition: transform 0.2s ease-in-out;
  }
  .card:hover {
    transform: scale(1.05);
  }
  </style>
  