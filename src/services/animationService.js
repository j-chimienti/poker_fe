import { gsap } from "gsap"

// Coordinates for the dealer's position
const dealerX = "50vw" // Center of the table in viewport width
const dealerY = "-75vh" // Center of the table in viewport height

export const onEnterCommunityCards = (el, done) => {
  const delay = el.dataset.index * 0.1
  gsap.fromTo(
    el,
    { x: dealerX, y: dealerY, rotation: -90, opacity: 0 },
    {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      delay,
      duration: 0.5,
      ease: "power2.out",
      onComplete: done,
    }
  )
}

export const onEnterDownCards = (el, done) => {
  // Set the initial position and opacity
  gsap.set(el, {
    x: dealerX,
    y: dealerY,
    opacity: 0,
    scale: 0.5,
  })

  // Animate the card to each player's position
  gsap.to(el, {
    scale: 1,
    x: 0, // End at the player's position (adjust if needed)
    y: 0, // End at the player's position (adjust if needed)
    opacity: 1,
    duration: 0.8, // Duration of the animation
    ease: "power3.out", // Smooth easing
    onComplete: done,
  })
}

export const onEnterMyCards = (el, done) => {
  // Delay based on the card's index to create a staggered effect
  const delay = el.dataset.index * 0.1

  const startingOptions = {
    rotationY: -180,
    transformOrigin: "center",
    x: dealerX,
    y: dealerY,
    opacity: 0,
    scale: 0.5, // Optional: Make the card appear to move away
  }
  // Animate the card to flip over
  gsap.fromTo(el, startingOptions, {
    rotationY: 0,
    scale: 1,
    opacity: 1,
    x: 0,
    y: 0,
    delay,
    duration: 0.8,
    ease: "power3.out", // Smoother easing without a bounce
    // ease: "back.out(1.7)", // Back easing for a slight overshoot effect
    onComplete: done,
  })
}

export const onLeaveCommunityCards = (el, done) => {
  gsap.to(el, {
    x: dealerX,
    y: dealerY,
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
    ease: "power2.in",
    onComplete: done,
  })
}

export const onLeaveCards = (el, done) => {
  // Fast movement to simulate folding
  gsap.to(el, {
    x: dealerX, // Move off to the right side quickly
    y: dealerY,
    rotation: 180, // Optional: Add a spin effect
    scale: 0.5, // Optional: Make the card appear to move away
    opacity: 0,
    duration: 0.5, // Quick transition
    ease: "power3.in", // Fast starting and smooth end
    onComplete: done,
  })
}
