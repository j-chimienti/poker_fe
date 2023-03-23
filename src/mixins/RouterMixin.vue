
<script>
import {usePokerStore} from "stores/poker-store";

export default {
  name: "RouterMixin",
  computed: {
    tableId() {
      return usePokerStore().room
    }
  }
}
</script>

<style scoped>

</style>
