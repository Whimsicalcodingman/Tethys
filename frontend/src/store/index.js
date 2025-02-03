import { createStore } from 'vuex';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { MusicalNoteIcon } from '@heroicons/vue/24/outline';

const store = createStore({
  state: {
    user: null,
    token: null,
    feedbackMessage: null, // Add feedback state
  },
  mutations: {
    setUser(state, { user, token }) {
      state.user = user;
      state.token = token;
      state.feedbackMessage = 'Login successful!'; // Set feedback message
      localStorage.setItem('token', token); // Persist token
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      state.feedbackMessage = null; // Clear feedback message
      localStorage.removeItem('token'); // Clear token
    },
    clearFeedback(state) {
      state.feedbackMessage = null; // Clear feedback message
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      console.log('Login action called with:', email, password);
      try {
        const res = await axios.post('http://localhost:5000/api/login', { email, password });
        console.log('API response:', res.data);

        const { token } = res.data;
        const decoded = jwtDecode(token);

        commit('setUser', { user: decoded.email, token });

        // Wait 2 seconds before redirecting
        setTimeout(() => {
          window.location.href = '/';
        }, 2000); // Adjust delay as needed
      } catch (error) {
        console.error('Login action error:', error.response || error.message);
        throw new Error(error.response?.data?.error || 'Login failed');
      }
    },
    logout({ commit }) {
      commit('clearUser');
      window.location.href = '/login';
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    getUser(state) {
      return state.user;
    },
    getFeedback(state) {
      return state.feedbackMessage; // Getter for feedback message
    },
  },
});

// Restore token on app initialization
const token = localStorage.getItem('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    store.commit('setUser', { user: decoded.email, token });
  } catch (error) {
    console.error('Invalid or expired token during initialization:', error);
    localStorage.removeItem('token');
  }
}

export default store;
