import {api} from "boot/axios"


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
