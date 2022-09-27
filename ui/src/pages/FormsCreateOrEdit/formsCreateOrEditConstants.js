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
    minLength: 0,
    maxLength: 24,
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
    minChecked: 1,
    maxChecked: 3,
    group: [
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
    type: 'checkbox_group',
    Icon: IconCheckBox,
    duplicateFrom: null,
  },
  {
    id: '3',
    title: 'Radio Button',
    label: '',
    description: '',
    required: false,
    options: [
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
    type: 'radio_group',
    Icon: IconRadioButtonChecked,
    duplicateFrom: null,
  },
  {
    id: '4',
    title: 'Dropdown',
    label: '',
    description: '',
    required: false,
    options: [
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
    disableFuture: false,
    disablePast: false,
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
    maxStars: 5,
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
    maxFiles: 6,
    maxFileSize: 10485760,
    minFileSize: 128,
    fileMinSizeType: 'MB',
    fileMaxSizeType: 'BYTES',
    allowedExtensions: ['any'], // [format, format]
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
    maxFiles: 6,
    allowGalleryUpload: true,
    type: 'photo',
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