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
    id: '1',
    title: 'Textfield',
    label: '',
    description: '',
    required: false,
    type: 'text',
    Icon: IconStop,
    duplicateFrom: null,
  },
  {
    id: '2',
    title: 'Checkbox',
    label: '',
    description: '',
    required: false,
    checkboxMinChecked: 1,
    checkboxMaxChecked: 3,
    optionList: [
      {
        label: ''
      },
      {
        label: ''
      },
      {
        label: ''
      }
    ],
    type: 'checkboxGroup',
    Icon: IconCheckBox,
    duplicateFrom: null,
  },
  {
    id: '3',
    title: 'Radio Button',
    label: '',
    description: '',
    required: false,
    optionList: [
      {
        label: ''
      },
      {
        label: ''
      },
      {
        label: ''
      }
    ],
    type: 'radioGroup',
    Icon: IconRadioButtonChecked,
    duplicateFrom: null,
  },
  {
    id: '4',
    title: 'Dropdown',
    label: '',
    description: '',
    required: false,
    optionList: [
      {
        label: ''
      },
      {
        label: ''
      },
      {
        label: ''
      }
    ],
    type: 'dropdown',
    Icon: IconPlaylistAddCheck,
    duplicateFrom: null,
  },
  {
    id: '5',
    title: 'Date',
    label: '',
    description: '',
    required: false,
    dateDisableFuture: false,
    dateDisablePast: false,
    type: 'date',
    Icon: IconDateRange,
    duplicateFrom: null,
  },
  {
    id: '6',
    title: 'Separator',
    label: '',
    description: '',
    type: 'separator',
    Icon: IconContentCut,
    duplicateFrom: null,
  },
  {
    id: '7',
    title: 'Rating',
    label: '',
    description: '',
    required: false,
    ratingStarsCount: 5,
    type: 'rating',
    Icon: IconStar,
    duplicateFrom: null,
  },
  {
    id: '8',
    title: 'File',
    label: '',
    description: '',
    required: false,
    fileMaxNumber: 6,
    fileMaxSize: 128,
    fileMinSize: 1,
    fileMinSizeType: 'MB',
    fileMaxSizeType: 'BYTES',
    fileFormat: ['any'], // [format, format]
    type: 'file',
    Icon: IconFileCopy,
    duplicateFrom: null,
  },
  {
    id: '9',
    title: 'Image',
    label: '',
    description: '',
    required: false,
    imageMaxNumber: 6,
    imageAllowGallery: false,
    type: 'image',
    Icon: IconPhotoCamera,
    duplicateFrom: null,
  },
  {
    id: '10',
    title: 'Signature',
    label: '',
    description: '',
    required: false,
    type: 'signature',
    Icon: IconCreate,
    duplicateFrom: null,
  },
]
export const formatFiles = ['any', 'csv', 'doc', 'pdf', 'xls']
export const formatSizeImages = [
  {
    label: 'Bytes',
    value: 'BYTES'
  },
  {
    label: 'Kb',
    value: 'KB'
  },
  {
    label: 'Mb',
    value: 'MB'
  }
]
export const initObjectForm = {
  id: null,
  label: 'Valid Form',
  description: '',
  created: '',
  updated: '',
}