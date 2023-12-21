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
  return {
    suite: symbolsMap[suite],
    value: isFace ? null : Number(rank),
    face: isFace ? rank : null,
  }
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
export default class Card {
  constructor(inputString) {
    const { suite, value, face } = parseCardString(inputString)
    const isFaceDown = value === -1
    if (isFaceDown) return new FaceDownCard()
    const image = mapCardToImage({ suite, value, face })
    this.suite = suite
    this.rank = value
    this.face = face
    this.image = image
    this.isFaceDown = false
    this.id = `${suite}${value}${face}`
  }
  equals(other) {
    return (
      other instanceof Card &&
      other.suite === this.suite &&
      other.rank === this.rank &&
      other.face === this.face
    )
  }
}

export class FaceDownCard {
  constructor() {
    this.suite = null
    this.rank = null
    this.face = null
    this.image = faceDownCardImg
    this.isFaceDown = true
    this.id = "facedown-" + v1()
  }
  // You can override the equals method if needed
  // For example, you might want to compare only the isFaceDown property
  equals(other) {
    return other instanceof FaceDownCard
  }
}
