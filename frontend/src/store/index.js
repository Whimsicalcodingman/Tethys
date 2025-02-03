import { createStore } from 'vuex';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const store = createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, { user, token }) {
      console.log('setUser Mutation Triggered:', user, token);
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token); // Persist token
    },
    clearUser(state) {
      console.log('clearUser Mutation Triggered');
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Clear token
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      console.log('Login action called with:', email, password);
      try {
        const res = await axios.post('http://localhost:5000/api/login', { email, password });
        const { token } = res.data; 
        const decoded = jwtDecode(token);

        commit('setUser', { user: decoded.email, token }); // Use decoded email
      } catch (error) {
        console.error('Login action error:', error.response || error.message);
        throw new Error(error.response?.data?.error || 'Login failed');
      }
    },
    logout({ commit }) {
      commit('clearUser');
      window.location.href = '/login'; // Optional: Use router push for smoother transitions
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token; // Return true if token exists
    },
    getUser(state) {
      return state.user;
    },
  },
});

// Restore token on app initialization
const token = localStorage.getItem('token');
if (token) {
  try {
    const decoded = jwtDecode(token);
    console.log('Restored user from token:', decoded.email); // Fix variable name
    store.commit('setUser', { user: decoded.email, token });
  } catch (error) {
    console.error('Invalid or expired token during initialization:', error);
    localStorage.removeItem('token');
  }
}

export default store;
