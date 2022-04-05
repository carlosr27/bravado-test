export default {
  async getProfiles(context) {
    let result
    try {
      result = await this.$axios.$get('users.json')
    } catch {
      return { success: false }
    }

    context.commit(
      'set_data',
      result.map((el, index) => ({ ...el, id: index }))
    )

    return { success: true, data: result }
  },
}
