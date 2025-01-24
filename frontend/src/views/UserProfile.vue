<template>
    <div class="container">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="logo">
          <img src="@/assets/logo.png" alt="FreshBasket">
          <span>Groyo</span>
        </div>
        <nav>
          <ul>
            <li 
              v-for="(item, index) in menuItems" 
              :key="index" 
              :class="{ active: activeItem === index }" 
              @click="setActive(index)"
            >
              <i :class="item.icon"></i> {{ item.name }}
            </li>
          </ul>
        </nav>
      </aside>
  
      <!-- Main Content -->
      <main class="content">
        <div class="header">
          <img src="" class="header-image" alt="Header">
          <h1>{{ menuItems[activeItem].name }}</h1>
        </div>
  
        <div class="profile-card">
          <div class="profile-info">
            <img src="@/assets/logo.png" class="profile-pic" alt="User">
            <div>
              <h2>Peter</h2>
              <p>End User</p>
            </div>
          </div>
        </div>
  
        <div class="details-card">
          <h3>Profile Information</h3>
          <button @click="toggleEditMode" class="edit-btn">
            {{ isEditing ? 'Save' : 'Edit' }}
          </button>
          <p v-if="!isEditing">{{ profileInfo }}</p>
          <textarea v-else v-model="profileInfo"></textarea>
          
          <ul>
            <li><strong>Full Name:</strong> 
              <span v-if="!isEditing">{{ profile.fullName }}</span>
              <input v-else v-model="profile.fullName">
            </li>
            <li><strong>Mobile:</strong> 
              <span v-if="!isEditing">{{ profile.mobile }}</span>
              <input v-else v-model="profile.mobile">
            </li>
            <li><strong>Email:</strong> 
              <span v-if="!isEditing">{{ profile.email }}</span>
              <input v-else v-model="profile.email">
            </li>
            <li><strong>Location:</strong> 
              <span v-if="!isEditing">{{ profile.location }}</span>
              <input v-else v-model="profile.location">
            </li>
          </ul>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserProfile",
    data() {
      return {
        activeItem: 0,  // Default active menu item (Profile)
        isEditing: false, // Track edit mode
        profileInfo: "Hi, I’m Peter. Decisions: If you can’t decide, the answer is no...",
        profile: {
          fullName: "Peter Dillinger",
          mobile: "(44) 123 1234 123",
          email: "Peter-Dillinger@mail.com",
          location: "Germany"
        },
        menuItems: [
          { name: "Profile", icon: "fas fa-user" },
          { name: "Dashboard", icon: "fas fa-chart-bar" },
          { name: "Cart", icon: "fas fa-shopping-cart" },
          { name: "Billing", icon: "fas fa-file-invoice" },
          { name: "Sign In", icon: "fas fa-sign-in-alt" },
          { name: "Sign Up", icon: "fas fa-user-plus" }
        ],
      };
    },
    methods: {
      setActive(index) {
        this.activeItem = index;
      },
      toggleEditMode() {
        this.isEditing = !this.isEditing;
      }
    },
  };
  </script>
  
  <style scoped>
  /* Layout styles */
  .container {
    display: flex;
    height: 100vh;
  }
  
  /* Sidebar */
  .sidebar {
    width: 250px;
    background: #f4f4f4;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar .logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
  
  .sidebar .logo img {
    width: 30px;
    margin-right: 10px;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar li {
    padding: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.3s ease;
  }
  
  .sidebar li:hover {
    background: #e2e8f0;
    border-radius: 5px;
  }
  
  .sidebar li.active {
    background: #34d399;  /* Tailwind green-400 */
    color: white;
    border-radius: 5px;
  }
  
  .sidebar i {
    margin-right: 10px;
  }
  
  /* Main Content */
  .content {
    flex: 1;
    padding: 20px;
    background: #f9f9f9;
  }
  
  /* Header */
  .header {
    position: relative;
    width: 100%;
  }
  
  .header-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
  }
  
  .header h1 {
    position: absolute;
    top: 20px;
    left: 30px;
    color: white;
    font-size: 28px;
    font-weight: bold;
  }
  
  /* Profile Card */
  .profile-card {
    display: flex;
    align-items: center;
    background: white;
    padding: 20px;
    margin-top: -50px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .profile-pic {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
  }
  
  /* Details Card */
  .details-card {
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .details-card h3 {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
  }
  
  .edit-btn {
    float: right;
    background: #34d399;
    border: none;
    color: white;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .edit-btn:hover {
    background: #059669;
  }
  
  .details-card ul {
    list-style: none;
    padding: 0;
  }
  
  .details-card li {
    margin: 10px 0;
  }
  
  .details-card input, 
  .details-card textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  
  .details-card i {
    margin-right: 10px;
    font-size: 18px;
  }
  </style>
  