<template>
  <div class="flex justify-center items-top bg-gray-50">
    <div class="container mx-auto p-6">
      <!-- Filter Section -->
      <div class="bg-white shadow rounded-lg p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">Filter Movies</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Title Search -->
          <div>
            <label for="title-search" class="block text-sm font-medium text-gray-700">
              Search by Title
            </label>
            <div class="mt-1">
              <input
                id="title-search"
                v-model="titleToSearch"
                type="text"
                placeholder="Enter movie title"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5 pr-2 pl-3"
                @input="filterMovies"
              >
            </div>
          </div>

          <!-- Rating Filter -->
          <div>
            <Listbox v-model="ratingToSearch" @update="filterMovies" as="div">
              <ListboxLabel class="block text-sm font-medium text-gray-700">
                Filter by Rating
              </ListboxLabel>
              <div class="relative mt-1">
                <ListboxButton class="text-sm shadow-sm grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1">
                  <span class="col-start-1 row-start-1 block truncate">
                    {{ ratingToSearch || 'All Ratings' }}
                  </span>
                  <ChevronUpDownIcon
                    class="col-start-1 text-sm row-start-1 h-5 w-5 self-center justify-self-end text-gray-400 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                  <ListboxOption
                    v-slot="{ active, selected }"
                    as="template"
                    :value="''"
                  >
                    <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        All Ratings
                      </span>
                    </li>
                  </ListboxOption>
                  <ListboxOption
                    v-for="rating in ratings"
                    :key="rating"
                    v-slot="{ active, selected }"
                    :value="rating"
                    as="template"
                  >
                    <li :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ rating }}
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      <!-- Movies List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="movie in movies" :key="movie._id" class="rounded-lg shadow-md bg-white p-4">
          <img
            :src="movie.poster ? movie.poster : placeholderImage"
            :alt="movie.title"
            class="rounded-lg w-full object-cover mb-4"
            loading="lazy"
          >
          <h3 class="text-lg font-bold text-gray-800">{{ movie.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ movie.plot }}</p>
          <p class="text-sm font-semibold text-gray-800">Rated: {{ movie.rated }}</p>
          <router-link :to="'/movie/'+movie._id">
            <a href="#" class="text-sm/6 font-semibold text-indigo-600">View reviews</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="flex gap-20 justify-center items-top bg-gray-50">
    <button @click="getPrevPage" :disabled="currentPage === 0">Previous</button>
    <span>Page {{ currentPage + 1 }} of {{ totalPages }}</span>
    <button @click="getNextPage" :disabled="currentPage === totalPages - 1">Next</button>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue';
import {
  Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions,
} from '@headlessui/vue';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/vue/20/solid';

import placeholderImage from '../assets/img/placeholders/404-image-placeholder.png'; // Import the placeholder image
import MovieService from '../services/MovieService'; // Importing MovieService

// Reactive State
const movies = ref([]); // List of movies from the API
const ratings = ref([]); // List of unique ratings
const titleToSearch = ref(''); // Current title search input
const ratingToSearch = ref(''); // Current rating filter selection

// Pagination State
const currentPage = ref(0); // Tracks the current page
const entriesPerPage = ref(20); // Number of movies per page
const totalPages = ref(0); // Total number of pages based on results

// Fetch Movies from API
const getMovies = async () => {
  try {
    // Build filters for the API call
    const filters = {
      title: titleToSearch.value.trim() || '', // Use titleToSearch if provided
      rating: ratingToSearch.value || '', // Use ratingToSearch if provided
    };

    // Fetch data from the API
    const moviesData = await MovieService.getMovies(filters, currentPage.value);

    // Update state with the response data
    movies.value = moviesData.movies;
    totalPages.value = Math.ceil(moviesData.total_results / entriesPerPage.value);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// Fetch Ratings from API
const getRatings = async () => {
  try {
    ratings.value = await MovieService.getRatings(); // Fetch unique ratings
  } catch (error) {
    console.error('Error fetching ratings:', error);
  }
};

// Filter Movies by Title and Rating
const filterMovies = async () => {
  currentPage.value = 0; // Reset to the first page when applying a filter
  await getMovies(); // Fetch movies with updated filters
};

// Pagination Controls
const getNextPage = async () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value += 1;
    await getMovies(); // Fetch the next page of movies
  }
};

const getPrevPage = async () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
    await getMovies(); // Fetch the previous page of movies
  }
};

// Watch for Changes to Filters
watch(
  [titleToSearch, ratingToSearch], // Watch these reactive properties
  async () => {
    await filterMovies(); // Trigger `filterMovies` whenever a change is detected
  }
);

// Fetch initial data when the component is mounted
getMovies(); // Fetch the initial list of movies
getRatings(); // Fetch the list of ratings
</script>
