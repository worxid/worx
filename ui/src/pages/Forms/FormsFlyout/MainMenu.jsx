// COMPONENTS
import FlyoutInformationGroup from 'components/FlyoutInformationGroup/FlyoutInformationGroup'

// MUIS
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCalendarToday from '@mui/icons-material/CalendarToday'
import IconViewHeadline from '@mui/icons-material/ViewHeadline'

// STYLES
import useStyles from './formsFlyoutUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'

const MainMenu = (props) => {
  const { 
    rows, 
    setMenuChangeGroupAnchorElement,
  } = props

  const selectedRow = rows[0]

  const classes = useStyles()
  const mainMenuIconList = [
    <IconCalendarToday className={classes.flyoutIconInfo} />,
    <IconCalendarToday className={classes.flyoutIconInfo} />,
    <IconViewHeadline className={classes.flyoutIconInfo} />,
  ]

  const menuKey = ['assigned_groups', 'created_on', 'modified_on', 'fields_size']
  const menuLabel = ['Form Date Created', 'Form Date Updated', 'Field']

  return (
    <Stack className={classes.flyoutBoxInfo}>
      <List>
        {/* GROUP INFORMATION */}
        <FlyoutInformationGroup
          value={selectedRow?.assigned_groups.map(item => ({ name: item.name }))}
          onEditButtonClick={(event) => setMenuChangeGroupAnchorElement(event.currentTarget)}
          className={classes.flyoutItemGroup}
        />

        {menuLabel.map((name, index) => (
          <ListItem className={classes.flyoutInfoItem} key={index}>
            <Stack direction='row' alignItems='center'>
              {mainMenuIconList[index]}

              <Typography variant='body2' className={classes.flyoutTitleInfo}>
                {name}
              </Typography>
            </Stack>

            <Typography variant='body1' className={classes.flyoutDescInfo}>
              {index === 0 && selectedRow?.[menuKey[index]].map(itemGroup => (
                <Chip key={itemGroup.id} label={itemGroup?.name} className={classes.flyoutGroupChip}/>
              ))}
              {(index === 0 && selectedRow?.[menuKey[index]].length === 0) && (
                <Chip label='Default' className={classes.flyoutGroupChip}/>
              )}
              {(index === 1 || index === 2) && convertDate(selectedRow?.[menuKey[index]])}
              {index === 3 && selectedRow?.[menuKey[index]]}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default MainMenu