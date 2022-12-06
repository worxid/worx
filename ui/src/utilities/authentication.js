// UTILITIES
import { removeUserProfileFromLocalStorage } from 'utilities/localStorage'

export const signOutUser = (setAuth) => {
  removeUserProfileFromLocalStorage()
  setAuth({})
}