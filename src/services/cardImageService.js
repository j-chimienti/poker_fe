import Diamond_6 from "../assets/cards/Diamond-6.png"
import Diamond_7 from "../assets/cards/Diamond-7.png"
import Heart_Ace from "../assets/cards/Heart Ace.png"
import Diamond_5 from "../assets/cards/Diamond-5.png"
import Spade_Ace from "../assets/cards/Spade Ace.png"
import Diamond_4 from "../assets/cards/Diamond-4.png"
import Diamond_10 from "../assets/cards/Diamond-10.png"
import Heart_10 from "../assets/cards/Heart-10.png"
import Club_9 from "../assets/cards/Club-9.png"
import Spade_King from "../assets/cards/Spade King.png"
import Heart_Jack from "../assets/cards/Heart Jack.png"
import Diamond_3 from "../assets/cards/Diamond-3.png"
import Diamond_2 from "../assets/cards/Diamond-2.png"
import Club_10 from "../assets/cards/Club-10.png"
import Club_8 from "../assets/cards/Club-8.png"
import Spade_5 from "../assets/cards/Spade-5.png"
import Heart_7 from "../assets/cards/Heart-7.png"
import Heart_6 from "../assets/cards/Heart-6.png"
import Spade_4 from "../assets/cards/Spade-4.png"
import Spade_6 from "../assets/cards/Spade-6.png"
import Club_King from "../assets/cards/Club King.png"
import Diamond_Jack from "../assets/cards/Diamond Jack.png"
import Heart_4 from "../assets/cards/Heart-4.png"
import Heart_5 from "../assets/cards/Heart-5.png"
import Club_Queen from "../assets/cards/Club Queen.png"
import Spade_7 from "../assets/cards/Spade-7.png"
import Spade_3 from "../assets/cards/Spade-3.png"
import Spade_2 from "../assets/cards/Spade-2.png"
import Heart_2 from "../assets/cards/Heart-2.png"
import Diamond_Ace from "../assets/cards/Diamond Ace.png"
import Diamond_Queen from "../assets/cards/Diamond Queen.png"
import Heart_3 from "../assets/cards/Heart-3.png"
import Heart_Queen from "../assets/cards/Heart Queen.png"
import Heart_8 from "../assets/cards/Heart-8.png"
import Club_Ace from "../assets/cards/Club Ace.png"
import Heart_9 from "../assets/cards/Heart-9.png"
import Spade_9 from "../assets/cards/Spade-9.png"
import Spade_Jack from "../assets/cards/Spade Jack.png"
import Spade_10 from "../assets/cards/Spade-10.png"
import Heart_King from "../assets/cards/Heart King.png"
import Spade_8 from "../assets/cards/Spade-8.png"
import Club_5 from "../assets/cards/Club-5.png"
import Club_4 from "../assets/cards/Club-4.png"
import Club_6 from "../assets/cards/Club-6.png"
import Club_Jack from "../assets/cards/Club Jack.png"
import Diamond_King from "../assets/cards/Diamond King.png"
import Club_7 from "../assets/cards/Club-7.png"
import Club_3 from "../assets/cards/Club-3.png"
import Diamond_9 from "../assets/cards/Diamond-9.png"
import Diamond_8 from "../assets/cards/Diamond-8.png"
import Club_2 from "../assets/cards/Club-2.png"
import Spade_Queen from "../assets/cards/Spade Queen.png"

export const cardImages = [
  { name: "Diamond_6", image: Diamond_6 },
  { name: "Diamond_7", image: Diamond_7 },
  { name: "Heart_Ace", image: Heart_Ace },
  { name: "Diamond_5", image: Diamond_5 },
  { name: "Spade_Ace", image: Spade_Ace },
  { name: "Diamond_4", image: Diamond_4 },
  { name: "Diamond_10", image: Diamond_10 },
  { name: "Heart_10", image: Heart_10 },
  { name: "Club_9", image: Club_9 },
  { name: "Spade_King", image: Spade_King },
  { name: "Heart_Jack", image: Heart_Jack },
  { name: "Diamond_3", image: Diamond_3 },
  { name: "Diamond_2", image: Diamond_2 },
  { name: "Club_10", image: Club_10 },
  { name: "Club_8", image: Club_8 },
  { name: "Spade_5", image: Spade_5 },
  { name: "Heart_7", image: Heart_7 },
  { name: "Heart_6", image: Heart_6 },
  { name: "Spade_4", image: Spade_4 },
  { name: "Spade_6", image: Spade_6 },
  { name: "Club_King", image: Club_King },
  { name: "Diamond_Jack", image: Diamond_Jack },
  { name: "Heart_4", image: Heart_4 },
  { name: "Heart_5", image: Heart_5 },
  { name: "Club_Queen", image: Club_Queen },
  { name: "Spade_7", image: Spade_7 },
  { name: "Spade_3", image: Spade_3 },
  { name: "Spade_2", image: Spade_2 },
  { name: "Heart_2", image: Heart_2 },
  { name: "Diamond_Ace", image: Diamond_Ace },
  { name: "Diamond_Queen", image: Diamond_Queen },
  { name: "Heart_3", image: Heart_3 },
  { name: "Heart_Queen", image: Heart_Queen },
  { name: "Heart_8", image: Heart_8 },
  { name: "Club_Ace", image: Club_Ace },
  { name: "Heart_9", image: Heart_9 },
  { name: "Spade_9", image: Spade_9 },
  { name: "Spade_Jack", image: Spade_Jack },
  { name: "Spade_10", image: Spade_10 },
  { name: "Heart_King", image: Heart_King },
  { name: "Spade_8", image: Spade_8 },
  { name: "Club_5", image: Club_5 },
  { name: "Club_4", image: Club_4 },
  { name: "Club_6", image: Club_6 },
  { name: "Club_Jack", image: Club_Jack },
  { name: "Diamond_King", image: Diamond_King },
  { name: "Club_7", image: Club_7 },
  { name: "Club_3", image: Club_3 },
  { name: "Diamond_9", image: Diamond_9 },
  { name: "Diamond_8", image: Diamond_8 },
  { name: "Club_2", image: Club_2 },
  { name: "Spade_Queen", image: Spade_Queen },
]

export function mapCardToImage(card) {
  const { value, suite, face } = card
  const s = suite[0].toUpperCase() + suite.substring(1)
  if (face === null) {
    const name = `${s}_${value}`
    return cardImages.find((c) => c.name === name).image
  } else {
    const f = face[0].toUpperCase() + face.substring(1)
    const name = `${s}_${f}`
    return cardImages.find((c) => c.name === name).image
  }
}
