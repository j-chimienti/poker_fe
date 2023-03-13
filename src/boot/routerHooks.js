import {useAuthStore} from "stores/auth-store";
import {Dialog, Loading, Notify, QSpinnerFacebook} from "quasar";
import { boot } from "quasar/wrappers"
import {getSessionId} from "src/services/localStorageService";
import {getTable, getTables, subscribeTable} from "src/services/apiService";
import {usePokerStore} from "stores/poker-store";


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

async function session(store) {
  Loading.show(options)
  const playerOpt = await useAuthStore(store).resumeSession(getSessionId())
  Loading.hide()
  return playerOpt
}


export default boot(({ router, store }) => {
  router.beforeEach(async (to, from) => {
    if (to.name === "table") {
      const id = to.params.id
      if (!usePokerStore().table) {
        const tableOpt = usePokerStore().tables.find(t => t.id === id)
        if (tableOpt) usePokerStore().setTable(tableOpt)
      }
      if (!useAuthStore().connectedToWebsocket) {
        const playerOpt = await session(store)
        if (!playerOpt) confirmRefreshPage()
        else {
          getTable(id)
          subscribeTable(id)
        }
      } else {
        getTable(id)
        subscribeTable(id)
      }
    }
    else if (to.name === "home") {
      if (!useAuthStore().connectedToWebsocket) {
        const playerOpt = await session()
        if (!playerOpt) confirmRefreshPage()
      } else getTables()
    } else if (to.name === "/callback") {
      if (to.query.code && to.query.state) {
        Loading.show(Object.assign({}, options, {
          message: "Logging in. Hang on..."
        }))
        const playerOpt = await useAuthStore().oauthCallback({code: to.query.code, state: to.query.state})
        Loading.hide()
        if (playerOpt) Notify.create("logged in " + playerOpt.email)
        else Notify.create("failed to login")
        return {name: "home"}
      } else {
        Notify.create("missing query params code or state")
        return {name: "home"}
      }
    }
    return true
  })
})
