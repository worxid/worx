import { useEffect, useContext } from 'react'

// APIS
import { axiosPrivate } from 'apis/axios'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useRefreshToken from 'hooks/useRefreshToken'

const useAxiosPrivate = () => {
  const refreshToken = useRefreshToken()

  const { auth } = useContext(AllPagesContext)

  useEffect(() => {
    const requestIntercept = axiosPrivate?.interceptors?.request?.use(
      config => {
        if (!config?.headers['Authorization']) config.headers['Authorization'] = `Bearer ${auth?.accessToken}`

        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = axiosPrivate?.interceptors?.response?.use(
      response => response,
      async (error) => {
        const previousRequest = error?.config

        if ((error?.response?.status === 401) && !previousRequest?.sent) {
          previousRequest.sent = true
          const newAccessToken = await refreshToken()
          previousRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

          return axiosPrivate(previousRequest)
        }
        
        return Promise.reject(error)
      }
    )

    return () => {
      axiosPrivate?.interceptors?.request?.eject(requestIntercept)
      axiosPrivate?.interceptors?.request?.eject(responseIntercept)
    }
  }, [auth, refreshToken])

  return axiosPrivate
}

export default useAxiosPrivate