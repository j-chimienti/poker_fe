import {useAuthStore} from "src/auth/auth-store"
import {Dialog, Loading, Notify} from "quasar"
import {boot} from "quasar/wrappers"
import {getSessionId} from "src/services/localStorageService"
import {navigateToLobby, navigateToTable} from "src/services/apiService"
import {usePokerStore} from "stores/poker-store"
import SplashScreen from "components/SplashScreen.vue"
import {pages} from "src/constants"

export function confirmRefreshPage() {
  Dialog.create({
    title: "Cannot start game",
    dark: true,
    message: "Error starting game. Would you like to refresh page?",
    cancel: false,
    persistent: true,
  })
    .onOk(() => {
      window.location.reload()
      // console.log('>>>> OK')
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
}

const options = {
  // delay: 400,
  // spinner: QSpinnerFacebook,
  spinner: SplashScreen,
  // spinnerColor: "warning",
  // spinnerSize: 140,
  // backgroundColor: "primary",
  message: "Loading. Hang on...",
  // messageColor: "warning",
}

async function session(store) {
  const sessionId = getSessionId()
  return await useAuthStore(store).resumeSession(sessionId)
}

export default boot(({ router, store }) => {
  router.beforeEach(async (to, from) => {
    if (to.name === pages.table) {
      const id = to.params.id
      const pokerStore = usePokerStore()
      pokerStore.room = id
      if (
        !pokerStore.table ||
        (pokerStore.table && pokerStore.table.id && pokerStore.table.id !== id)
      ) {
        const tableOpt = pokerStore.tables.find((t) => t.id === id)
        if (tableOpt) pokerStore.setTable(tableOpt)
      }
      if (!useAuthStore().connectedToWebsocket) {
        const playerOpt = await session(store)
        if (!playerOpt) confirmRefreshPage()
        else navigateToTable(id)
      } else navigateToTable(id)
    } else if (to.name === pages.lobby) {
      const pokerStore = usePokerStore()
      pokerStore.room = pages.lobby
      pokerStore.table = null
      if (!useAuthStore().connectedToWebsocket) {
        Loading.show(options)
        const playerOpt = await session()
        Loading.hide()
        if (!playerOpt) confirmRefreshPage()
      } else navigateToLobby()
    } else if (to.path === "/callback") {
      if (to.query.code && to.query.state) {
        Loading.show(
          Object.assign({}, options, { message: "logging in with google" })
        )
        const playerOpt = await useAuthStore().oauthCallback({
          code: to.query.code,
          state: to.query.state,
        })
        Loading.hide()
        if (playerOpt) Notify.create("logged in " + playerOpt.name)
        else Notify.create("failed to login")
        return { name: pages.lobby }
      } else {
        Notify.create("missing query params code or state")
        return { name: pages.lobby }
      }
    }
    return true
  })
})
