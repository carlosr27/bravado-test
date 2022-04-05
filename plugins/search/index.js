import Search from './Search'

export default (context, inject) => {
  inject(`search`, new Search(context))
}
