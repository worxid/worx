// ASSETS
import logoWorx from 'assets/images/logos/product-logo-with-text-black.svg'

// COMPONENTS
import LoadingPaper from 'components/LoadingPaper/LoadingPaper'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './fillFormUseStyles'

const FillForm = (props) => {
  const { children } = props

  const classes = useStyles()

  return (
    <Stack 
      direction='column'
      className={`${classes.root} no-zoom`}
      alignItems='center'
    >
      <LoadingPaper isLoading={false} className={`${classes.content} zoom`}>
        {children}
      </LoadingPaper>

      {/* FOOTER */}
      <Stack className={`${classes.footer} zoom`} direction='row' alignItems='center'>
        <Stack flex={1}>
          <Link href='/'>
            <Box
              component='img'
              src={logoWorx}
              className={classes.footerLogo}
            />
          </Link>
        </Stack>

        <Typography
          variant='caption'
          color='text.secondary'
          className={classes.footerDescription}
        >
          Now create your own form - Free!
        </Typography>

        <Button
          variant='contained'
          size='small'
          className={`${classes.buttonRedPrimary} buttonGetStarted heightFitContent`}
          href='/sign-up'
        >
          Get Started
        </Button>
      </Stack>
    </Stack>
  )
}

export default FillForm