// TO DO: REPLACE THESE LOCAL STORAGE WITH COOKIES
const keyUserProfile = 'worx-user'

// USER PROFILE
export const setUserProfileToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyUserProfile, JSON.stringify(inputUserObject))
}

export const readUserProfileFromLocalStorage = () => {
  return localStorage.getItem(keyUserProfile)
    ? JSON.parse(localStorage.getItem(keyUserProfile))
    : {a: 'a'}
}

export const removeUserProfileFromLocalStorage = () => {
  return localStorage.removeItem(keyUserProfile)
}