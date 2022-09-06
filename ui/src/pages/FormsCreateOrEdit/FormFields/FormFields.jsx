import { useContext } from 'react'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import DragHandleIcon from '@mui/icons-material/DragHandle'

// SORTABLE JS
import { ReactSortable } from 'react-sortablejs'

// STYLES
import useStyles from './formFieldsUseStyles'

const FormFields = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const {
    listFields, setListFields,
    selectedFields, setSelectedFields,
  } = useContext(PageFormsCreateOrEditContext)

  return (
    <Stack flex={1}>
      {/* HEADER */}
      <Box className={classes.header}>
        {/* TITLE */}
        <Typography variant='h6'>Form Fields</Typography>
      </Box>

      <Alert variant='filled' severity='error' className={classes.formFieldsTitle}>
        Untitled Form
      </Alert>

      {/* LIST FIELDS */}
      <Stack className={classes.listFieldsWrap}>
        {/* SORTABLE */}
        <ReactSortable
          style={{ minHeight: '100%', overflowY: 'auto', padding: '18px 4px' }}
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          sort={true}
          group={{
            name: 'grouping',
            pull: false,
            put: true
          }}
          list={listFields}
          setList={setListFields}
        >
          {listFields.map((item, index) => (
            <ListItem key={index} disablePadding className={classes.listItem}>
              <ListItemButton
                className={classes.listItemButton}
                onClick={() => setSelectedFields(item.id)}
                selected={selectedFields === item.id}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <item.Icon className={classes.icon}/>
                </ListItemIcon>

                <ListItemText primary={item.label} />

                {selectedFields === item.id && (<DragHandleIcon />)}
              </ListItemButton>
            </ListItem>
          ))}
        </ReactSortable>

        {/* INFORMATION */}
        {listFields.length <= 0 && (
          <Box className={classes.informationWrap}>
            {/* TITLE */}
            <Typography variant='h4' color='primary' className={classes.informationTitle}>
              Add Fields
            </Typography>

            {/* DESCRIPTION */}
            <Typography variant='subtitle2'>
              Add questions by dragging or 
              clicking fields from the toolbox.
            </Typography>
          </Box>
        )}
      </Stack>
    </Stack>
  )
}

export default FormFields