export const dummyData = {
  'success': true,
  'value': {
    'id': 738,
    'label': 'Yudis - Eksplor - 2',
    'description': 'Contoh Deskripsi',
    'fields': [
      {
        'id': '7231942686725',
        'label': 'Text field 1',
        'description': 'Deskripsi Text field 1',
        'required': true,
        'min_length': 1,
        'max_length': 1000,
        'type': 'text'
      },
      {
        'id': '7232054114493',
        'label': 'Radiobuttons',
        'description': null,
        'required': false,
        'options': [
          {
            'label': 'Option #1'
          },
          {
            'label': 'Option #2'
          },
          {
            'label': 'Option #3'
          }
        ],
        'type': 'radio_group'
      },
      {
        'id': '7232000386362',
        'label': 'Checkboxes 1',
        'description': 'Deskripsi Checkbox',
        'required': true,
        'min_checked': 1,
        'max_checked': 3,
        'group': [
          {
            'label': 'Option #1'
          },
          {
            'label': 'Option #2'
          },
          {
            'label': 'Option #3'
          },
          {
            'label': 'Opsi baru #4'
          }
        ],
        'type': 'checkbox_group'
      },
      {
        'id': '7232062265913',
        'label': 'Dropdown',
        'description': 'Deskripsi Dropdown',
        'required': false,
        'options': [
          {
            'label': 'Option #1'
          },
          {
            'label': 'Option #2'
          },
          {
            'label': 'Option #3'
          }
        ],
        'type': 'dropdown'
      },
      {
        'id': '7232087887174',
        'label': 'Tanggal',
        'description': '',
        'required': false,
        'disable_future': false,
        'disable_past': true,
        'type': 'date'
      },
      {
        'id': '7232133740980',
        'label': 'Separator',
        'description': 'Subpage deskripsi',
        'type': 'separator'
      },
      {
        'id': '7232145092199',
        'label': 'Rating',
        'description': null,
        'required': false,
        'max_stars': 10,
        'type': 'rating'
      },
      {
        'id': '7232173843748',
        'label': 'File',
        'description': 'Upload File',
        'required': false,
        'max_files': 4,
        'max_file_size': 11534336,
        'min_file_size': 120,
        'allowed_extensions': ['csv', 'pdf'],
        'type': 'file'
      },
      {
        'id': '7232249454552',
        'label': 'Image',
        'description': null,
        'required': false,
        'max_files': 3,
        'allow_gallery_upload': true,
        'type': 'photo'
      },
      {
        'id': '7232267516193',
        'label': 'Signature',
        'description': 'Signature',
        'required': true,
        'type': 'signature'
      }
    ],
    'created': '2021-12-09 09:36:04',
    'submit_in_zone': false,
    'updated': '2021-12-09 09:36:11',
    'default': false
  }
}