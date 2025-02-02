import { createStore } from "vuex";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    userId: null,
    name: [],
    products: [],
    filteredProducts: [],
    categories: ["Dairy", "Fruits", "Vegetables", "Non-Veg"],
    itemsInCart: [],
    orders: [],
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
        state.itemsInCart = [...state.itemsInCart]; 
      }
    },
    PLACE_ORDER(state) {
      state.itemsInCart = []; 
    },
    SET_ORDERS(state, orders) {
      state.orders = orders; 
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },

  },
  actions: {
    async fetchAllProducts({ commit }) {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        const response = await axios.get("http://localhost:5004/api/products", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the headers
          },
        });
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchProductsByCategory({ commit }, category) {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve token from local storage
        const response = await axios.get(`http://localhost:5004/api/products/category/${category}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in the headers
          },
        });
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
    setUserId({ commit }, userId) {
      commit('SET_USER_ID', userId);
    },
    async placeOrder({ commit, state }) {
      if (state.itemsInCart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
    
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("User is not logged in.");
          return;
        }
    
        const orderData = {
          orderId: uuidv4(), 
          userId: state.userId, 
          items: state.itemsInCart.map(({...rest }) => ({
            ...rest,
            price: parseFloat(rest.price),
            cartQuantity: parseInt(rest.cartQuantity)
          })),
        };
    
        console.log("Sending Order Data:", orderData);
    
        const response = await axios.post("http://localhost:5003/orders/", orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.status === 200) {
          commit("PLACE_ORDER");
          alert("Order placed successfully!");
        }
      } catch (error) {
        console.error("Error placing order:", error.response?.data || error.message);
      }
    },

    async fetchOrders({ commit, state }) {
      try {
        const token = localStorage.getItem("authToken");  
        if (!token || !state.userId) {
          console.error("Authentication token or userId is missing.");
          return;
        }
    
        const response = await axios.get(`http://localhost:5003/orders/${state.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        commit("SET_ORDERS", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    }
    
  },
  getters: {
    getAllProducts: (state) => state.filteredProducts,
    getCategories: (state) => state.categories,
    getCartItems: (state) => state.itemsInCart,
    getUserId: (state) => state.userId,
    getCartTotal: (state) =>
      state.itemsInCart.reduce((total, item) => total + item.price * item.cartQuantity, 0),
    getOrders: (state) => state.orders,
  },
});
 