import {boot} from "quasar/wrappers"
import {Notify} from "quasar";
import {Plugins} from '@capacitor/core';
import {useAuthStore} from "stores/auth-store";
import {confirmRefreshPage} from "boot/routerHooks";

const { App } = Plugins;

export default boot(({ router }) => {

  App.addListener('appUrlOpen', async function (event) {
    // Example url: https://bjack.space/callback
    // slug = /callback
    // We only push to the route if there is a slug present
    const params = new URLSearchParams(new URL(event.url).search)
    const obj = {
      name: "callback",
      query: {
        code: params.get("code"),
        state: params.get("state"),
      }
    }
    if (event.url.includes("/callback")) {
      if (obj.query.code && obj.query.state) {
        const r = await useAuthStore().oauthCallback(obj.query)
        if (!r) confirmRefreshPage()
      } else Notify.create("cannot find query params code and state")
    } else Notify.create("ignoring appUrlOpen event=" + event)
  })
})
