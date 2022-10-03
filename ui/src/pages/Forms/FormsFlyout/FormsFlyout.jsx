// COMPONENTS
import MainMenu from './MainMenu'
import Submissions from './Submissions'

// MUIS
import Stack from '@mui/material/Stack'

const FormsFlyout = (props) => {
  const { rows, setGroupData } = props

  return (
    <Stack>
      <MainMenu rows={rows} setGroupData={setGroupData}/>
      <Submissions rows={rows}/>
    </Stack>
  )
}

export default FormsFlyout