import gsap from "gsap"
import { boot } from "quasar/wrappers"
import { get } from "lodash"
import vueQr from "vue-qr/src/packages/vue-qr.vue"
import { Notify } from 'quasar'

export default boot(({ app }) => {
  app.config.globalProperties.$gsap = gsap
  app.component("vue-qr", vueQr)
  app.config.globalProperties.$get = get


  Notify.setDefaults({
    position: 'bottom-right',
    // timeout: 2500,
    // textColor: 'white',
    // actions: [{ icon: 'close', color: 'white' }]
  })

})
