import { useEffect, useState } from 'react'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Rating from '@mui/material/Rating'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// MUI ICONS
import IconCalendarMonth from '@mui/icons-material/CalendarMonth'
import IconInsertDriveFile from '@mui/icons-material/InsertDriveFile'

// SERVICES
import { postDetailMediaFiles } from 'services/media'

// STYLES
import useStyles from './formsSubmissionsDetailUseStyles'

// UTILITIES
import { convertDate } from 'utilities/date'
import { didSuccessfullyCallTheApi } from 'utilities/validation'

const InputComponent = (props) => {
  const { item, defaultValue, attachments } = props
  const axiosPrivate = useAxiosPrivate()

  // STYLES
  const classes = useStyles()

  const [currentFiles, setCurrentFiles] = useState([])

  // FIND VALUES BY KEY
  const findValuesKey = (inputType) => {
    if(inputType === 'text' || inputType === 'rating' || inputType === 'date') return 'value' // string
    else if (inputType === 'checkbox_group') return 'values' // array<boolean>
    else if (inputType === 'radio_group' || inputType === 'dropdown') return 'value_index' // number
    else if (inputType === 'file' || inputType === 'photo') return 'file_ids' // array<number>
    else if (inputType === 'signature') return 'file_id' // number
  }

  // GET FILE/MEDIA URL
  const getMediaURL = async (fileIds = []) => {
    const mediaIds = fileIds.map(item => {
      const findIds = attachments.find(itemFind => itemFind.file_id === item)
      if(findIds) return findIds.media_id
    })

    const abortController = new AbortController()
    const response = await postDetailMediaFiles(
      abortController.signal,
      {
        media_ids: [...mediaIds]
      },
      axiosPrivate
    )

    if(didSuccessfullyCallTheApi(response?.status)) {
      setCurrentFiles(response.data.list)
    } else setCurrentFiles([])

    abortController.abort()
  }

  useEffect(() => {
    if(item.type === 'file' || item.type === 'photo' && defaultValue?.[findValuesKey(item.type)]) {
      getMediaURL(defaultValue?.[findValuesKey(item.type)])
    }

    if(item.type === 'signature' && defaultValue?.[findValuesKey(item.type)]) {
      getMediaURL([defaultValue?.[findValuesKey(item.type)]])
    }
  }, [item])

  return (
    <>
      {/* TEXTFIELD */}
      {item.type === 'text' && (
        <FormControl
          variant='outlined' 
          fullWidth
          disabled
          color='secondary'
        >
          <InputLabel shrink={true}>
            {item?.label}
          </InputLabel>
        
          <OutlinedInput
            autoFocus
            type='text'
            label={item?.label}
            defaultValue={defaultValue?.[findValuesKey(item.type)] || '-'}
          />
        </FormControl>
      )}

      {/* CHECKBOX GROUP */}
      {item.type === 'checkbox_group' && (
        <FormGroup className={classes.checkboxGroup} disabled>
          {item?.group?.map((itemCheckbox, index) => (
            <FormControlLabel
              key={index}
              disabled
              control={<Checkbox
                defaultChecked={defaultValue?.[findValuesKey(item.type)][index] || false}
              />}
              label={itemCheckbox.label}
            />
          ))}
        </FormGroup>
      )}

      {/* RADIO GROUP */}
      {item.type === 'radio_group' && (
        <RadioGroup className={classes.radioGroup} disabled>
          {item?.options?.map((itemRadio, index) => (
            <FormControlLabel
              control={<Radio checked={Number(defaultValue?.[findValuesKey(item.type)]) === index}/>}
              key={index}
              disabled
              value={index}
              label={itemRadio.label}
            />
          ))}
        </RadioGroup>
      )}

      {/* DROPDOWN */}
      {item.type === 'dropdown' && (
        <FormControl fullWidth disabled>
          <Select defaultValue={Number(defaultValue?.[findValuesKey(item.type)])} disabled>
            {item?.options?.map((itemDropdown, index) => (
              <MenuItem key={index} value={index}>
                {itemDropdown.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* DATE */}
      {item.type === 'date' && (
        <TextField
          fullWidth
          disabled
          value={convertDate(defaultValue?.[findValuesKey(item.type)], 'dd-MM-yyyy')}
          InputProps={{
            startAdornment: (<InputAdornment position='start'>
              <Box className={classes.textfieldDateAdornment}><IconCalendarMonth /></Box>
            </InputAdornment>),
          }}
        />
      )}

      {/* RATING */}
      {item.type === 'rating' && (
        <Rating
          value={Number(defaultValue?.[findValuesKey(item.type)])}
          readOnly
          max={item?.max_stars}
        />
      )}

      {/* LIST FILE */}
      {item.type === 'file' && (
        <List className='padding0'>
          {currentFiles?.map((itemFile, index) => (
            <ListItem className={classes.listItem} key={index}>
              <ListItemAvatar className={classes.listFileAvatar}>
                <IconInsertDriveFile className={classes.listFileIcon}/>
              </ListItemAvatar>

              <ListItemText
                className={classes.listItemText}
                primary={itemFile?.name}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* LIST IMAGE */}
      {item.type === 'photo' && (
        <List className='padding0'>
          {currentFiles?.map((itemPhoto, index) => (
            <ListItem className={classes.listItem} key={index}>
              <ListItemAvatar className={classes.listFileAvatar}>
                <Box
                  className={classes.listImage}
                  component='img'
                  src={itemPhoto?.url}
                />
              </ListItemAvatar>

              <ListItemText
                className={classes.listItemText}
                primary={itemPhoto?.name}
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* SIGNATURE */}
      {(item.type === 'signature' && currentFiles[0]?.url) && (
        <Box
          className={classes.signatureBox}
          component='img'
          src={currentFiles[0]?.url}
        />
      )}
    </>
  )
}

export default InputComponent