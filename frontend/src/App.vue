<template>
<<<<<<< HEAD
  <!-- <nav>
    <router-link to="/signin">SignIn</router-link> |
    <router-link to="/signup">SignUp</router-link> |
    <router-link to="/">Home</router-link> |
    <router-link to="/UserProfile">UserProfile</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view />
=======
  <div class="app-layout">
    <Sidebar />
    <div class="main-content">
      <router-view />
    </div>
  </div>
>>>>>>> main
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";

export default {
  components: {
    Sidebar,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}


.app-layout {
  display: flex;
  height: 100vh;
}


.main-content {
  flex: 1;
  padding: 20px;
  margin-left: 250px; 
  transition: margin-left 0.3s ease;
}


@media (max-width: 992px) {
  .main-content {
    margin-left: 200px; 
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column; 
  }

  .main-content {
    margin-left: 0;
    padding: 15px;
  }
}


@media (max-width: 576px) {
  .main-content {
    padding: 10px;
  }
}
</style>
