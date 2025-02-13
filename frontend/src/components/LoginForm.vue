<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
        Sign in to your account
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

        <!-- Error Message -->
        <div v-if="error" class="text-sm text-red-500">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="feedback" class="text-sm text-green-500">
          {{ feedback }}
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
      <div class="text-sm flex w-full justify-center mt-6">
        <a
          href="/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          No account yet? Register for Tethys
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref(null);

const store = useStore();
const router = useRouter();
const feedback = computed(() => store.getters.getFeedback); // Access feedback from Vuex

const handleSubmit = async () => {
  error.value = null; // Clear previous errors
  try {
    await store.dispatch('login', { email: email.value, password: password.value });
  } catch (err) {
    console.error('Login failed:', err.message);
    error.value = err.message;
  }
};
</script>
