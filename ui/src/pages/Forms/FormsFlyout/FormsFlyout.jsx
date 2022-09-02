// COMPONENTS
import MainMenu from './MainMenu'
import Submissions from './Submissions'

const FormsFlyout = (props) => {
  const { rows } = props

  return (
    <>
      <MainMenu rows={rows}/>
      <Submissions rows={rows}/>
    </>
  )
}

export default FormsFlyout