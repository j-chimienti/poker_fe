const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
})

const formatterDecimal = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
})
export function formatToUSD(input, decimal = 0) {
  const number = parseFloat(input)
  if (isNaN(number))
    throw new Error("Invalid input. Please provide a valid number.")
  return decimal === 0
    ? formatter.format(number)
    : formatterDecimal.format(number)
}
