
// DEFAULT IMAGE
import defaultImg from 'assets/images/pictures/errorImg.svg'

// MUIS
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLE
import useStyles from './errorUseStyles'

const Error = () => {
  const classes = useStyles()
  return (
    <Container className={`${classes.mainContainer} containerMaxWidth1400`}>
      <Stack alignItems={'center'} justifyContent={'center'} className={classes.root}>
        <Box
          component='img'
          src={defaultImg}
          alt={'Error'}
          className={`${classes.img} width100`}
        />
        <Typography 
          variant='h4'
          className={classes.title}
        >
          Oops! Something went wrong.
        </Typography>
        <Typography 
          variant='h5'
          className={classes.caption}
        >
          We’re sorry, the page you requested could not be found.<br/>
          Please go back to the homepage.
        </Typography>
      </Stack>
    </Container>
  )
}

export default Error