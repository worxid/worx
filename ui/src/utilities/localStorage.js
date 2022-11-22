// TO DO: REPLACE THESE LOCAL STORAGE WITH COOKIES
const keyUserProfile = 'worx-user'
const keyDrawer = 'worx-drawer'

// USER PROFILE
export const setUserProfileToLocalStorage = (inputUserObject) => {
  localStorage.setItem(keyUserProfile, JSON.stringify(inputUserObject))
}

export const readUserProfileFromLocalStorage = () => {
  return localStorage.getItem(keyUserProfile)
    ? JSON.parse(localStorage.getItem(keyUserProfile))
    : {}
}

export const removeUserProfileFromLocalStorage = () => {
  return localStorage.removeItem(keyUserProfile)
}

/**
 * ex params: { expandParent: null/string, isDrawerExpanded: boolean, lastClicked: string }
 */
export const setDrawerToLocalStorage = (inputDrawerValue) => {
  localStorage.setItem(keyDrawer, JSON.stringify(inputDrawerValue))
}

export const readDrawerFromLocalStorage = () => {
  return localStorage.getItem(keyDrawer)
    ? JSON.parse(localStorage.getItem(keyDrawer))
    : {
      expandParent: null,
      isDrawerExpanded: true,
      lastClicked: 'parent',
    }
}