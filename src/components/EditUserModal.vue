<!-- EditUserModal.vue -->
<template>
    <div v-if="visible" class="modal-overlay">
      <div class="modal-content">
        <h2>Edit User</h2>
        <form @submit.prevent="saveChanges">
          <label for="name">Time:</label>
          <input v-model="localUser.time" id="time" type="text" />
  
          <label for="size">Size:</label>
          <input v-model="localUser.size" id="size" type="number" />
  
          <!-- Add more fields as needed -->
  
          <button type="submit">Save</button>
          <button type="button" @click="close">Cancel</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        localUser: { ...this.user } // Create a local copy of the user
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      saveChanges() {
        this.$emit('save', this.localUser); // Emit the localUser data
        this.close();
      }
    },
    watch: {
      user(newUser) {
        this.localUser = { ...newUser }; // Update local copy if the prop changes
      }
    }
  };
  </script>
  
  <style scoped>
  /* Your modal styles here */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    width: 400px;
  }
  </style>
  