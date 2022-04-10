<template>
  <v-list-item class="profile px-0" :class="profleClasses">
    <div
      :key="item.avatar"
      class="profile__avatar align-self-stretch"
      :style="avatarStyle"
    ></div>

    <div
      class="profile__content content d-flex flex-wrap flex-column flex-md-row flex-grow-1 align-self-stretch"
    >
      <v-list-item-content class="py-0">
        <v-list-item-title class="content__title" v-html="name"></v-list-item-title>
        <div class="content__subtitle font-weight-bold" v-html="title"></div>
        <div class="content__subtitle" v-html="address"></div>
      </v-list-item-content>

      <div class="content__email align-self-start" v-html="email"></div>

      <div class="content__action flex-grow-1 d-flex align-center">
        <a
          href="#"
          role="button"
          class="text-uppercase"
          @click.prevent="addOrRemove(item.email)"
        >
          {{ active ? 'Skip Selection' : 'Mark as siutable' }}
        </a>
      </div>
    </div>
  </v-list-item>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters({ marked: 'profile/marked' }),
    active() {
      return this.marked && this.marked.includes(this.item.email)
    },
    address() {
      const strings = {
        address: this.item.address,
        city: this.item.city,
      }
      this.getMatches(strings)
      return `${strings.address}, ${strings.city}`
    },
    email() {
      const strings = {
        email: this.item.email,
      }
      this.getMatches(strings)
      return strings.email
    },
    name() {
      const strings = {
        name: this.item.name,
      }
      this.getMatches(strings)
      return strings.name
    },
    title() {
      const strings = {
        title: this.item.title,
      }
      this.getMatches(strings)
      return strings.title
    },

    // Style
    avatarStyle() {
      return { backgroundImage: `url(${this.item.avatar})` }
    },
    profleClasses() {
      return {
        'profile--active': this.active,
      }
    },
  },
  methods: {
    ...mapMutations({ addOrRemove: 'profile/add_remove_marked' }),
    getMatches(strings) {
      if (this.item.matches)
        this.item.matches
          .filter((el) => Object.keys(strings).includes(el.key))
          .forEach((match) => {
            const words = strings[match.key].split('')
            match.indices.forEach((indexes) => {
              words[indexes[0]] = `<span class="highlight-search">${
                words[indexes[0]]
              }`
              words[indexes[1]] = `${words[indexes[1]]}</span>`
            })
            strings[match.key] = words.join('')
          })
    },
  },
}
</script>
