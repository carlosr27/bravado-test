import Search from '~/plugins/search/Search'

let $search
self.onmessage = (event) => {
  if (event.data.type === 'search') {
    if (!$search) createSearchInstance(event.data.items, event.data.query)

    const result = $search.doSearch(event.data.query)
    self.postMessage({ ...event.data, result })
    return self.close()
  }
}

function createSearchInstance(items, query = '') {
  $search = new Search()
  $search.createSearchInstance(items)
}
