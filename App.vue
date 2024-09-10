<template>
    <div id="app">
      <UserTable />
    </div>
  </template>
  
  <script>
  import UserTable from './dist/UserTable.vue';
  
  export default {
    name: 'App',
    components: {
      UserTable
    }
  };
  </script>
  
  <style>
  /* Add global styles if needed */
  </style>
  