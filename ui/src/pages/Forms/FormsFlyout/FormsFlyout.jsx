// COMPONENTS
import MainMenu from './MainMenu'
import Submissions from './Submissions'

// MUIS
import Stack from '@mui/material/Stack'

const FormsFlyout = (props) => {
  const { rows } = props

  return (
    <Stack>
      <MainMenu rows={rows}/>
      <Submissions rows={rows}/>
    </Stack>
  )
}

export default FormsFlyout