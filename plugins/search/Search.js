import Fuse from 'fuse.js'

export default class Search {
  #store
  #instance
  #options = {
    includeScore: true,
    shouldSort: true,
    includeMatches: true,
    minMatchCharLength: 1,
    threshold: 0.099,
    keys: [
      { name: 'name', weight: 2 },
      { name: 'email', weight: 1 },
      { name: 'title', weight: 0.8 },
      {
        name: 'city',
        weight: 0.5,
      },
      {
        name: 'address',
        weight: 0.4,
      },
    ],
  }

  constructor(ctx) {
    this.#store = ctx ? ctx.store || ctx.$store : null
    if (this.#store)
      this.#store.watch(
        (state) => {
          return state.profile.data
        },
        (value) => {
          this.createSearchInstance(value)
        }
      )
  }

  get instance() {
    return this.#instance
  }

  createSearchInstance(items, options) {
    this.#instance = new Fuse(items, options || this.#options)
  }

  doSearch(query) {
    return this.instance
      .search(query)
      .map((el) => ({ ...el.item, matches: el.matches }))
  }
}
