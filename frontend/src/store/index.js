import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    name: [],
    products: [],
    filteredProducts: [],
    categories: ["Dairy", "Fruits", "Vegetables", "Non-Veg"],
    itemsInCart: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products.map((product) => ({
        id: product.id,
        title: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        image: `data:image/png;base64,${product.image}`,  
      }));
      state.filteredProducts = state.products;
    },
    SET_FILTERED_PRODUCTS(state, products) {
      state.filteredProducts = products;
    },
    ADD_TO_CART(state, product) {
      const existingProduct = state.itemsInCart.find((item) => item.id === product.id);
      if (!existingProduct) {
        state.itemsInCart.push({ ...product, cartQuantity: 1 });
      } else {
        existingProduct.cartQuantity++;
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.itemsInCart = state.itemsInCart.filter((item) => item.id !== productId);
    },
    UPDATE_CART_QUANTITY(state, { id, quantity }) {
      const product = state.itemsInCart.find((item) => item.id === id);
      if (product) {
        product.cartQuantity = quantity;
        state.itemsInCart = [...state.itemsInCart];  // Force reactivity
      }
    },
  },
  actions: {
    async fetchAllProducts({ commit }) {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchProductsByCategory({ commit }, category) {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/category/${category}`);
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    },
    addToCart({ commit }, product) {
      commit("ADD_TO_CART", product);
    },
    removeFromCart({ commit }, productId) {
      commit("REMOVE_FROM_CART", productId);
    },
    updateCartQuantity({ commit }, payload) {
      if (payload.quantity < 1) {
        commit("REMOVE_FROM_CART", payload.id);
      } else {
        commit("UPDATE_CART_QUANTITY", payload);
      }
    },
  },
  getters: {
    getAllProducts: (state) => state.filteredProducts,
    getCategories: (state) => state.categories,
    getCartItems: (state) => state.itemsInCart,
    getCartTotal: (state) =>
      state.itemsInCart.reduce((total, item) => total + item.price * item.cartQuantity, 0),
  },
});
