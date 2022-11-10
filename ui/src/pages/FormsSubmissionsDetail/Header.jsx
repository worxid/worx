// MUIS
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconDownload from '@mui/icons-material/Download'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

const Header = (props) => {
  const { title } = props

  // STYLES
  const classes = useStyles()

  return (
    <Stack
      className={classes.header}
      direction='row'
      alignItems='center'
    >
      {/* TITLE */}
      <Typography
        className={classes.headerTitle}
        variant='subtitle1'
      >
        {title}
      </Typography>

      {/* BUTTON DOWNLOAD */}
      <IconButton>
        <IconDownload />
      </IconButton>
    </Stack>
  )
}

export default Header