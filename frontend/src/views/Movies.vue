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
                @input="filterMovies('title')"
                type="text"
                placeholder="Enter movie title"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-1.5 pr-2 pl-3"
              />
            </div>
          </div>

          <!-- Rating Filter -->
          <div>
            <Listbox as="div" v-model="ratingToSearch">
              <ListboxLabel class="block text-sm font-medium text-gray-700">Filter by Rating</ListboxLabel>
              <div class="relative mt-1">
                <!-- Listbox Button -->
                <ListboxButton class="shadow-sm grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
                  <span class="col-start-1 row-start-1 block truncate">
                    {{ ratingToSearch || 'All Ratings' }}
                  </span>
                  <ChevronUpDownIcon
                    class="col-start-1 row-start-1 h-5 w-5 self-center justify-self-end text-gray-400 sm:h-4 sm:w-4"
                    aria-hidden="true"
                  />
                </ListboxButton>


                <!-- Listbox Options -->
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="opacity-0 translate-y-1"
                  enter-to-class="opacity-100 translate-y-0"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="opacity-100 translate-y-0"
                  leave-to-class="opacity-0 translate-y-1"
                >
                  <ListboxOptions class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <!-- Option for 'All Ratings' -->
                    <ListboxOption as="template" :value="''" v-slot="{ active, selected }">
                      <li
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        ]"
                      >
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                          All Ratings
                        </span>
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>

                    <!-- Dynamic Rating Options -->
                    <ListboxOption
                      v-for="rating in ratings"
                      :key="rating"
                      :value="rating"
                      as="template"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        ]"
                      >
                        <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                          {{ rating }}
                        </span>
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                        >
                          <CheckIcon class="h-5 w-5" aria-hidden="true" />
                        </span>
                      </li>
                    </ListboxOption>
                  </ListboxOptions>
                </transition>
              </div>
            </Listbox>
          </div>
        </div>
      </div>

      <!-- Movies List -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="movie in filteredMovies"
          :key="movie._id"
          class="rounded-lg shadow-md bg-white p-4"
        >
          <img :src="movie.poster" :alt="movie.title" class="rounded-lg w-full object-cover mb-4" />
          <h3 class="text-lg font-bold text-gray-800">{{ movie.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">{{ movie.plot }}</p>
          <p class="text-sm font-semibold text-gray-800">Rated: {{ movie.rated }}</p>
          <a href="#" class="text-sm/6 font-semibold text-indigo-600">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import { ChevronUpDownIcon } from '@heroicons/vue/20/solid';
import { CheckIcon } from '@heroicons/vue/20/solid';

import MovieService from '../services/MovieService'; // Importing MovieService

// Reactive Data
const movies = ref([]); // Initializing with an empty array
const ratings = ref([]);
const titleToSearch = ref("");
const ratingToSearch = ref("");

// Fetch Movies from API
const getMovies = async () => {
  try {
    const moviesData = await MovieService.getMovies();
    movies.value = moviesData.movies; // Update reactive `movies`
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// Fetch Ratings from API
const getRatings = async () => {
  try {
    ratings.value = await MovieService.getRatings();
  } catch (error) {
    console.error("Error fetching ratings:", error);
  }
};

// Filter Movies by Title or Rating
const filterMovies = async (type) => {
  try {
    let moviesData;
    if (type === "title") {
      moviesData = await MovieService.getMovies(titleToSearch.value, type);
    } else {
      moviesData = await MovieService.getMovies(ratingToSearch.value, type);
    }
    movies.value = moviesData.movies; // Update reactive `movies` with filtered results
  } catch (error) {
    console.error("Error filtering movies:", error);
  }
};

// Computed Property for Filtered Movies
const filteredMovies = computed(() => {
  return movies.value.filter((movie) => {
    const matchesTitle = movie.title
      .toLowerCase()
      .includes(titleToSearch.value.toLowerCase());
    const matchesRating = ratingToSearch.value
      ? movie.rated === ratingToSearch.value
      : true;
    return matchesTitle && matchesRating;
  });
});

// Fetch initial data when the component is mounted
getMovies();
getRatings();
</script>

