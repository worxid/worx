// RAMDA
import { 
  equals, 
  isEmpty, 
  reject, 
} from 'ramda'

export const isObjectEmpty = (inputObject) => {
  return isEmpty(reject(equals(null), inputObject))
}

export const doesObjectContainDesiredValue = (inputObject, inputValue) => {
  // MUST USE FILTER FUNCTION INSTEAD OF USING FIND FUNCTION
  const resultList = Object.values(inputObject).filter(item => item === inputValue)
  
  if (resultList.length > 0) return true
  else return false
}

export const didSuccessfullyCallTheApi = (inputStatus) => {
  const successRegex = /^20[0-9]$/
  return successRegex.test(inputStatus)
}