import {useAuthStore} from "stores/auth-store";
import {Dialog, Loading, Notify, QSpinnerFacebook} from "quasar";
import { boot } from "quasar/wrappers"
import {getSessionId} from "src/services/localStorageService";
import {getTable, getTables} from "src/services/apiService";


export function confirmRefreshPage () {
  Dialog.create({
    title: 'Cannot start game',
    dark: true,
    message: 'Error starting game. Would you like to refresh page?',
    cancel: false,
    persistent: true
  }).onOk(() => {
    window.location.reload()
    // console.log('>>>> OK')
  }).onOk(() => {
    // console.log('>>>> second OK catcher')
  }).onCancel(() => {
    // console.log('>>>> Cancel')
  }).onDismiss(() => {
    // console.log('I am triggered on both OK and Cancel')
  })
}


const options = {
  // delay: 400,
  spinner: QSpinnerFacebook,
  spinnerColor: 'warning',
  spinnerSize: 140,
  backgroundColor: 'primary',
  message: 'Starting game. Hang on...',
  messageColor: 'warning'
}

export default boot(({ router, store }) => {


  router.beforeEach(async (to, from, next) => {

    async function session() {
      Loading.show(options)
      const playerOpt = await useAuthStore(store).resumeSession(getSessionId())
      Loading.hide()
      return playerOpt
    }

    if (to.name === "table") {
      const id = to.params.id
      if (!useAuthStore().connectedToWebsocket) {
        const playerOpt = await session()
        if (!playerOpt) confirmRefreshPage()
        else getTable(id)
        next()
      } else {
        getTable(id)
        next()
      }
    }
    else if (to.name === "home") {
      if (!useAuthStore().connectedToWebsocket) {
        const playerOpt = await session()
        if (!playerOpt) confirmRefreshPage()

      } else getTables()
      next()
    } else if (to.path === "/callback") {
      if (to.query.code && to.query.state) {
        Loading.show(Object.assign({}, options, {
          message: "Logging in. Hang on..."
        }))
        const playerOpt = await useAuthStore().oauthCallback({code: to.query.code, state: to.query.state})
        Loading.hide()
        if (playerOpt) {
          Notify.create("logged in " + playerOpt.email)
        } else {
          Notify.create("failed to login")
        }
        return next({name: "home"})
      } else {
        Notify.create("missing query params code or state")
        return next({name: "home"})
      }
    } else next()
  })
})
