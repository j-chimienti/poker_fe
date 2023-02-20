<template>
    <q-img :src="card.image" style="width: 75px"/>
</template>

<script>
export default {
  name: "PlayingCard",
  props: {
    card: {
      type: Object
    }
  },

}
</script>

<style scoped>

</style>
