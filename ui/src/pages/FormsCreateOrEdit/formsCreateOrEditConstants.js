// LIBRARY
import { v4 as uuid } from 'uuid'

// MUI ICONS
import IconAccessTimeFilled from '@mui/icons-material/AccessTimeFilled'
import IconBrush from '@mui/icons-material/Brush'
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
import IconQrCode2 from '@mui/icons-material/QrCode2'
import IconTag from '@mui/icons-material/Tag'

export const dataListComponents = [
  {
    id: uuid(),
    label: 'Text Field',
    description: 'Description',
    min_length: 1,
    max_length: 24,
    required: false,
    type: 'text',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Checkbox',
    description: 'Description',
    required: false,
    min_checked: 1,
    max_checked: 3,
    group: [
      {
        label: 'Option 1'
      },
      {
        label: 'Option 2'
      },
      {
        label: 'Option 3'
      }
    ],
    type: 'checkbox_group',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Radio',
    description: 'Description',
    required: false,
    options: [
      {
        label: 'Option 1'
      },
      {
        label: 'Option 2'
      },
      {
        label: 'Option 3'
      }
    ],
    type: 'radio_group',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Yes/No',
    type: 'boolean',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Dropdown',
    description: 'Description',
    required: false,
    options: [
      {
        label: 'Option 1'
      },
      {
        label: 'Option 2'
      },
      {
        label: 'Option 3'
      }
    ],
    type: 'dropdown',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Date',
    description: 'Description',
    required: false,
    disable_future: false,
    disable_past: false,
    type: 'date',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Time',
    type: 'time',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Separator',
    description: 'Description',
    type: 'separator',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Rating',
    description: 'Description',
    required: false,
    max_stars: 5,
    type: 'rating',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Integer',
    type: 'integer',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'File',
    description: 'Description',
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
    label: 'Photo',
    description: 'Description',
    required: false,
    max_files: 6,
    allow_gallery_upload: true,
    type: 'photo',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Signature',
    description: 'Description',
    required: false,
    type: 'signature',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Sketch',
    type: 'sketch',
    duplicateFrom: null,
  },
  {
    id: uuid(),
    label: 'Barcode',
    type: 'barcode',
    barcode_type: null, // '1d' if checked
    allow_manual_override: false,
    required: false,
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
  else if(type === 'time') return <IconAccessTimeFilled className='colorTextPrimary'/>
  else if(type === 'barcode') return <IconQrCode2 className='colorTextPrimary'/>
  else if(type === 'sketch') return <IconBrush className='colorTextPrimary'/>
  else if(type === 'boolean') return <IconRadioButtonChecked className='colorTextPrimary'/>
  else if(type === 'integer') return <IconTag className='colorTextPrimary'/>
}
export const getTypeTitle = (type) => {
  if(type === 'text') return 'Text Field'
  else if(type === 'checkbox_group') return 'Checkbox'
  else if(type === 'radio_group') return 'Radio Group'
  else if(type === 'dropdown') return 'Dropdown'
  else if(type === 'date') return 'Date'
  else if(type === 'separator') return 'Separator'
  else if(type === 'rating') return 'Rating'
  else if(type === 'file') return 'File'
  else if(type === 'photo') return 'Photo'
  else if(type === 'signature') return 'Signature'
  else if(type === 'time') return 'Time'
  else if(type === 'barcode') return 'Barcode'
  else if(type === 'sketch') return 'Sketch'
  else if(type === 'boolean') return 'Yes/No'
  else if(type === 'integer') return 'Integer'
}
export const initObjectForm = {
  id: null,
  label: 'New Form',
  description: 'Description',
  created: '',
  updated: '',
}