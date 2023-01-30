import { useContext } from 'react'

// COMPONENTS
import Flyout from 'components/Flyout/Flyout'
import FlyoutContent from 'components/Flyout/FlyoutContent'
import FlyoutHeader from 'components/Flyout/FlyoutHeader'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Typography from '@mui/material/Typography'

const SubmissionDetailFlyout = () => {
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
          This is the title
        </Typography>
      </FlyoutHeader>

      {/* CONTENT */}
      <FlyoutContent>
        This is the content
      </FlyoutContent>
    </Flyout>
  )
}

export default SubmissionDetailFlyout