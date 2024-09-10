<template>
    <div class="container">
      <h1>User Management</h1>
      <table class="user-table">
        <thead>
          <tr>
            <th>Total Bill</th>
            <th>Tip</th>
            <th>Sex</th>
            <th>Smoker</th>
            <th>Day</th>
            <th>Time</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user  in users" :key="user._id">
            <td>{{ user.total_bill }}</td>
            <td>{{ user.tip }}</td>
            <td>{{ user.sex }}</td>
            <td>{{ user.smoker ? 'Yes' : 'No' }}</td>
            <td>{{ user.day }}</td>
            <td>{{ user.time }}</td>
            <td>{{ user.size }}</td>
            <td>
              <button @click="editUser(user)" class="btn edit-btn">Edit</button>
              <button @click="removeUser(user._id)" class="btn remove-btn">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: [], // Empty array to store users from the API
      };
    },
    mounted() {
      this.getUsers(); // Fetch users when the component is mounted
    },
    methods: {
      // Fetch users from the backend
      getUsers() {
        axios
          .get('http://localhost:3001/getUsers')
          .then(response => {
            this.users = response.data; // Store users in the data property
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      },
      // Edit user functionality (placeholder for now)
      editUser(user) {
        // Handle edit functionality (e.g., open a modal with user details for editing)
        alert(`Edit user: ${user._id}`);
      },
      // Remove user from the backend
      removeUser(userId) {
        axios
          .delete(`http://localhost:3001/deleteUser/${userId}`)
          .then(response => {
            this.users = this.users.filter(user => user._id !== userId); // Remove user from local list
          })
          .catch(error => {
            console.error('Error removing user:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    font-family: 'Arial', sans-serif;
    font-weight: 300;
    color: #333;
  }
  
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .user-table th, .user-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  .user-table th {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .btn {
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    border: none;
  }
  
  .edit-btn {
    background-color: #007aff;
    color: white;
    margin-right: 5px;
  }
  
  .remove-btn {
    background-color: #ff3b30;
    color: white;
  }
  
  .edit-btn:hover, .remove-btn:hover {
    opacity: 0.9;
  }
  </style>
  