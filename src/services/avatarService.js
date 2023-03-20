import { get } from "lodash"
import austin from "assets/avatars/austin.jpeg"
import donald from "assets/avatars/donald-trump.png"
import wayne from "assets/avatars/wayne.jpeg"
import sean from "assets/avatars/sean_connery.jpeg"

export function getAvatar(player) {
  const n = player.name
  if (n.includes("austin")) return austin
  else if (n.includes("donald")) return donald
  else if (n.includes("wayne")) return wayne
  else if (n.includes("sean")) return sean
  else
    return get(
      player,
      "picture",
      `https://cdn.quasar.dev/img/avatar${player.position}.jpg`
    )
}
