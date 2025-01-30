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
          <img :src="movie.poster ? movie.poster : placeholderImage" alt="Movie Poster" class="poster rounded-lg" />
        </div>
        <div class="rounded-lg shadow-md bg-white p-10">
          <h1 class="text-3xl font-bold text-gray-800 mb-4">{{ movie.title }}</h1>
          <p class="text-gray-600 mb-4 text-lg">Rated: {{ movie.rated }}</p>
          <p class="text-sm text-gray-600 mb-2">{{ movie.plot }}</p>
          
        </div>
      </div>
    </div>
    <div class="container mx-auto pt-0 pb-6 pl-6 pr-6">
        <div class="reviews">
            <ul class="flex gap-6">
                <li v-for="review in movie.reviews" :key="review._id" class="">
                    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ review.name }}</h5>
                        <p class="mb-3 font-normal text-gray-700">{{ review.review }}</p>
                        <p class="mb-3 font-normal text-gray-600">{{ review.formattedDate }}</p>
                        <!-- Make sure the buttons get the onclick event later for editing and deleting -->
                        <div class="flex gap-3">
                            <button
                                class="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
                                hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
                            >Edit</button>
                            <button
                                class="flex items-center bg-red-300 hover:bg-red-400 text-black-400 font-semibold
                                hover:text-white py-2 px-4 border border-red-300 hover:border-transparent rounded mb-4"
                            >Delete</button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue"; // Import necessary Vue 3 utilities
  import { useRoute, useRouter } from "vue-router"; // Import Vue Router utilities
  import moment from "moment"; // Import moment.js for date formatting
  import MovieService from "../services/MovieService"; // Import MovieService
  import placeholderImage from '../assets/img/placeholders/404-image-placeholder.png'; // Import the placeholder
  
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
  
  // Function to format dates using moment.js
  const getFormattedDate = (date) => {
    if (!date) return "Invalid Date";
    return moment(date).format("MMMM Do YYYY"); // Example format: January 30th 2025, 3:00:00 pm
  };
  
  // Fetch the movie data
  const getMovie = async () => {
    try {
      const movieData = await MovieService.getMovie(route.params.id);
      console.log("Fetched movie data:", movieData); // Debug log
  
      // Format review dates
      movieData.reviews = movieData.reviews.map((review) => ({
        ...review,
        formattedDate: getFormattedDate(review.date), // Add formatted date field
      }));
  
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
  
  