<template>
  <v-container>
    <search-field />
    <v-virtual-scroll
      :items="allProfiles"
      beanch="4"
      height="500px"
      item-height="30"
      class="profiles-container"
    >
      <template #default="{ item, index }">
        <profile-item :key="`${item.email}-${index}`" :item="item" />
      </template>
    </v-virtual-scroll>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'IndexPage',
  computed: {
    ...mapGetters({ allProfiles: 'profile/profiles' }),
  },
  mounted() {
    this.getProfiles()
  },
  methods: {
    ...mapActions({ getProfiles: 'profile/getProfiles' }),
  },
}
</script>
