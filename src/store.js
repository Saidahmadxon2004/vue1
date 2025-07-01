import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      saved: 0,
      errors: null
    }
  },
  mutations: {
    setSaved(state, payload) {
      state.saved = payload
    },
    setErrors(state, payload) {
      state.errors = payload
    }
  }
})

export default store
