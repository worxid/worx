import { useContext } from 'react'

// COMPONENTS
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutHeader from 'components/Flyout/FlyoutHeader'
import MainMenu from './MainMenu'
import Submissions from './Submissions'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

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
      <FlyoutHeader>
        {/* TEXT */}
        <Typography 
          variant='h5' 
          className='fontWeight500'
          noWrap
        >
          {rows.length > 0 && rows[0].label}
        </Typography>
      </FlyoutHeader>

      {/* CONTENT */}
      <FlyoutContent>
        <MainMenu rows={rows} setGroupData={setGroupData}/>
        <Submissions rows={rows}/>
      </FlyoutContent>
    </Flyout>
  )
}

export default FormsFlyout