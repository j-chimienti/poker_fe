import { v1 } from "uuid"
import { mapCardToImage } from "src/services/cardImageService"
import faceDownCardImg from "../assets/playing-cards/Card Back.png"
import { faceCards } from "src/services/constants"

const symbolsMap = { "♦": "diamond", "♥": "heart", "♠": "spade", "♣": "club" }
function parse(cardString) {
  const rank = cardString.slice(0, -1)
  const suit = cardString.slice(-1)

  return [rank, suit]
}
function parseCardString(s) {
  const [rank, suite] = parse(s)
  const isFace = faceCards.includes(rank)
  return Card({
    suite: symbolsMap[suite],
    value: isFace ? null : Number(rank),
    face: isFace ? rank : null,
  })
}

/**
 * 10♥,8♥,K♥
 * {"value":10,"suite":"diamond","face":"Jack"},{"value":6,"suite":"diamond","face":null}
 * @param suite
 * @param value
 * @param face
 * @returns {{image: (*), face: null, suite, formattedSuite: string, rank, formattedRank: (*|string), id: *, value}|{image: *, face: null, suite: null, formattedSuite: null, rank: null, formattedRank: null, id: *, faceDown: boolean, value: null}}
 * @constructor
 */
export default function Card(obj) {
  if (typeof obj === "string") return parseCardString(obj)
  const { suite, value, face = null } = obj
  const isFaceDown = value === -1
  if (isFaceDown) return FaceDownCard()
  else {
    // const formattedSuite = findSuite(suite)
    // const formattedRank = formatRank(value, face)
    const image = mapCardToImage({ suite, value, face })
    return {
      id: v1(),
      suite,
      rank: value,
      // value,
      face,
      // formattedSuite,
      // formattedRank,
      image,
    }
  }
}

export function FaceDownCard() {
  return {
    id: v1(),
    suite: null,
    rank: null,
    value: null,
    face: null,
    formattedSuite: null,
    formattedRank: null,
    image: faceDownCardImg,
    faceDown: true,
  }
}
