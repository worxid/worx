// LIBRARY
import { v4 as uuid } from 'uuid'

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
    id: uuid(),
    label: '',
    description: '',
    min_length: 1,
    max_length: 24,
    required: false,
    type: 'text',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    required: false,
    min_checked: 1,
    max_checked: 3,
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
    duplicateFrom: null,
  },
  {
    id: uuid(),
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
    duplicateFrom: null,
  },
  {
    id: uuid(),
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
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    required: false,
    disable_future: false,
    disable_past: false,
    type: 'date',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    type: 'separator',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    required: false,
    max_stars: 5,
    type: 'rating',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    required: false,
    max_files: 6,
    max_file_size: 10485760,
    min_file_size: 128,
    file_min_size_type: 'MB',
    file_max_size_type: 'BYTES',
    allowed_extensions: ['any'], // [format, format]
    type: 'file',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    required: false,
    max_files: 6,
    allow_gallery_upload: true,
    type: 'photo',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: '',
    description: '',
    required: false,
    type: 'signature',
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
export const getTypeIconComponent = (type) => {
  if(type === 'text') return <IconStop className='colorTextPrimary'/>
  else if(type === 'checkbox_group') return <IconCheckBox className='colorTextPrimary'/>
  else if(type === 'radio_group') return <IconRadioButtonChecked className='colorTextPrimary'/>
  else if(type === 'dropdown') return <IconPlaylistAddCheck className='colorTextPrimary'/>
  else if(type === 'date') return <IconDateRange className='colorTextPrimary'/>
  else if(type === 'separator') return <IconContentCut className='colorTextPrimary'/>
  else if(type === 'rating') return <IconStar className='colorTextPrimary'/>
  else if(type === 'file') return <IconFileCopy className='colorTextPrimary'/>
  else if(type === 'photo') return <IconPhotoCamera className='colorTextPrimary'/>
  else if(type === 'signature') return <IconCreate className='colorTextPrimary'/>
}
export const getTypeTitle = (type) => {
  if(type === 'text') return 'Textfield'
  else if(type === 'checkbox_group') return 'Checkbox'
  else if(type === 'radio_group') return 'Radio Group'
  else if(type === 'dropdown') return 'Dropdown'
  else if(type === 'date') return 'Date'
  else if(type === 'separator') return 'Separator'
  else if(type === 'rating') return 'Rating'
  else if(type === 'file') return 'File'
  else if(type === 'photo') return 'Photo'
  else if(type === 'signature') return 'Signature'
}
export const initObjectForm = {
  id: null,
  label: 'Valid Form',
  description: '',
  created: '',
  updated: '',
}