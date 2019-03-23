export const randomise = () => {
  const options = [-1, 0, 1]
  return options[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
}
