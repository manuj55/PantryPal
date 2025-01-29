<template>
  <div class="app-layout">
    <Sidebar v-if="showSidebar" />
    <div class="main-content" :class="{ 'full-width': !showSidebar }">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  components: {
    Sidebar,
  },
  setup() {
    const route = useRoute();

    // Hide sidebar for SignIn and SignUp routes
    const showSidebar = computed(() => !["/signin", "/signup"].includes(route.path));

    return { showSidebar };
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

/* Adjust when Sidebar is hidden */
.full-width {
  margin-left: 0 !important;
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
