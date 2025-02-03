import { createStore } from 'vuex';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const store = createStore({
  state: {
    user: null,
    token: null,
    feedbackMessage: null,
  },
  mutations: {
    setUser(state, { user, token }) {
      console.log('setUser Mutation Triggered:', user, token);
      state.user = user; // User object includes email and id
      state.token = token;
      state.feedbackMessage = 'Login successful!';
      localStorage.setItem('token', token); // Persist token
    },
    clearUser(state) {
      console.log('clearUser Mutation Triggered');
      state.user = null;
      state.token = null;
      state.feedbackMessage = null;
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
        console.log('Decoded token:', decoded);

        commit('setUser', { user: { email: decoded.email, id: decoded.id }, token });

        // Wait 2 seconds before redirecting
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
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
      return state.feedbackMessage;
    },
  },
});

// Restore token on app initialization
const token = localStorage.getItem('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    console.log('Restored user from token:', decoded);
    store.commit('setUser', { user: { email: decoded.email, id: decoded.id }, token });
  } catch (error) {
    console.error('Invalid or expired token during initialization:', error);
    localStorage.removeItem('token');
  }
}

export default store;
