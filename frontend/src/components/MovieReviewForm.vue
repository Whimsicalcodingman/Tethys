<template>
    <div v-if="isAuthenticated" class="mt-3">
      <form @submit.prevent="submitReview" class="mt-4">
        <div class="mb-4">
          <input
            v-model="userName"
            type="text"
            placeholder="Your Name (e.g., John Doe)"
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            required
          />
        </div>
        <div class="mb-4">
          <textarea
            v-model="reviewContent"
            placeholder="Write your review here..."
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useStore } from 'vuex';
  import MovieService from '../services/MovieService';
  
  const userName = ref(''); // Name field
  const reviewContent = ref(''); // Review content field
  const route = useRoute();
  const store = useStore();
  
  const isAuthenticated = store.getters.isAuthenticated; // Check if user is logged in
  
  const submitReview = async () => {
    try {
      const movieId = route.params.id; // Current movie ID from the route
      // Send both the name and review content to the backend
      await MovieService.addReview(movieId, userName.value, reviewContent.value);
      userName.value = ''; // Clear the name input
      reviewContent.value = ''; // Clear the textarea
      alert('Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };
  </script>
  