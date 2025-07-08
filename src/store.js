import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      saved: 0,
      errors: null,
      prixodComponent: null,
      selected_index: null,
      // --- YANGI QO'SHILGAN STATE QISMIDA ---
      kontragent: null, // "" o'rniga null, chunki bu ID yoki ob'ekt bo'lishi mumkin
      kontragentlist: [], // Bo'sh massiv to'g'ri
      sklad: null, // "" o'rniga null
      skladlist: [], // Bo'sh massiv to'g'ri
      paytype: null, // "" o'rniga null
      paytypelist: [] // Bo'sh massiv to'g'ri
      // --- YANGI QO'SHILGAN STATE QISMIDA TUGADI ---
    }
  },
  mutations: {
    setSaved(state, payload) {
      state.saved = payload !== undefined ? payload : 0
    },
    setErrors(state, payload) {
      state.errors = payload || null
    },
    setPrixodComponent(state, component) {
      state.prixodComponent = component || null
    },
    setSelectedIndex(state, index) {
      state.selected_index = index !== undefined ? index : null
    },
    // --- YANGI QO'SHILGAN MUTATIONLAR ---
    setKontragent(state, kontragent) {
      state.kontragent = kontragent !== undefined ? kontragent : null
    },
    setKontragentList(state, list) {
      state.kontragentlist = Array.isArray(list) ? list : []
    },
    setSklad(state, sklad) {
      state.sklad = sklad !== undefined ? sklad : null
    },
    setSkladList(state, list) {
      state.skladlist = Array.isArray(list) ? list : []
    },
    setPaytype(state, paytype) {
      state.paytype = paytype !== undefined ? paytype : null
    },
    setPaytypeList(state, list) {
      state.paytypelist = Array.isArray(list) ? list : []
    }
    // --- YANGI QO'SHILGAN MUTATIONLAR TUGADI ---
  },
  // Qo'shimcha: Getterlar (ixtiyoriy)
  getters: {
    getKontragent: (state) => state.kontragent,
    getKontragentList: (state) => state.kontragentlist,
    getSklad: (state) => state.sklad,
    getSkladList: (state) => state.skladlist,
    getPaytype: (state) => state.paytype,
    getPaytypeList: (state) => state.paytypelist
  }
})

export default store