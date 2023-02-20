import { TweenLite } from "gsap/TweenLite"

export function tween(element, from, to, duration, cb) {
  if (!element) {
    throw new Error("NO ELEMENT")
  }
  // if (typeof element === "string") {
  //     element = document.getElementById(element)
  // }
  const counter = { var: from }

  return TweenLite.to(counter, duration, {
    var: parseInt(to),
    onUpdate: function () {
      element.innerText = parseInt(counter.var).toLocaleString()
    },
    onComplete: function () {
      console.log("done tween")
      cb && typeof cb === "function" && cb()
    },
    // ease: Circ.easeOut
  })
}
