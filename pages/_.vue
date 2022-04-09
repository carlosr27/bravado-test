<template>
  <v-container class="d-flex flex-column white" style="height: 100vh">
    <search-field v-model="query" />
    <v-virtual-scroll
      :items="profiles"
      beanch="2"
      height="inherit"
      item-height="164"
      class="custom-scroll"
    >
      <template #default="{ item }">
        <profile-item :key="item.email" :item="item" />
      </template>
    </v-virtual-scroll>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'IndexPage',
  data() {
    return {
      query: '',
    }
  },
  computed: {
    ...mapGetters({
      allProfiles: 'profile/profiles',
      searchItems: 'profile/search',
    }),
    profiles() {
      if (this.searchItems.query) return this.searchItems.items || []
      return this.allProfiles
    },
  },
  watch: {
    query(value) {
      const query = (value && value.trim()) || ''
      this.updateUrl(query)
      this.doSearch(query)
    },
  },
  async mounted() {
    await this.getProfiles()
    if (this.$route.params.pathMatch.toLowerCase().includes('search')) {
      this.query = this.$route.params.pathMatch.split('/')[1]
    }
  },
  methods: {
    ...mapActions({ getProfiles: 'profile/getProfiles' }),
    ...mapMutations({ setSearch: 'profile/set_search' }),
    doSearch(query) {
      if (!query) return this.setSearch({})

      setTimeout(() =>
        this.$worker
          .dispatch({ type: 'search', query, items: this.allProfiles })
          .then((message) => {
            // console.log('SEARCH', message)
            if (message.data.type === 'search') {
              this.setSearch({
                query: message.data.query,
                items: message.data.result,
              })
            }
          })
      )
    },
    updateUrl(query) {
      let path = '/'
      if (query) path += `search/${encodeURIComponent(query)}`
      history.replaceState({}, null, path)
    },
  },
}
</script>
