import { useContext } from 'react'

// CONSTANTS
import { dataListComponents, getTypeIconComponent, getTypeTitle } from '../formsCreateOrEditConstants'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// SORTABLE JS
import { ReactSortable } from 'react-sortablejs'
import { v4 as uuid } from 'uuid'

// STYLES
import useStyles from './toolboxUseStyles'

const Toolbox = () => {
  // STYLES
  const classes = useStyles()

  // INITS
  const initOptionList = [
    {
      label: ''
    },
    {
      label: ''
    },
    {
      label: ''
    }
  ]

  // CONTEXT
  const { listToolbox, setListToolbox } = useContext(PageFormsCreateOrEditContext)

  return (
    <Stack direction='column' className={classes.root} flex={0} flexShrink={0} flexBasis={304}>
      {/* HEADER */}
      <Stack
        alignItems='baseline'
        direction='row'
        className={classes.header}
      >
        {/* TITLE */}
        <Typography variant='subtitle1'>Toolbox</Typography>

        {/* DESCRIPTION */}
        <Typography
          className={classes.headerDescription}
          variant='caption'
        >
          (drag & drop)
        </Typography>
      </Stack>

      {/* CONTENT LIST */}
      <Stack className={`${classes.contentList} overflowYauto`}>
        <ReactSortable
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          list={listToolbox}
          setList={setListToolbox}
          group={{
            name: 'grouping',
            pull: 'clone',
            put: false
          }}
          clone={(item) => {
            // INIT NEW OPTION LIST
            if(item.type === 'checkbox_group' || item.type === 'radio_group' || item.type === 'dropdown') {
              let tempItem = { ...item, id: uuid() } 
              if (item.type === 'checkbox_group') tempItem['group'] = initOptionList
              else tempItem['options'] = initOptionList
              return tempItem
            } else return { ...item, id: uuid() }
          }}
        >
          {dataListComponents.map((item, index) => (
            <ListItem key={index} disablePadding className={classes.listItem}>
              <ListItemButton>
                <ListItemIcon className={classes.listItemIcon}>
                  {getTypeIconComponent(item.type)}
                </ListItemIcon>

                <ListItemText primary={<Typography variant='body2'>{getTypeTitle(item.type)}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </ReactSortable>
      </Stack>
    </Stack>
  )
}

export default Toolbox