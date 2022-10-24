import { useContext } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// SERVICES
import { postRefreshToken } from 'services/users'

// UTILS
import { signOutUser } from 'utilities/authentication'

const useRefreshToken = () => {
  const { auth, setAuth } = useContext(AllPagesContext)

  const refreshToken = async () => {
    const responseRefreshToken = await postRefreshToken(auth?.refreshToken)

    if (responseRefreshToken.status === 200) {
      setAuth(current => {
        return {
          ...current,
          accessToken: responseRefreshToken?.data?.data?.accessToken,
        }
      })

      return responseRefreshToken?.data?.data?.accessToken
    }
    else signOutUser(setAuth)
  }

  return refreshToken
}

export default useRefreshToken