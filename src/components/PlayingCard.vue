<template>
    <q-img :src="card.image" class="face-up-card"/>
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

.face-up-card {

  width: 122.09px;
  height: 176.68px;
}

</style>
