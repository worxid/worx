import { useState } from 'react'

// MUIS
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCalendarToday from '@mui/icons-material/CalendarToday'
import IconListAlt from '@mui/icons-material/ListAlt'
import IconLocationOn from '@mui/icons-material/LocationOn'
import IconWeb from '@mui/icons-material/Web'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getExpandOrCollapseIcon } from 'utilities/component'
import { convertDate } from 'utilities/date'

const FormsFlyout = (props) => {
  const { submissionDetail } = props
  const layoutClasses = useLayoutStyles()

  // INIT DETAIL OBJECT
  const initDetailObject = [
    {
      title: 'Form Name',
      key: 'label',
      icon: IconListAlt,
    },
    {
      title: 'Form Creation Date',
      key: 'created_on',
      icon: IconCalendarToday,
    },
    {
      title: 'Source',
      key: 'source',
      icon: IconWeb,
    },
    {
      title: 'Submission Date',
      key: 'submit_date',
      icon: IconCalendarToday,
    },
    {
      title: 'Submission Address',
      key: 'submit_location',
      icon: IconLocationOn,
    },
  ]

  // STATES
  const [ isMainMenuExpanded, setIsMainMenuExpanded ] = useState(true)
  const [ detailObject, setDetailObject ] = useState(initDetailObject)

  // GET VALUE BY KEY
  const getValueByKey = (item) => {
    return item.key === 'source' && submissionDetail?.[item.key]?.label?.replace(/_/, ' ')
    || item.key === 'submit_location' && submissionDetail?.[item.key]?.address
    || (item.key === 'created_on' || item.key === 'submit_date') && convertDate(submissionDetail?.[item.key])
    || item.key === 'label' && submissionDetail?.[item.key]
    || '-'
  }

  return (
    <Stack>
      <Stack 
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        marginBottom='8px'
      >
        {/* TITLE */}
        <Typography variant='subtitle1' className='fontWeight500'>
          Submission Info
        </Typography>

        {/* EXPAND/COLLAPSE ICON  */}
        <IconButton 
          size='small'
          onClick={() => setIsMainMenuExpanded(current => !current)}
        >
          {getExpandOrCollapseIcon(isMainMenuExpanded, 'small')}
        </IconButton>
      </Stack>

      {/* LIST */}
      <Collapse 
        in={isMainMenuExpanded} 
        timeout='auto' 
        unmountOnExit
      >
        <List>
          {detailObject.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
            >
              {/* ICON */}
              <ListItemIcon className={layoutClasses.flyoutListItemIcon}>
                <item.icon />
              </ListItemIcon>

              {/* TEXT */}
              <ListItemText
                primary={
                  <Typography 
                    variant='caption'
                    className='colorTextSecondary'
                    fontWeight={600}
                  >
                    {item.title}
                  </Typography>
                }
                secondary={(
                  <Typography variant='body2' noWrap={false} maxWidth='100%' width='100%'>
                    {getValueByKey(item)}
                  </Typography>
                )}
              />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </Stack>
  )
}

export default FormsFlyout