import { useLocation } from 'react-router-dom'

// DEFAULT IMAGE
import defaultImg from 'assets/images/pictures/errorImg.svg'

// MUIS
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLE
import useStyles from './errorUseStyles'

const Error = () => {
  const classes = useStyles()

  const location = useLocation()

  let title = 'Oops! Something went wrong.'
  let caption = `We’re sorry, the page you requested could not be found.
  Please go `

  if (location?.state?.code === 404) {
    title = 'Not Found'
    caption = `We’re sorry, the page you requested could not be found.
    Please go `
  }
  
  return (
    <Container className={`${classes.mainContainer} containerMaxWidth1400`}>
      <Stack 
        alignItems='center' 
        justifyContent='center' 
        className={classes.root}
      >
        {/* IMAGE */}
        <Box
          component='img'
          src={defaultImg}
          alt='Error'
          className={`${classes.img} width100`}
        />

        {/* TITLE */}
        <Typography 
          variant='h4'
          className={classes.title}
        >
          {title}
        </Typography>

        {/* CAPTION */}
        <Typography 
          variant='h5'
          className={classes.caption}
        >
          {/* CAPTION */}
          {caption}

          {/* HOMEPAGE LINK */}
          to the&nbsp;
          <Link href='/'>
            homepage
          </Link>
          .
        </Typography>
      </Stack>
    </Container>
  )
}

export default Error