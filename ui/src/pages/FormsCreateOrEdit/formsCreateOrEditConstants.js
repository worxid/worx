// MUI ICONS
import IconCheckBox from '@mui/icons-material/CheckBox'
import IconContentCut from '@mui/icons-material/ContentCut'
import IconCreate from '@mui/icons-material/Create'
import IconDateRange from '@mui/icons-material/DateRange'
import IconFileCopy from '@mui/icons-material/FileCopy'
import IconRadioButtonChecked from '@mui/icons-material/RadioButtonChecked'
import IconPhotoCamera from '@mui/icons-material/PhotoCamera'
import IconPlaylistAddCheck from '@mui/icons-material/PlaylistAddCheck'
import IconStar from '@mui/icons-material/Star'
import IconStop from '@mui/icons-material/Stop'

export const dataListComponents = [
  {
    id: 1,
    label: 'Text Field',
    type: 'text',
    Icon: IconStop,
  },
  {
    id: 2,
    label: 'Checkbox',
    type: 'checkboxGroup',
    Icon: IconCheckBox,
  },
  {
    id: 3,
    label: 'Radio Button',
    type: 'radioGroup',
    Icon: IconRadioButtonChecked,
  },
  {
    id: 4,
    label: 'Dropdown',
    type: 'dropdown',
    Icon: IconPlaylistAddCheck,
  },
  {
    id: 5,
    label: 'Date',
    type: 'date',
    Icon: IconDateRange,
  },
  {
    id: 6,
    label: 'Separator',
    type: 'separator',
    Icon: IconContentCut,
  },
  {
    id: 7,
    label: 'Rating',
    type: 'rating',
    Icon: IconStar,
  },
  {
    id: 8,
    label: 'File',
    type: 'file',
    Icon: IconFileCopy,
  },
  {
    id: 9,
    label: 'Image',
    type: 'image',
    Icon: IconPhotoCamera,
  },
  {
    id: 10,
    label: 'Signature',
    type: 'signature',
    Icon: IconCreate,
  },
]