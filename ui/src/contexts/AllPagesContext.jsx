import { createContext, useState } from 'react'

// CONSTANTS
import { values } from 'constants/values'

// MUIS
import useMediaQuery from '@mui/material/useMediaQuery'

// UTILITIES
import { readUserProfileFromLocalStorage } from 'utilities/localStorage'

const AllPagesContext = createContext()

const AllPagesContextProvider = (props) => {
  // AUTH
  const [ auth, setAuth ] = useState(readUserProfileFromLocalStorage())

  // BREAKPOINT
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.only('xs'))
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.only('sm'))
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.only('md'))
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.only('lg'))
  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.only('xl'))

  // BREAKPOINT ZOOM
  const isZoomBoundary = useMediaQuery(values.zoomBoundary)
  const isNoZoomBoundary = useMediaQuery(values.noZoomBoundary)
  // return true if in screen zoom boundary
  const breakpointZoomBoundary = (isZoomBoundary && !isNoZoomBoundary) ? isZoomBoundary : false

  let breakpointType
  isXsScreen && (breakpointType = 'xs')
  isSmScreen && (breakpointType = 'sm')
  isMdScreen && (breakpointType = 'md')
  isLgScreen && (breakpointType = 'lg')
  isXlScreen && (breakpointType = 'xl')

  // SNACKBAR
  const [ snackbarObject, setSnackbarObject ] = useState(values.initialSnackbarObject)

  return (
    <AllPagesContext.Provider
      value={{
        // AUTH
        auth, setAuth,
        // BREAKPOINT
        breakpointType,
        breakpointZoomBoundary,
        // SNACKBAR
        snackbarObject, setSnackbarObject,
      }}
    >
      {props.children}
    </AllPagesContext.Provider>
  )
}

export { AllPagesContextProvider, AllPagesContext }