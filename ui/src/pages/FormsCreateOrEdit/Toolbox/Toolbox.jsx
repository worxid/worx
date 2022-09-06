import { useContext } from 'react'

// CONSTANTS
import { dataListComponents } from '../formsCreateOrEditConstants'

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

  // CONTEXT
  const { listToolbox, setListToolbox } = useContext(PageFormsCreateOrEditContext)

  return (
    <Stack direction='column' className={classes.root}>
      {/* HEADER */}
      <Stack
        alignItems='baseline'
        direction='row'
        className={classes.header}
      >
        {/* TITLE */}
        <Typography variant='h6'>Toolbox</Typography>

        {/* DESCRIPTION */}
        <Typography
          className={classes.headerDescription}
          variant='subtitle1'
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
          clone={(item) => ({ ...item, id: uuid() })}
        >
          {dataListComponents.map((item, index) => (
            <ListItem key={index} disablePadding className={classes.listItem}>
              <ListItemButton className={classes.listItemButton}>
                <ListItemIcon className={classes.listItemIcon}>
                  <item.Icon className={classes.icon}/>
                </ListItemIcon>

                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </ReactSortable>
      </Stack>
    </Stack>
  )
}

export default Toolbox