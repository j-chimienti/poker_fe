import { v1 } from "uuid"
import { mapCardToImage } from "src/services/cardImageService"

const suitesMap = {
  diams: "diams",
  hearts: "hearts",
  spades: "spades",
  clubs: "clubs",
}

function findSuite(suite) {
  const fs = formatSuite(suite)
  return Object.keys(suitesMap).find((s) => fs.includes(s))
}
function formatSuite(suite) {
  if (suite.includes("diamond")) return "diams"
  else if (!suite.endsWith("s")) return suite + "s"
  return suite
}

function formatRank(value, face = null) {
  if (face !== null) return face[0].toLowerCase()
  else if (value === 1) return "a"
  else return value
}

/**
 * {"value":10,"suite":"diamond","face":"Jack"},{"value":6,"suite":"diamond","face":null}
 * @param suite
 * @param value
 * @param face
 * @returns {{image: (*), face: null, suite, formattedSuite: string, rank, formattedRank: (*|string), id: *, value}|{image: *, face: null, suite: null, formattedSuite: null, rank: null, formattedRank: null, id: *, faceDown: boolean, value: null}}
 * @constructor
 */
export default function Card({ suite, value, face = null }) {
  const isFaceDown = value === -1
  if (isFaceDown) return FaceDownCard()
  else {
    const formattedSuite = findSuite(suite)
    const formattedRank = formatRank(value, face)
    const image = mapCardToImage({ suite, value, face })
    return {
      id: v1(),
      suite,
      rank: value,
      value,
      face,
      formattedSuite,
      formattedRank,
      image,
    }
  }
}
import faceDownCardImg from "../assets/cards/Background_.png"

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
