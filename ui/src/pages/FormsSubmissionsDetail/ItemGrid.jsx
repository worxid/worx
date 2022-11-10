// MUIS
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

const ItemGrid = (props) => {
  const { label, description, isSeparator, children } = props

  // STYLES
  const classes = useStyles()

  return (
    <>
      {isSeparator && (
        <Grid item xs={12} className={classes.gridItemSeparator}>
          <Divider/>
        </Grid>
      )}

      <Grid item xs={4}>
        <Typography variant='subtitle2' >{label}</Typography>

        <Typography
          variant='caption'
          color='text.secondary'
        >
          {description}
        </Typography>
      </Grid>

      <Grid item xs={8}>
        {children}
      </Grid>
    </>
  )
}

export default ItemGrid