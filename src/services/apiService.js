import {api} from "boot/axios"
import {useAuthStore} from "stores/auth-store";



const actions = {JOIN: "JOIN", LEAVE: "LEAVE", FOLD: "FOLD", CALL: "CALL", BET: "BET", DEAL: "DEAL", NEW_ROUND: "NEW_ROUND"}

export function getTable(id) {
  return useAuthStore().sendWebsocketMessage({WsGetTable: null, id})
}

export function getTables() {
  return useAuthStore().sendWebsocketMessage({WsGetTables: null, onlyPublic: false})
}

export function join(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.JOIN, tableId: id})
}

export function leave(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.LEAVE, tableId: id})
}

export function fold(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.FOLD, tableId: id})
}

export function call(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.CALL, tableId: id})
}
export function bet(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.BET, tableId: id})
}
export function deal(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.DEAL, tableId: id})
}
export function new_round(id) {
  return useAuthStore().sendWebsocketMessage({action: actions.NEW_ROUND, tableId: id})
}

export async function authorize(provider = "google") {
  return api.get(`/api/auth/authorize/${provider}`)
    .then((res) => {
      const { url } = res.data
      window.location = url
    })
}

export async function oauthCallbackV2(provider, { code, state }) {
  const options = {
    url: `/api/auth/v2/callback/${provider}`,
    method: "POST",
    data: { code, state, provider },
  }
  return api(options)
}

export async function resumeOrNewSession(sessionId) {
  const url = sessionId ?  "/api/auth/resumeOrNewSession" + "?sessionId=" + sessionId :  "/api/auth/resumeOrNewSession"
  return api( {
    url,
    method: "GET",
    timeout: 4000
  })

}

export async function signup(email, password) {
  const url =  "/api/auth/signup"
  return api({url, method: 'POST', data: {password,email}, timeout: 4000})
}

export async function login(body) {
  return api({
    url:   "/api/auth/login",
    method: "post",
    data: body,
    timeout: 4000,
  })
}

export async function logout() {
  return api( {url:  "/api/auth/logout", method: "get", timeout: 4000 })
}
