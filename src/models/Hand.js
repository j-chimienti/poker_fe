// nameOf(o.cards) -> o.cards,
//       nameOf(o.isBust _) -> o.isBust,
//       nameOf(o.isBlackJack _) -> o.isBlackJack,
//       nameOf(o.softTotal _) -> o.softTotal,
//       nameOf(o.hardTotal _) -> o.hardTotal(),

import Card from "src/models/Card";

export function Hand({cards, isBust, isBlackJack, softTotal, hardTotal}) {
  return {cards: cards.map((c, i) => new Card(c)), isBust, isBlackJack, softTotal, hardTotal}
}
