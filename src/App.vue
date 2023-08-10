<template>
  <div class="app-container">
    <navbar />
    <router-view class="container mx-auto p-4" />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style scoped>
html {
  overflow-y: scroll;
}

.app-container {
  background-color: #fff;
  color: #555;
  min-height: 100vh;
  max-width: 100%;
  min-width: 60%;
}

@media (prefers-color-scheme: dark) {
  .app-container {
    background-color: #111;
    color: #fff;
  }
}
</style>