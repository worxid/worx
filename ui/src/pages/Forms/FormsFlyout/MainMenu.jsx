import { useContext } from 'react'

// COMPONENTS
import CellGroups from 'components/DataGridRenderCell/CellGroups'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCalendarToday from '@mui/icons-material/CalendarToday'
import IconGroups from '@mui/icons-material/Groups'
import IconViewHeadline from '@mui/icons-material/ViewHeadline'

// STYLES
import useStyles from './formsFlyoutUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'
import { Chip } from '@mui/material'

const MainMenu = (props) => {
  const { rows } = props

  const classes = useStyles()
  const mainMenuIconList = [
    <IconGroups className={classes.flyoutIconInfo} />,
    <IconCalendarToday className={classes.flyoutIconInfo} />,
    <IconCalendarToday className={classes.flyoutIconInfo} />,
    <IconViewHeadline className={classes.flyoutIconInfo} />,
  ]

  const menuKey = ['assigned_groups', 'created_on', 'modified_on', 'fields_size']
  const menuLabel = ['Groups', 'Form Date Created', 'Form Date Updated', 'Field']

  return (
    <Stack className={classes.flyoutBoxInfo}>
      <List>
        {menuLabel.map((name, index) => (
          <ListItem className={classes.flyoutInfoItem} key={index}>
            <Stack direction='row' alignItems='center'>
              {mainMenuIconList[index]}

              <Typography variant='body2' className={classes.flyoutTitleInfo}>
                {name}
              </Typography>
            </Stack>

            <Typography variant='body1' className={classes.flyoutDescInfo}>
              {index === 0 && rows[0]?.[menuKey[index]].map(itemGroup => (
                <Chip key={itemGroup.id} label={itemGroup?.name} className={classes.flyoutGroupChip}/>
              ))}
              {(index === 1 || index === 2) && convertDate(rows[0]?.[menuKey[index]])}
              {index === 3 && rows[0]?.[menuKey[index]]}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MainMenu