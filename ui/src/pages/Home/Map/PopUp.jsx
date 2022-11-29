// MUIS
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconAccessTime from '@mui/icons-material/AccessTime'
import IconInsertLink from '@mui/icons-material/InsertLink'
import IconLocationOn from '@mui/icons-material/LocationOn'
import IconPhoneAndroid from '@mui/icons-material/PhoneAndroid'

const Popup = (props) => {
  const { 
    markerData, 
    classes,
  } = props

  const informationList = [
    {
      type: 'link',
      icon: IconInsertLink,
      text: markerData.id ?? 'No data',
    },
  ]

  return (
    <Box className={classes.popUpContainer}>
      {/* CONTENT */}
      {informationList.map((item, index) => (
        <Box
          key={index}
          className={classes.popUpListItem}
        >
          {/* ICON */}
          <item.icon className={classes.popUpListItemIcon}/>

          {/* TEXT */}
          {item.type === 'text' &&
          <Typography 
            variant='caption'
            className='textCapitalize'
          >
            {item.text}
          </Typography>}
          
          {/* LINK */}
          {item.type === 'link' &&
          <Link
            href='/dummy-link'
            underline='hover'
            className={classes.popUpListItemLink}
          >
            {item.text}
          </Link>}
        </Box>
      ))}
    </Box>
  )
}

export default Popup