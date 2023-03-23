
<script>
export default {
  name: "RouterMixin",
  computed: {
    tableId() {
      if (this.$route.name === "table") return this.$route.params.id
      return "lobby"
    }
  }
}
</script>

<style scoped>

</style>
