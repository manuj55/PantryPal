<template>
    <div class="card shadow-lg text-center h-100">
      <div class="card-body">
        <div class="photo mb-3">
          <img
            :src="product.image"
            alt="Product Image"
            class=" product-image"
          />
        </div>
        <h5 class="font-weight-bold mb-2 text-truncate">
          {{ product.name }}
        </h5>
        <p class="text-muted mb-2 text-truncate">
          {{ product.description }}
        </p>
        <h6 class="text-secondary font-weight-bold mb-3">
          ${{ product.price.toFixed(2) }}
        </h6>
        <div>
          <button 
          class="btn btn-success w-100" 
          v-if="!isInCart" 
          @click="$emit('add-to-cart', product)">
          Add to Cart
        </button>

        <button
          v-else
          class="btn btn-danger w-100"
          @click="$emit('remove-from-cart', product.id)">
          Remove from Cart
        </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductCard",
    props: {
      product: {
        type: Object,
        required: true,
      },
      isInCart: {
      type: Boolean,
      required: true,
    },
    },
  };
  </script>
  
  <style scoped>

  .product-image {
  width: 100%;
  height: 220px; 
  max-width: 200px;
  object-fit: contain; 
  display: block;
  margin: 0 auto;
  } 

  .card {
    border-radius: 1rem;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    padding: 20px;
  }
  
  .card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .photo img:hover {
    transform: scale(1.1);
  }
  
 
  .text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  

  .btn-success {
    font-weight: bold;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .btn-success:hover {
    background-color: #218838;
  }

  @media (max-width: 992px) {
    .photo img {
      max-width: 300px;
    }
  }
  
  @media (max-width: 768px) {
    .photo img {
      max-width: 250px;
    }
    
    .btn-success {
      font-size: 14px;
      padding: 8px;
    }
    
    .text-truncate {
      font-size: 14px;
    }
  }
  
  @media (max-width: 576px) {
    .photo img {
      max-width: 170px;
    }
  
    .btn-success {
      font-size: 12px;
      padding: 6px;
    }
  
    .card {
      padding: 15px;
    }
  }
  </style>
  