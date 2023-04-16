<template>
    <q-img :src="card.image" width="122px" height="176px"/>
</template>

<script>
export default {
  name: "PlayingCard",
  props: {
    card: {
      type: Object
    },
    imgWidth: {
      type: String,
      default: "122px"
    },
    imgHeight: {
      type: String,
      default: "176px"
    }
  },

}
</script>

<style scoped>



</style>
