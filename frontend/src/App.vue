<script setup>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navigation -->
    <NavBar />

    <!-- Dynamic Route Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style scoped></style>
