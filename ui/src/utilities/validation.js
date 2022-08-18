// RAMDA
import { 
  equals, 
  isEmpty, 
  reject, 
} from 'ramda'

export const isObjectEmpty = (inputObject) => {
  return isEmpty(reject(equals(null), inputObject))
}