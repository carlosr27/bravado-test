<template>
  <div class="search-bar">
    <v-text-field
      v-model="innerValue"
      prepend-inner-icon="mdi-magnify"
      background-color="#FAFAFA"
      placeholder="Search"
      clearable
      filled
      solo
      dense
      hide-details
      class="searchb-bar__field"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      innerValue: '',
    }
  },
  computed: {},
  watch: {
    innerValue(value) {
      this.$emit('input', value)
    },
    value: {
      immediate: true,
      handler(value) {
        this.innerValue = value
      },
    },
  },
}
</script>
