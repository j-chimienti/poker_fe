/* eslint-disable */
// eslint-disable-next-line import/no-cycle
import { get as _get } from "lodash"
import { Notify } from "quasar"

import * as apiService from "../services/apiService"

import { defineStore } from "pinia"
import { messageFactory } from "stores/messageFactory"
import { clearSessionId, saveSessionId } from "src/services/localStorageService"
import { formatToUSD } from "src/services/moneyUtils"

const wsUrl = process.env.VUE_APP_WEBSOCKET_URL

export const useAuthStore = defineStore("auth", {
  state: () => ({
    websocket: null,
    playerAccount: null, //{playerAccount, session}
  }),
  getters: {
    connectedToWebsocket(state) {
      return _get(this.websocket, "readyState", -1) === 1
    },
    authenticated() {
      return Boolean(this.playerAccount)
    },
    isSessionUser() {
      return (
        Boolean(this.playerAccount) &&
        _get(this.playerAccount, "email", "").includes("session")
      )
    },
    playerId() {
      return _get(this.playerAccount, "id", null)
    },
    email() {
      return _get(this.playerAccount, "email", "N/A")
    },
    name() {
      return _get(this.playerAccount, "name", "N/A")
    },
    sessionId() {
      return _get(this.playerAccount, "sessionId", null)
    },
    picture() {
      return _get(this.playerAccount, "picture", null)
    },
    avatar() {
      return this.picture || "todo"
    },
    loading() {
      return this.playerAccount === null
    },
  },
  actions: {
    sendWebsocketMessage(m) {
      this.websocket.send(JSON.stringify(m))
    },
    openWebsocket(sessionId) {
      return new Promise((resolve, reject) => {
        const url = sessionId ? `${wsUrl}?session=${sessionId}` : wsUrl
        console.log("open ws", url)
        const ws = new WebSocket(url)
        ws.onopen = () => {
          console.log("opened ws", url)
          this.websocket = ws
          return resolve(ws)
        }
        ws.onmessage = (msg) => {
          messageFactory(JSON.parse(msg.data))
        }
        ws.onerror = (err) => {
          console.error("ws failed", err, url)
          this.websocket = null
          return reject(new Error(`Websocket open error ${err}`))
        }
        ws.onclose = () => {
          console.log("websocket closed", url)
          this.websocket = null
          setTimeout(async () => {
            console.log("reopen ws")
            await this.openWebsocket(sessionId)
          }, 3000)
        }
      })
    },

    async onAuthSuccess({ playerAccount }) {
      this.playerAccount = playerAccount
      saveSessionId(playerAccount.sessionId)
      await this.openWebsocket(playerAccount.sessionId)
      return playerAccount
    },
    async oauthCallback({ code, state }) {
      const provider = "google" // todo: hardcode
      return apiService
        .oauthCallbackV2(provider, { code, state })
        .then((res) => this.onAuthSuccess(res.data))
        .catch((err) => {
          return null
        })
    },
    async resumeSession(sessionId) {
      return apiService
        .resumeOrNewSession(sessionId)
        .then((res) => this.onAuthSuccess(res.data))
        .catch((err) => {
          clearSessionId()
          return null
        })
    },

    signup({ password, email }) {
      this.requestingSession = true
      return apiService.signup(email, password).then((res) => {
        this.loginModalVisible = false
        if (res.status === 201) {
          Notify.create({
            type: "positive",
            message: "Created playerAccount " + email,
          })
          return this.onAuthSuccess(res.data)
        } else {
          Notify.create({
            type: "negative",
            message: "Failed to signup",
          })
          clearSessionId()
          return res
        }
      })
    },
    login(body) {
      this.requestingSession = true
      return apiService
        .login(body)
        .then((res) => this.onAuthSuccess(res.data))
        .catch((e) => {
          Notify.create({
            type: "negative",
            message: "Login failed",
          })
          clearSessionId()
        })
    },
    logout() {
      return apiService.logout().finally(() => {
        // todo: reset root state
        clearSessionId()
        window.location.reload()
      })
    },
    onAuthenticated(playerAccount) {
      this.playerAccount = playerAccount
      this.requestingSession = false
    },
  },
})
