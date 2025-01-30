import { createStore } from 'vuex';

const store = createStore({
  state: {
    message: 'Hello, Vuex!',
  },
  mutations: {
    // Disable the ESLint rule for this specific mutation
    /* eslint-disable no-param-reassign */
    setMessage(state, newMessage) {
      state.message = newMessage;
    },
    /* eslint-enable no-param-reassign */
  },
  actions: {
    updateMessage({ commit }, newMessage) {
      commit('setMessage', newMessage);
    },
  },
});

export default store;
