export const abbreviateNumber = (inputNumber) => {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(inputNumber)
}