export const convertCamelCaseToSnakeCase = (key) => {
  return key.replace(/[A-Z]/g, (c) => {return '_' + c.toLowerCase()})
}

export const capitalizeEachWord = (inputString) => {
  if (!inputString || inputString === '') return ''
  return inputString
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}