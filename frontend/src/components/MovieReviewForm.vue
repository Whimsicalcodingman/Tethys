<template>
    <div v-if="isAuthenticated" class="mt-6">
      <h3 class="text-lg font-bold text-gray-900">Leave a Review</h3>
      <form @submit.prevent="submitReview" class="mt-4">
        <textarea
          v-model="reviewContent"
          placeholder="Write your review here..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          class="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
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
  
  const reviewContent = ref('');
  const route = useRoute();
  const store = useStore();
  
  const isAuthenticated = store.getters.isAuthenticated; // Check if user is logged in
  
  const submitReview = async () => {
    try {
      const movieId = route.params.id; // Current movie ID from the route
      await MovieService.addReview(movieId, reviewContent.value); // Call the API
      reviewContent.value = ''; // Clear the textarea after submission
      alert('Review submitted successfully!'); // Optional feedback
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };
  </script>
  