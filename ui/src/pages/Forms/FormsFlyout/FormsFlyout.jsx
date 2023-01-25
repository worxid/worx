import { useContext } from 'react'

// COMPONENTS
import Flyout from 'components/Flyout/Flyout'
import MainMenu from './MainMenu'
import Submissions from './Submissions'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// CUSTOM COMPONENTS
import CustomDialogContent from 'components/Customs/CustomDialogContent'
import CustomDialogTitle from 'components/Customs/CustomDialogTitle'

// MUIS
import Typography from '@mui/material/Typography'

const FormsFlyout = (props) => {
  const { 
    rows, 
    setGroupData, 
  } = props

  const { setIsFlyoutOpen } = useContext(PrivateLayoutContext)

  return (
    <Flyout 
      position='right'
      onCloseButtonClick={() => setIsFlyoutOpen(false)}
    >
      {/* TITLE */}
      <CustomDialogTitle>
        {/* TEXT */}
        <Typography 
          variant='h5' 
          className='fontWeight500'
          noWrap
        >
          {rows.length > 0 && rows[0].label}
        </Typography>
      </CustomDialogTitle>

      {/* CONTENT */}
      <CustomDialogContent>
        <MainMenu rows={rows} setGroupData={setGroupData}/>
        <Submissions rows={rows}/>
      </CustomDialogContent>
    </Flyout>
  )
}

export default FormsFlyout