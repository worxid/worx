import { useContext } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// SERVICES
import { postRefreshToken } from 'services/users'

// UTILS
import { signOutUser } from 'utilities/authentication'
import { setUserProfileToLocalStorage } from 'utilities/localStorage'

const useRefreshToken = () => {
  const { 
    auth, setAuth, 
    setSnackbarObject,
  } = useContext(AllPagesContext)

  const refreshToken = async () => {
    const resultRefreshToken = await postRefreshToken(auth?.refreshToken)

    if (resultRefreshToken.status === 200) {
      setUserProfileToLocalStorage({
        ...auth,
        accessToken: resultRefreshToken?.data?.data?.accessToken,
      })

      setAuth(current => {
        return {
          ...current,
          accessToken: resultRefreshToken?.data?.data?.accessToken,
        }
      })

      return resultRefreshToken?.data?.data?.accessToken
    }
    else if (resultRefreshToken.status === 400) {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: '',
        message: 'Sorry, your session has expired',
      })
      
      signOutUser(setAuth)
    }
  }

  return refreshToken
}

export default useRefreshToken