import {api} from "boot/axios"
import {useAuthStore} from "src/auth/auth-store"

import {actions} from "src/constants"

export function joinTable(id, position) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.JOIN,
    tableId: id,
    position,
  })
}

export function navigateToLobby() {
  return useAuthStore().sendWebsocketMessage({
    WsNavigateToLobby: null,
    name: "lobby",
  })
}

export function navigateToTable(tableId) {
  return useAuthStore().sendWebsocketMessage({
    WsNavigateToTable: null,
    id: tableId,
  })
}

export function leave(id) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.LEAVE,
    tableId: id,
  })
}

export function fold(id) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.FOLD,
    tableId: id,
  })
}

export function call(id) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.CALL,
    tableId: id,
  })
}

export function check(id) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.CHECK,
    tableId: id,
  })
}
export function raise(id, amount) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.RAISE,
    tableId: id,
    amount,
  })
}
export function bet(id, amount) {
  return useAuthStore().sendWebsocketMessage({
    action: actions.BET,
    tableId: id,
    amount,
  })
}

export function changeName(name) {
  return useAuthStore().sendWebsocketMessage({ WsChangeName: null, name })
}

export function chatMessage(message, tableId) {
  return useAuthStore().sendWebsocketMessage({
    WsChatMessage: null,
    message,
    tableId,
  })
}

export async function authorize(provider = "google") {
  return api.get(`/api/auth/authorize/${provider}`).then((res) => {
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
  const url = sessionId
    ? "/api/auth/resumeOrNewSession" + "?sessionId=" + sessionId
    : "/api/auth/resumeOrNewSession"
  return api({
    url,
    method: "GET",
    timeout: 10000,
  })
}

export async function signup(email, password) {
  const url = "/api/auth/signup"
  return api({ url, method: "POST", data: { password, email }, timeout: 4000 })
}

export async function login(body) {
  return api({
    url: "/api/auth/login",
    method: "post",
    data: body,
    timeout: 4000,
  })
}

export async function logout() {
  return api({ url: "/api/auth/logout", method: "get", timeout: 4000 })
}
