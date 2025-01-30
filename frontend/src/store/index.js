import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: null,
    token: null,
  },
  mutations: {
    setUser(state, { user, token }) {
      state.user = user;
      state.token = token;
      localStorage.setItem('token', token); // Persist token
    },
    clearUser(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        const { token, username: user } = res.data;
        commit('setUser', { user, token });
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout({ commit }) {
      commit('clearUser');
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token; // True if token exists
    },
    getUser(state) {
      return state.user;
    },
  },
});

export default store;
