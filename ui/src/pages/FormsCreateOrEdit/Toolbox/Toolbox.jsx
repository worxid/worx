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
            if(item.type === 'checkboxGroup' || item.type === 'radioGroup' || item.type === 'dropdown') {
              // INIT NEW OPTION LIST
              return { ...item, id: uuid(), optionList: initOptionList, } 
            } else return { ...item, id: uuid() }
          }}
        >
          {dataListComponents.map((item, index) => (
            <ListItem key={index} disablePadding className={classes.listItem}>
              <ListItemButton>
                <ListItemIcon className={classes.listItemIcon}>
                  <item.Icon className='colorTextPrimary'/>
                </ListItemIcon>

                <ListItemText primary={<Typography variant='body2'>{item.title}</Typography>} />
              </ListItemButton>
            </ListItem>
          ))}
        </ReactSortable>
      </Stack>
    </Stack>
  )
}

export default Toolbox