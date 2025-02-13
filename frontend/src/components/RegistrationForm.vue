<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign up for a Tethys account
        </h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div class="mt-2">
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div class="mt-2">
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
  
          <div>
            <label
              for="repeat-password"
              class="block text-sm font-medium text-gray-900"
            >
              Repeat password
            </label>
            <div class="mt-2">
              <input
                id="repeat-password"
                v-model="repeatPassword"
                type="password"
                name="repeat-password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
  
          <!-- Error Message -->
          <div v-if="error" class="text-sm text-red-500">
            {{ error }}
          </div>
  
          <!-- Success Message -->
          <div v-if="successMessage" class="text-sm text-green-500">
            {{ successMessage }}
          </div>
  
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
  
          <div>
            <div class="text-sm flex w-full justify-center">
              <a
                href="/login"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Log into existing account
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios'; // Import axios for API calls

const email = ref('');
const password = ref('');
const repeatPassword = ref('');
const error = ref(null);
const successMessage = ref(null); // For feedback on successful registration
const router = useRouter();

const handleSubmit = async () => {
  error.value = null; // Clear previous error messages
  successMessage.value = null; // Clear previous success messages

  if (password.value !== repeatPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/api/register', {
      email: email.value,
      password: password.value,
    });

    successMessage.value = response.data.message; // Show success feedback
    setTimeout(() => {
      router.push('/login'); // Redirect to login after a delay
    }, 1500);
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      error.value = err.response.data.error; // Show error message from API
    } else {
      error.value = 'An unexpected error occurred. Please try again.';
    }
  }
};
</script>
