<template>
    <div class="container mx-auto p-6">
      <button
        @click="goBack"
        class="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
        hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </span>
        <span>Back to movie overview</span>
      </button>
  
      <div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        <div class="rounded-lg shadow-md bg-white">
          <img :src="movie.poster" alt="Movie Poster" class="poster rounded-lg" />
        </div>
        <div class="rounded-lg shadow-md bg-white p-10">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ movie.title }}</h1>
          <p class="text-gray-600 mb-4 text-lg">Rated: {{ movie.rated }}</p>
          <p class="text-sm text-gray-600 mb-2">{{ movie.plot }}</p>
          <div class="reviews">
            <h2>Reviews</h2>
            <ul>
              <li v-for="(review, index) in movie.reviews" :key="index">
                {{ review }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"; // Import necessary Vue 3 utilities
  import { useRoute, useRouter } from "vue-router"; // Import Vue Router utilities
  import MovieService from "../services/MovieService"; // Import MovieService
  
  // Reactive Data
  const movie = ref({
    poster: "",
    title: "",
    rated: "",
    plot: "",
    _id: "",
    reviews: [],
  });
  
  // Get the route and router objects
  const route = useRoute();
  const router = useRouter();
  
  // Fetch the movie data
  const getMovie = async () => {
    try {
      const movieData = await MovieService.getMovie(route.params.id); // Access route params
      movie.value = movieData;
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };
  
  // Method to navigate back
  const goBack = () => {
    router.back(); // Go back to the previous page
  };
  
  // Lifecycle Hook: Fetch data when the component is mounted
  onMounted(() => {
    getMovie();
  });
  </script>
  