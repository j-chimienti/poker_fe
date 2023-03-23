
<script>
import {call, fold, joinTable, leave, raise} from "src/services/apiService";

export default {
  name: "ApiMixin",
  methods: {
    joinTable,
    fold,
    leave,
    call,
    raise
  }
}
</script>

<style scoped>

</style>
