<template>
  <div class="profile">
    {{ item.name }}
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>

<style lang="scss" scoped>
.profile {
  height: 30px;
}
</style>
