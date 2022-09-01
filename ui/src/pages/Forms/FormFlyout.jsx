import { useState } from 'react'

// MUIS
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconKeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import IconKeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'

const FormFlyout = (props) => {
  const [ isMainMenuExpanded, setIsMainMenuExpanded ] = useState(false)

  const getExpandOrCollapseIcon = (inputState) => {
    if (inputState) return <IconKeyboardArrowUp fontSize='small'/>
    else return <IconKeyboardArrowDown fontSize='small'/>
  } 
  
  return (
    <>
      {/* MAIN MENU HEADER */}
      <Stack 
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        {/* TITLE */}
        <Typography
          variant='subtitle1'
          className='fontWeight500'
        >
          Main Menu
        </Typography>

        {/*EXPAND/COLLAPSE ICON  */}
        <IconButton 
          size='small'
          onClick={() => setIsMainMenuExpanded(current => !current)}
        >
          {getExpandOrCollapseIcon(isMainMenuExpanded)}
        </IconButton>
      </Stack>
    </>
  )
}

export default FormFlyout