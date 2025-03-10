import { createStore } from "vuex";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default createStore({
  state: {
    userId: localStorage.getItem("userId") || null,
    name: localStorage.getItem("name"),
  
    id:[],
    products: [],
    products_admin: [],
    filteredProducts: [],
    categories: ["Dairy", "Fruits", "Vegetables", "Non-Veg"],
    itemsInCart: JSON.parse(localStorage.getItem("cartItems")) || [],
    paymentStatus:[],
    orders: [],
    orderSuccess: false,
    loading: false,
    paymentUrl: "",
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
    SET_PRODUCTS_admin(state, products) {
      state.products_admin = products.map((product) => ({
        id: product.id,
        title: product.name,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        image: `data:image/png;base64,${product.image}`,  
      }));
      state.filteredProducts = state.products_admin;
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
      localStorage.removeItem("cartItems");
    },
    SET_ORDERS(state, orders) {
      state.orders = orders; 
    },
    SET_USER_ID(state, userId) {
      state.userId = userId;
    },
    SET_NAME(state, name) {
      state.name= name;
    },

    SET_LOADING(state, status) {
      state.loading = status;
    },
    SET_ORDER_SUCCESS(state, status) {
      state.orderSuccess = status;
    },
    
    SET_Email(state, email) {
      state.email = email;
    },
    SET_UserName(state, name) {
      state.name = name;
    },

    ADD_PRODUCT(state, newProduct) {
      state.products_admin.push({
        id: newProduct.id,
        title: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        quantity: newProduct.quantity,
        category: newProduct.category,
        image: `data:image/png;base64,${newProduct.image}`,
      });
    
      state.filteredProducts = [...state.products_admin];
    },

    EDIT_PRODUCT(state, updatedProduct) {
      const index = state.products_admin.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products_admin[index] = { ...state.products_admin[index], ...updatedProduct };
        state.filteredProducts = [...state.products_admin]; // Ensure filtered list updates
      }
      },
  
      
      DELETE_PRODUCT(state, productId) {
        state.products_admin = state.products_admin.filter(product => product.id !== productId);
        state.filteredProducts = state.filteredProducts.filter(product => product.id !== productId);
      },

      SET_PAYMENT_STATUS(state, status) {
        state.paymentStatus = status;
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
    async fetchAllProducts_admin({ commit }) {
      try {
        const response = await axios.get("http://localhost:5004/api/products", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}` // Retrieve stored token
          }
        });
        console.log("API Response:", response.data); 
        commit("SET_PRODUCTS_admin", response.data);
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
    async fetchProductsByCategory_admin({ commit }, category) {
      try {
        const response = await axios.get(`http://localhost:5004/api/products/category/${category}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}` // Retrieve stored token
          }
        });
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    },

    async addProduct({ commit }, productData) {
      try {
        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("quantity", productData.quantity);
        formData.append("category", productData.category);
        formData.append("image", productData.image); // Image file
    
        const response = await axios.post("http://localhost:5004/api/products", formData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
            "Content-Type": "multipart/form-data",
          },
        });
    
        if (response.status === 201) {
          commit("ADD_PRODUCT", response.data); // Update state
        }
      } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
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
    setEmail({ commit }, email) {
      commit('SET_USER_Email', email);
    },
    setUserName({ commit }, name) {
      commit('SET_UserName', name);
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
        
        const response = await axios.post(`http://localhost:5003/orders/${this.state.userId}`, orderData, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.status === 200) {

          commit("PLACE_ORDER");
        }
      } catch (error) {
        console.error("Error placing order:", error.response?.data || error.message);
      }
    },

    async fetchOrders({ commit, state }) {
      try {
        const token = localStorage.getItem("authToken");  

        if (!token ) {
          console.error("No auth token found.");

          return;
        }
    
        const response = await axios.get(`http://localhost:5003/orders/${state.userId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        commit("SET_ORDERS", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response?.data || error.message);
      }
    },

    async processPayment({ commit }, { userId, name, amount }) {
      commit("SET_LOADING", true);
      commit("SET_ORDER_SUCCESS", false);

      try {
        const paymentData = {
          user_id: userId,
          name: name,
          amount: amount,
        };
        const token = localStorage.getItem("authToken"); 
        const response = await axios.post("http://localhost:5003/payment/", paymentData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status !== 200) {
          throw new Error(response.data.detail || "Payment failed");
        }

        console.log("Payment Success:", response.data);

        // Store payment URL and redirect
        commit("SET_PAYMENT_URL", response.data.paymentUrl);
        localStorage.setItem("cartItems", JSON.stringify(this.state.itemsInCart));
        // Redirect to the payment page
        window.location.href = response.data.paymentUrl;


      } catch (error) {
        console.error("Error placing order:", error.message);
        alert("Payment failed! Please try again.");
      }

      commit("SET_LOADING", false);
    },

    async paymentDetails({ commit }, { userId, name, amount,paymentstring}) {
      commit("SET_PAYMENT_STATUS", "processing");
      //commit("SET_PAYMENT_ERROR", null);
      const paymentData = {
        userId: userId,
        name: name,
        amount: Math.round(amount),
        paymentStatus:paymentstring,
      };

      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("User is not authenticated.");
        }

        const response = await axios.post("http://localhost:5003/payment-details/", paymentData, {
          headers: {
            Authorization: `Bearer ${token}`}
        });

        console.log("Payment Successful:", response.data);

        commit("SET_PAYMENT_STATUS", "success");
        //commit("SET_PAYMENT_RESPONSE", response.data);

        // Redirect to success page
        this.$router.push("/success");

      } catch (error) {
        //console.error("Payment Error:", error.response?.data || error.message);
        commit("SET_PAYMENT_STATUS", "failed");
        //commit("SET_PAYMENT_ERROR", error.response?.data || error.message);
      }
    },
    

    async updateProduct({ commit }, updatedProduct) {
      try {
        const response = await axios.put(
          `http://localhost:5004/api/products/${updatedProduct.id}`,
          updatedProduct,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
            }
          }
        );
        if (response.status === 200) {
          commit("EDIT_PRODUCT", response.data); // Update state
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await axios.delete(`http://localhost:5004/api/products/${productId}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        commit("DELETE_PRODUCT", productId); // Remove from state after successful deletion
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },

  },
  getters: {
    getAllProducts: (state) => state.filteredProducts,
    getCategories: (state) => state.categories,
    getCartItems: (state) => state.itemsInCart,
    getUserId: (state) => state.userId,
    getUserName: (state) => state.name,
    getCartTotal: (state) =>
      state.itemsInCart.reduce((total, item) => total + item.price * item.cartQuantity, 0),
    getEmail: (state) => state.email,
    getOrders: (state) => state.orders,
    isLoading: (state) => state.loading,
    isOrderSuccess: (state) => state.orderSuccess,
  },
});
 