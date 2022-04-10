import Fuse from 'fuse.js'

export default class Search {
  #store
  #instance
  #options = {
    includeScore: true,
    shouldSort: true,
    includeMatches: true,
    minMatchCharLength: 2,
    useExtendedSearch: false,
    threshold: 0.2,
    keys: [
      { name: 'name', weight: 2 },
      { name: 'email', weight: 1 },
      { name: 'title', weight: 0.8 },
      {
        name: 'city',
        weight: 0.4,
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

  changeMinMatch(min) {
    this.#options.minMatchCharLength = min || 1
  }

  createSearchInstance(items, options) {
    this.#instance = new Fuse(items, options || this.#options)
  }

  doSearch(query) {
    return this.instance
      .search(query)
      .map((el) => ({ ...el.item, matches: el.matches, score: el.score }))
  }
}
