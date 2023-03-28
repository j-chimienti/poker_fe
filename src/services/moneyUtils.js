const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})
export function formatToUSD(input) {
  const number = parseFloat(input)
  if (isNaN(number))
    throw new Error("Invalid input. Please provide a valid number.")
  return formatter.format(number)
}
