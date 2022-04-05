import Search from '~/plugins/search/Search'

let $search
self.addEventListener('message', (event) => {
  if (event.data.type === 'create') {
    createSearchInstance(event.data.items)
    return self.postMessage({ ...event.data })
  }

  if (event.data.type === 'search') {
    if (!$search) createSearchInstance(event.data.items)

    const result = $search.doSearch(event.data.query)
    return self.postMessage({ ...event.data, result })
  }
})

function createSearchInstance(items) {
  $search = new Search()
  $search.createSearchInstance(items)
}
