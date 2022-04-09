import Search from '~/plugins/search/Search'

let $search
self.addEventListener('message', (event) => {
  if (event.data.type === 'search') {
    if (!$search) createSearchInstance(event.data.items, event.data.query)

    const result = $search.doSearch(event.data.query)
    return self.postMessage({ ...event.data, result })
  }
})

function createSearchInstance(items, query = '') {
  $search = new Search()
  $search.createSearchInstance(items)
}
