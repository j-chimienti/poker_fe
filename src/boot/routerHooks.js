import { useAuthStore } from "stores/auth-store"
import { Dialog, Loading, Notify, QSpinnerFacebook } from "quasar"
import { boot } from "quasar/wrappers"
import { getSessionId } from "src/services/localStorageService"
import {
  getTable,
  getTables,
  navigateToLobby,
  subscribeTable,
} from "src/services/apiService"
import { usePokerStore } from "stores/poker-store"

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
  spinner: QSpinnerFacebook,
  spinnerColor: "warning",
  spinnerSize: 140,
  backgroundColor: "primary",
  message: "Starting game. Hang on...",
  messageColor: "warning",
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
        else {
          getTable(id)
          subscribeTable(id)
        }
      } else {
        getTable(id)
        subscribeTable(id)
      }
    } else if (to.name === "home") {
      const pokerStore = usePokerStore()
      pokerStore.room = "lobby"
      pokerStore.table = null
      if (!useAuthStore().connectedToWebsocket) {
        const playerOpt = await session()
        if (!playerOpt) confirmRefreshPage()
      } else {
        getTables()
        navigateToLobby()
      }
    } else if (to.path === "/callback") {
      if (to.query.code && to.query.state) {
        Loading.show(
          Object.assign({}, options, {
            message: "Logging in. Hang on...",
          })
        )
        const playerOpt = await useAuthStore().oauthCallback({
          code: to.query.code,
          state: to.query.state,
        })
        Loading.hide()
        if (playerOpt) Notify.create("logged in " + playerOpt.name)
        else Notify.create("failed to login")
        return { name: "home" }
      } else {
        Notify.create("missing query params code or state")
        return { name: "home" }
      }
    }
    return true
  })
})
