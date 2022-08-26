// ASSETS
import LogoProductWithText from 'assets/images/logos/product-logo-with-text.svg'
import PictureComplementary from 'assets/images/pictures/authentication-complementary.svg'

// MUIS
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './authenticationUseStyles'

const AuthenticationHalf = (props) => {
  const { children } = props

  const classes = useStyles()

  return (
    <Grid 
      container
      className={`${classes.root} no-zoom`}
    >
      {/* SIDE CONTENT */}
      <Grid
        item
        xs={6}
        className={`${classes.content} ${classes.contentSide}`}
      >
        <Stack className={classes.containerText}>
          {/* TITLE */}
          <Typography
            variant='h5'
            className={`${classes.text} ${classes.textTitle}`}
          >
            Mobile Form System For Professional Field Workers
          </Typography>

          {/* CAPTION */}
          <Typography
            variant='subtitle1'
            className={classes.text}
          >
            A hassle-free mobile data collection and workforce management for any business and professional teams.
          </Typography>
        </Stack>

        {/* COMPLEMENTARY IMAGE */}
        <Box
          component='img'
          src={PictureComplementary}
          alt=''
          className={classes.pictureComplementary}
        />
      </Grid>

      {/* MAIN CONTENT */}
      <Grid
        item
        xs={6}
        className={`${classes.content} ${classes.contentMain} zoom`}
      >
        {/* PRODUCT LOGO */}
        <Box
          component='img'
          src={LogoProductWithText}
          alt=''
        />

        {/* CHILDREN CONTAINER */}
        <Stack className={classes.containerChildren}>
          {children}
        </Stack>

        {/* EMPTY BOX */}
        <Box/>
      </Grid>
    </Grid>
  )
}

export default AuthenticationHalf