<template>
  <header class="bg-white border-b border-gray-200">
    <nav
      class="container mx-auto flex items-center justify-between p-6 lg:px-6"
      aria-label="Global"
    >
      <!-- Logo -->
      <div class="flex lg:flex-1">
        <router-link
          to="/"
          class="-m-1.5 p-1.5 flex items-center"
        >
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Movies App Logo"
          >
          <span class="ml-2 text-xl font-bold text-indigo-600">Movies App</span>
        </router-link>
      </div>

      <!-- Desktop Navigation Links -->
      <div class="hidden lg:flex lg:gap-x-8">
        <router-link
          to="/"
          class="text-sm font-semibold text-gray-900 hover:text-indigo-600"
        >
          Home
        </router-link>
        <router-link
          to="/movies"
          class="text-sm font-semibold text-gray-900 hover:text-indigo-600"
        >
          Movies
        </router-link>
        <router-link
          to="/about"
          class="text-sm font-semibold text-gray-900 hover:text-indigo-600"
        >
          About
        </router-link>
        <router-link
          to="/login"
          class="text-sm font-semibold text-gray-900 hover:text-indigo-600"
        >
          Login
        </router-link>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = true"
        >
          <Bars3Icon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="fixed inset-0 z-10 bg-white p-6 lg:hidden"
    >
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="flex items-center"
        >
          <img
            class="h-8 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Movies App Logo"
          >
          <span class="ml-2 text-xl font-bold text-indigo-600">Movies App</span>
        </router-link>
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          @click="mobileMenuOpen = false"
        >
          <XMarkIcon
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
      <div class="mt-6 space-y-4">
        <router-link
          to="/"
          class="block text-sm font-semibold text-gray-900 hover:text-indigo-600"
          @click="mobileMenuOpen = false"
        >
          Home
        </router-link>
        <router-link
          to="/movies"
          class="block text-sm font-semibold text-gray-900 hover:text-indigo-600"
          @click="mobileMenuOpen = false"
        >
          Movies
        </router-link>
        <router-link
          to="/about"
          class="block text-sm font-semibold text-gray-900 hover:text-indigo-600"
          @click="mobileMenuOpen = false"
        >
          About
        </router-link>
        <!-- Login Link (Visible When No User is Logged In) -->
        <router-link
          v-if="!userData"
          to="/login"
          class="block text-sm font-semibold text-gray-900 hover:text-indigo-600"
          @click="mobileMenuOpen = false"
        >
          Login
        </router-link>

        <!-- Logout Link (Visible When User is Logged In) -->
        <a
          v-if="userData"
          v-on:click="logout"
          class="block text-sm font-semibold text-gray-900 hover:text-indigo-600"
        >
          Logout
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

import { computed } from 'vue'; // Import Vue utilities
import { useStore } from 'vuex'; // Import Vuex for state management

const store = useStore(); // Access the Vuex store

// Dynamically compute user data
const userData = computed(() => {
  return store.state.user ? `${store.state.user} (Logged In)` : null;
});

// Logout method to clear the store and token
const logout = () => {
  store.dispatch('logout'); // Dispatch the Vuex logout action
};

const mobileMenuOpen = ref(false);
</script>
