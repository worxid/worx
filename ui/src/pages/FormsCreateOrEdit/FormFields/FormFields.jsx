import { useContext } from 'react'

// CONTEXT
import { PageFormsCreateOrEditContext } from 'contexts/PageFormsCreateOrEditContext'

// MUIS
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box'
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUI ICONS
import IconDragHandle from '@mui/icons-material/DragHandle'

// SORTABLE JS
import { ReactSortable } from 'react-sortablejs'

// STYLES
import useStyles from './formFieldsUseStyles'

const FormFields = () => {
  // STYLES
  const classes = useStyles()

  // CONTEXT
  const {
    formObject, listFields, setListFields,
    selectedFieldsId, setSelectedFieldsId,
    setSelectedFieldsType
  } = useContext(PageFormsCreateOrEditContext)

  // HANDLE SELECTED FIELD
  const handleSelectedField = (type, id) => {
    setSelectedFieldsId(id)
    setSelectedFieldsType(type)
  }

  return (
    <Stack flex={1}>
      {/* HEADER */}
      <Box className={classes.header}>
        {/* TITLE */}
        <Typography variant='subtitle1'>Form Fields</Typography>
      </Box>

      {/* ALERT ID = 0 */}
      <Alert
        variant='filled'
        severity='error'
        className={`${classes.boxFormHeader} ${selectedFieldsId === 0 && 'backgroundColorPrimaryMain active'}`}
        onClick={() => handleSelectedField('formHeader', 0)}
      >
        <Stack direction='column' justifyContent='center'>
          <AlertTitle>{formObject?.label}</AlertTitle>

          {formObject?.description && (<Typography
            className={classes.formDescription}
            variant='caption'
          >{formObject.description}</Typography>)}
        </Stack>
      </Alert>

      {/* LIST FIELDS */}
      <Stack className={classes.listFieldsWrap}>
        {/* SORTABLE */}
        <ReactSortable
          className={classes.reactSortable}
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
                onClick={() => handleSelectedField(item.type, item.id)}
                selected={selectedFieldsId === item.id}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <item.Icon className='colorTextPrimary'/>
                </ListItemIcon>

                <ListItemText primary={<Typography variant='body'>{item?.label || item.title}</Typography>} />

                {selectedFieldsId === item.id && (<IconDragHandle />)}
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