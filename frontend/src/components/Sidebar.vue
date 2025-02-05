<template>
    <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
      <div class="sidebar-logo">
        <img src="@/assets/logo-ct.png" alt="FreshBasket Logo" class="logo" />
        <span v-if="!isCollapsed">FreshBasket</span>
        <button class="toggle-btn" @click="toggleSidebar">
          <font-awesome-icon :icon="isCollapsed ? 'bars' : 'times'" />
        </button>
      </div>
      <ul class="nav-links">
        <li>
          <router-link to="/dashboard" class="nav-item" active-class="active">
            <font-awesome-icon :icon="['fas', 'th-list']" />
            <span v-if="!isCollapsed">Dashboard</span>
          </router-link>
        </li>
        <li>
        <router-link to="/cart" class="nav-item" active-class="active">
          <font-awesome-icon icon="shopping-cart" />
          <span v-if="!isCollapsed">Cart</span>
        </router-link>
      </li>
      <li>
        <router-link to="/billing" class="nav-item" active-class="active">
          <font-awesome-icon :icon="['fas', 'file-invoice']" />
          <span v-if="!isCollapsed">Billing</span>
        </router-link>
      </li>
      <li>
        <router-link to="/orders" class="nav-item" active-class="active">
          <font-awesome-icon :icon="['fas', 'box-open']" />
          <span v-if="!isCollapsed">Orders</span>
        </router-link>
      </li>
      <li>
        <router-link to="/UserProfile" class="nav-item" active-class="active">
          <font-awesome-icon :icon="['fas', 'user']" />
          <span v-if="!isCollapsed">Profile</span>
        </router-link>
      </li>
      <li>
        <router-link to="/signin" class="nav-item" active-class="active" @click="logout">
          <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
          <span v-if="!isCollapsed">Logout</span>
        </router-link>
      </li>
      </ul>
     
  </div>  
   
  </template>
  
  <script>
  export default {
    name: "SidebarView",
    data() {
      return {
        isCollapsed: false, 
      };
    },
    methods: {
      toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
      },
      logout() {
      // Clear authentication details
      localStorage.removeItem("authToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      // Clear Vuex store
      this.$store.dispatch('logout');

      // Redirect to SignIn page
      this.$router.push("/signin");
    },
  },
  
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 300px; 
    height: 100vh;
    background: #eff0f1;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    transition: all 0.3s ease-in-out;
  }
  
  .sidebar.collapsed {
    width: 80px; 
  }
  
  .sidebar-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
  }
  
  .logo {
    width: 40px;
    margin-right: 10px;
  }
  
  .toggle-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
  }
  
  .nav-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .nav-item {
    display: flex;
    align-items: center;
    color: #555;
    font-size: 18px;
    padding: 15px 20px;
    border-radius: 10px;
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .nav-item:hover,
  .nav-item.router-link-exact-active {
    background: #e0f7da;
    color: #28a745;
    font-weight: bold;
  }
  
  .nav-item svg {
    margin-right: 15px;
    font-size: 20px;
  }
  
.logout-btn:hover {
  background: #c82333;
}
 
  @media (max-width: 1024px) {
    .sidebar {
      width: 250px;
    }
  }
  
  @media (max-width: 768px) {
    .sidebar {
      width: 80px;
      padding: 15px;
    }
  
    .sidebar.collapsed {
      width: 0;
    }
  
    .nav-item span {
      display: none; 
    }
  }
  
  @media (max-width: 480px) {
    .sidebar {
      left: -100%;
    }
  
    .sidebar.collapsed {
      left: 0;
    }
  }
  </style>
  