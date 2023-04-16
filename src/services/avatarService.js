import defaultImg from "assets/avatar.png"

export function getAvatar(player) {
  if (!(player && player.picture)) return defaultImg
  else return player.picture
}
