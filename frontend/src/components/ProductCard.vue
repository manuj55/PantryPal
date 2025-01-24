<template>
    <div class="card shadow-lg text-center h-100">
      <div class="card-body">
        <div class="photo mb-3">
          <img
            :src="product.image"
            alt="Product Image"
            class="img-fluid rounded-circle"
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
          <button class="btn btn-success w-100">
            Add to Cart
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
    },
  };
  </script>
  
  <style scoped>

  .card {
    border-radius: 1rem;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    padding: 20px;
  }
  
  .card:hover {
    transform: scale(1.05);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }
  

  .photo img {
    width: 100%;
    max-width: 250px;
    height: auto;
    border-radius: 50%;
    object-fit: cover;
    transition: transform 0.3s ease;
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
  