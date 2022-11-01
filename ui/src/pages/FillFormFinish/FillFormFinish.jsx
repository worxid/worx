import { useSearchParams } from 'react-router-dom'

// ASSETS
import IconSubmissionSuccess from 'assets/images/icons/submission-success.svg'

// MUIS
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './fillFormFinishUseStyles'

const FillFormFinish = () => {
  const classes = useStyles()

  // ROUTES
  const [ searchParams ] = useSearchParams()

  return (
    <Stack alignItems='center' className={classes.root}>
      <Box
        component='img'
        src={IconSubmissionSuccess}
        className={classes.iconSuccess}
      />

      <Typography variant='h4' className={classes.title}>Thank You!</Typography>
      <Typography variant='subtitle1' className={classes.description}>Your submission has been received</Typography>

      <Link href={`./fill-form?code=${searchParams.get('code')}`} fontWeight={500}>Submit Another Respone</Link>
    </Stack>
  )
}

export default FillFormFinish