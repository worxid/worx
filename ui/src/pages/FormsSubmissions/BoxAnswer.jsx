import React from 'react'

// COMPONENTS
import DialogMediasPreview from 'components/DialogMediasPreview/DialogMediasPreview'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// HOOKS
import useAxiosPrivate from 'hooks/useAxiosPrivate'

// MUIS
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

// MUIS ICON
import IconBrush from '@mui/icons-material/Brush'
import IconCameraAlt from '@mui/icons-material/CameraAlt'
import IconCheckBox from '@mui/icons-material/CheckBox'
import IconContentCut from '@mui/icons-material/ContentCut'
import IconDateRange from '@mui/icons-material/DateRange'
import IconEdit from '@mui/icons-material/Edit'
import IconFileCopy from '@mui/icons-material/FileCopy'
import IconPlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'
import IconRadioButtonChecked from '@mui/icons-material/RadioButtonChecked'
import IconStar from '@mui/icons-material/Star'
import IconTag from '@mui/icons-material/Tag'
import IconTextFormat from '@mui/icons-material/TextFormat'
import IconWatchLater from '@mui/icons-material/WatchLater'
import IconQrCode2 from '@mui/icons-material/QrCode2'

// STYLES
import useStyles from './formsSubmissionsUseStyles'

// UTILS
import { 
  didSuccessfullyCallTheApi, 
  wasAccessTokenExpired,
  wasRequestCanceled,
} from 'utilities/validation'

const BoxAnswer = (props) => {
  const { label, type, values, itemFields } = props
  const classes = useStyles()

  const getTypeIcon = (inputType) => {
    if(inputType === 'text') return <IconTextFormat color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'checkbox_group') return <IconCheckBox color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'radio_group') return <IconRadioButtonChecked color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'dropdown') return <IconPlaylistAddCheck color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'separator') return <IconContentCut color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'date') return <IconDateRange color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'rating') return <IconStar color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'file') return <IconFileCopy color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'photo') return <IconCameraAlt color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'time') return <IconWatchLater color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'sketch') return <IconBrush color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'barcode') return <IconQrCode2 color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'integer') return <IconTag color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'signature') return <IconEdit color='primary' className={classes.flyoutAnswerIcon}/>
    else if (inputType === 'boolean') return <IconRadioButtonChecked color='primary' className={classes.flyoutAnswerIcon}/>
  }

  // FIND VALUES BY KEY
  const findValuesKey = (inputType) => {
    if(inputType === 'text' || inputType === 'rating' || inputType === 'date'
    || inputType === 'integer' || inputType === 'time') return 'value' // string
    else if (inputType === 'checkbox_group') return 'values' // array<boolean>
    else if (inputType === 'radio_group' || inputType === 'dropdown') return 'value_index' // number
    else if (inputType === 'file' || inputType === 'photo') return 'file_ids' // array<number>
    else if (inputType === 'signature' || inputType === 'sketch') return 'file_id' // number
    else return 'value'
  }

  console.log({ values })

  return (
    <ListItem className={`${classes.flyoutAnswerItem}${type === 'separator' && ' separator'}`}>
      <ListItemAvatar className={classes.flyoutAnswerItemAvatar}>
        <Avatar className={classes.flyoutAnswerAvatar}>
          {getTypeIcon(type)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.flyoutAnswerText}
        primary={label}
        secondary={<>
          {(type === 'text' || type === 'date' || type === 'time' || type === 'integer') && (
            <Typography>{values[findValuesKey(type)] || '-'}</Typography>
          )}
          {(type === 'checkbox_group') && itemFields?.group?.map((itemCheckbox, index) => (
            values[findValuesKey(type)][index] && <Chip className={classes.chipAnswer} label={itemCheckbox.label} key={index} />
          ))}
          {(type === 'radio_group' || type === 'dropdown') && (
            <Chip className={classes.chipAnswer} label={itemFields?.options[values[findValuesKey(type)]].label}/>
          )}
          {(type === 'barcode') && (
            values[findValuesKey(type)] ? <Chip className={classes.chipAnswer} label={values[findValuesKey(type)]}/> : '-'
          )}
          {(type === 'boolean') && (
            values[findValuesKey(type)] ? <Chip className={classes.chipAnswer} label={values[findValuesKey(type)] ? 'Yes' : 'No'}/> : '-'
          )}
          {type === 'rating' && (
            <Stack direction='row' alignItems='flex-end'>
              <Rating
                value={Number(values?.[findValuesKey(type)])}
                readOnly
                max={itemFields?.max_stars}
                className={classes.ratingAnswer}
              />

              <Typography>{Number(values?.[findValuesKey(type)])}/{itemFields?.max_stars}</Typography>
            </Stack>
          )}
        </>}
      />
    </ListItem>
  )
}

export default BoxAnswer