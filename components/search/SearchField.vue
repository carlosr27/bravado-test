<template>
  <div class="search-container">
    <v-text-field
      v-model="innerValue"
      placeholder="Search"
      clearable
      filled
      dense
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

<style></style>
