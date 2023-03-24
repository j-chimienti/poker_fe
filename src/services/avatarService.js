import { get } from "lodash"
import austin from "assets/avatars/austin.jpeg"
import donald from "assets/avatars/donald-trump.png"
import wayne from "assets/avatars/wayne.jpeg"
import sean from "assets/avatars/sean_connery.jpeg"

const defaultImg = `https://cdn.quasar.dev/img/avatar1.jpg`
export function getAvatar(player) {
  if (!(player && player.picture)) return defaultImg
  const n = get(player, "name", "")
  if (n.includes("austin powers")) return austin
  else if (n.includes("donald trump")) return donald
  else if (n.includes("lil wayne")) return wayne
  else if (n.includes("sean connery")) return sean
  else return player.picture
}
