<template>
  <div class="flex justify-center items-top bg-gray-50 mt-16">
    <div class="container mx-auto p-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        {{ title }}
      </h1>
      <p class="text-gray-600 mb-4 text-lg">
        {{ description }}
      </p>
      <p class="text-gray-600 mb-4 text-lg">
        {{ team }}
      </p>
    </div>
  </div>
</template>

<script setup>
const title = 'About Page';
const description = 'This is the best movie application in the world!';
const team = 'Developed by Ims Storm van Leeuwen';
</script>
