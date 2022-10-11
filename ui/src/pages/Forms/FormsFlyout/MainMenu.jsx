import { useContext, useState } from 'react'

// COMPONENTS
import CellGroups from 'components/DataGridRenderCell/CellGroups'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconCheckCircle from '@mui/icons-material/CheckCircle'
import IconDateRange from '@mui/icons-material/DateRange'
import IconEventNote from '@mui/icons-material/EventNote'
import IconGroups from '@mui/icons-material/Groups'
import IconNotes from '@mui/icons-material/Notes'
import IconTextSnippet from '@mui/icons-material/TextSnippet'
import IconViewHeadline from '@mui/icons-material/ViewHeadline'

// STYLES
import useLayoutStyles from 'styles/layoutPrivate'

// UTILITIES
import { getExpandOrCollapseIcon } from 'utilities/component'
import { convertDate } from 'utilities/date'

const MainMenu = (props) => {
  const { rows, setGroupData } = props

  const layoutClasses = useLayoutStyles()

  const { setIsDialogFormOpen } = useContext(PrivateLayoutContext)

  const mainMenuIconList = [
    IconTextSnippet,
    IconNotes,
    IconEventNote,
    IconDateRange,
    IconGroups,
    IconCheckCircle,
    IconTextSnippet,
    IconViewHeadline,
  ]

  const mainMenuTitleList = [
    'Form Title', 'Description', 'Created', 'Modified', 'Groups', 'Submissions', 'Default Form', 'Fields'
  ]

  let mainMenuList = []
  if (rows.length === 1) {
    mainMenuList = Object.keys(rows[0])
      .filter(key => {
        return key !== 'id' && key !== 'fields' && key !== 'submit_in_zone'
      })
      .map((key, index) => {
        if(key === 'default') {
          return {
            title: mainMenuTitleList[index],
            value: rows[0][key] ? 'Yes' : 'No',
            icon: mainMenuIconList[index],
          }
        } else if(key === 'modified_on' || key === 'created_on') {
          return {
            title: mainMenuTitleList[index],
            value: convertDate(rows[0][key]),
            icon: mainMenuIconList[index],
          }
        } else {
          return {
            title: mainMenuTitleList[index],
            value: rows[0][key],
            icon: mainMenuIconList[index],
          }
        }
        
      })
  }

  const [ isMainMenuExpanded, setIsMainMenuExpanded ] = useState(true)

  const handleChangeGroup = () => {
    setGroupData(rows[0].assigned_groups)
    setIsDialogFormOpen(true)
  }

  return (
    <>
      {/* HEADER */}
      <Stack 
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        marginBottom='8px'
      >
        {/* TITLE */}
        <Typography
          variant='subtitle1'
          className='fontWeight500'
        >
          Main Menu
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
        {rows.length === 1 &&
        <List>
          {mainMenuList.map((item, index) => (
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
                  >
                    {item.title}
                  </Typography>
                }
                secondary={
                  item.title === 'Groups' 
                    ? <Stack className='colorTextPrimary'>
                      <CellGroups dataValue={item.value} limitShowGroup={false} />
                    </Stack>
                    : (<Typography variant='body2'>
                      {item.value}
                    </Typography>)
                }
              />

              {/* ACTION */}
              {item.title === 'Form Title' &&
              <Button
                variant='contained'
                className={layoutClasses.flyoutListItemActionButton}
                onClick={handleChangeGroup}
              >
                Change Group
              </Button>}
            </ListItem>
          ))}
        </List>}
      </Collapse>
    </>
  )
}

export default MainMenu