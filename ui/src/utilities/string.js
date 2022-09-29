export const camelToSnake = (key) => {
  return key.replace(/[A-Z]/g, (c) => {return '_' + c.toLowerCase()})
}