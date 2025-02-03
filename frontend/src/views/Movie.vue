<template>
  <div class="container mx-auto p-6">
    <button
      class="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold
        hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
      @click="goBack"
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
        <img
          :src="movie.poster ? movie.poster : placeholderImage"
          alt="Movie Poster"
          class="poster rounded-lg"
        >
      </div>
      <div class="rounded-lg shadow-md bg-white p-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ movie.title }}
        </h1>
        <p class="text-gray-600 mb-4 text-lg">
          Rated: {{ movie.rated }}
        </p>
        <p class="text-sm text-gray-600 mb-2">
          {{ movie.plot }}
        </p>
      </div>
    </div>
    <MovieReviewForm />
  </div>
  <div class="container mx-auto pt-0 pb-6 pl-6 pr-6">
  <div class="reviews">
    <ul
      class="grid grid-cols-3 gap-6">
      <li
        v-for="review in movie.reviews"
        :key="review._id"
        class="break-inside-avoid"
      >
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm h-full flex justify-between flex-col">
          <div>
            <h5 class="mb-2 font-bold tracking-tight text-gray-900">
              {{ review.name }}
            </h5>
            <p class="mb-3 font-normal text-gray-700">
              {{ review.review }}
            </p>
            <!-- DEBUG INFORMATION -->
            <p>
              Debug: currentUserId = {{ currentUserId }} | review.user_id = {{ review.user_id }}
            </p>
          </div>
          <div class="flex justify-between w-100">
            <p class="font-normal text-xs text-gray-600">
              {{ review.formattedDate }}
            </p>
            <!-- Conditionally render edit/delete icons -->
            <div
              v-if="currentUserId === review.user_id"
              class="flex gap-3 justify-center align-center mt-4"
            >
              <!-- Edit Icon -->
              <button class="flex items-center text-xs text-blue-600 hover:underline">
                <svg
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit
              </button>

              <!-- Delete Icon -->
              <button class="flex items-center text-xs text-red-600 hover:underline">
                <svg
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 mr-1"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>


</template>

<script setup>
import { ref, computed, onMounted } from 'vue'; // Import necessary Vue 3 utilities
import { useRoute, useRouter } from 'vue-router'; // Import Vue Router utilities
import moment from 'moment'; // Import moment.js for date formatting
import MovieService from '../services/MovieService'; // Import MovieService
import placeholderImage from '../assets/img/placeholders/404-image-placeholder.png'; // Import the placeholder
import { useStore } from 'vuex'; // Import the Vuex store
import MovieReviewForm from '../components/MovieReviewForm.vue';

const store = useStore();
const movie = ref({
  poster: '',
  title: '',
  rated: '',
  plot: '',
  _id: '',
  reviews: [],
});

const route = useRoute();
const router = useRouter();

// Get the logged-in user's ID
const currentUserId = computed(() => store.state.user?.id);

// Format dates
const getFormattedDate = (date) => {
  if (!date) return 'Invalid Date';
  return moment(date).format('MMMM Do, YYYY');
};

// Fetch movie data
const getMovie = async () => {
  try {
    const movieData = await MovieService.getMovie(route.params.id);

    // Format review dates
    movieData.reviews = movieData.reviews.map((review) => ({
      ...review,
      formattedDate: getFormattedDate(review.date),
    }));

    movie.value = movieData;
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
};

// Navigate back
const goBack = () => {
  router.back();
};

onMounted(() => {
  getMovie();
});
</script>
