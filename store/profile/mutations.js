export default {
  set_data(state, payload) {
    state.data = [...payload]
  },
  set_search(state, payload) {
    state.search = { ...payload }
  },
  set_marked(state, payload) {
    state.marked = [...payload]
  },
  add_remove_marked(state, payload) {
    if (state.marked.includes(payload))
      state.marked = state.marked.filter((el) => el !== payload)
    else state.marked = [...state.marked, payload]
  },
}
