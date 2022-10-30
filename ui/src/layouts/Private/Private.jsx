import { useEffect, useContext } from 'react'

// COMPONENTS
import Drawer from 'components/Drawer/Drawer'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack'

// SERVICES
import { getUserDetails } from 'services/users'

// STYLES
import useStyles from './privateUseStyles'

// UTILITIES
import { setUserProfileToLocalStorage } from 'utilities/localStorage'
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const Private = (props) => {
  const { children } = props

  const classes = useStyles()

  const { auth, setAuth } = useContext(AllPagesContext)

  const axiosPrivate = useAxiosPrivate()

  const loadUserDetailsData = async (inputIsMounted, inputAbortController) => {
    const resultUserDetails = await getUserDetails(
      inputAbortController.signal,
      axiosPrivate,
    )

    if (didSuccessfullyCallTheApi(resultUserDetails.status) && inputIsMounted) {
      const userProfileObject = {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        user: resultUserDetails.data?.value
      }
      
      setUserProfileToLocalStorage(userProfileObject)
      setAuth(userProfileObject)
    }
  }

  useEffect(() => {
    let isMounted = true
    const abortController = new AbortController()

    loadUserDetailsData(isMounted, abortController)

    return () => {
      isMounted = false
      abortController.abort()
    }
  }, [])

  return (
    <Stack 
      direction='row'
      className={`${classes.root} no-zoom`}
    >
      <CssBaseline/>

      {/* DRAWER */}
      <Drawer/>

      {/* CONTENT CONTAINER */}
      <Stack
        component='main'
        className={`${classes.contentContainer} zoom`}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default Private