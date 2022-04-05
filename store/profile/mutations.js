export default {
  set_data(state, payload) {
    state.data = [...payload]
  },
  set_search(state, payload) {
    state.search = { ...payload }
  },
}
