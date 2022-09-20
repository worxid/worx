export const dummyData = {
  'id': 1,
  'label': 'Laporan Valid',
  'description': 'isi form sesuai sop',
  'created': '',
  'updated': '',
  'listFields': [
    {
      'id': '1',
      'title': 'Textfield',
      'label': 'Nama',
      'description': 'isi nama lengkap anda',
      'required': true,
      'type': 'text',
    },
    {
      'id': '84834727238',
      'title': 'Textfield',
      'label': 'Email',
      'description': 'isi email anda',
      'required': true,
      'type': 'text',
    },
    {
      'id': '2',
      'title': 'Checkbox',
      'label': 'Status',
      'description': 'silahkan pilih status anda',
      'required': true,
      'checkboxMinChecked': 1,
      'checkboxMaxChecked': 3,
      'optionList': [
        {
          'label': 'Full Time'
        },
        {
          'label': 'Internship'
        },
        {
          'label': 'Freelance'
        }
      ],
      'type': 'checkboxGroup',
    },
    {
      'id': '3',
      'title': 'Radio Button',
      'label': 'Experiences',
      'description': 'pengalaman kerja anda',
      'required': true,
      'optionList': [
        {
          'label': 'dibawah 1 tahun'
        },
        {
          'label': '1 - 2 tahun'
        },
        {
          'label': 'diatas 3 tahun'
        }
      ],
      'type': 'radioGroup',
    },
    {
      'id': '4',
      'title': 'Dropdown',
      'label': 'Negara',
      'description': 'pilih negara asal anda',
      'required': true,
      'optionList': [
        {
          'label': 'Indonesia'
        },
        {
          'label': 'Singapore'
        }
      ],
      'type': 'dropdown',
    },
    {
      'id': '5',
      'title': 'Date',
      'label': 'DoB',
      'description': 'tanggal lahir anda',
      'required': true,
      'dateDisableFuture': false,
      'dateDisablePast': false,
      'type': 'date',
    },
    {
      'id': '6',
      'title': 'Separator',
      'label': 'Silahkan pilih',
      'description': 'dari 1 - 10',
      'type': 'separator',
    },
    {
      'id': '7',
      'title': 'Rating',
      'label': 'Frontend',
      'description': 'penguasaan anda dibidang frontend',
      'required': true,
      'ratingStarsCount': 10,
      'type': 'rating',
    },
    {
      'id': '6c99c837-c532-43b2-8201-638014ffa742',
      'title': 'Separator',
      'label': 'Dokumen',
      'description': '',
      'type': 'separator',
    },
    {
      'id': '8',
      'title': 'File',
      'label': 'NPWP',
      'description': 'silahkan scan NPWP anda dalam format PDF',
      'required': true,
      'fileMaxNumber': 1,
      'fileMaxSize': 10,
      'fileMinSize': 1,
      'fileMinSizeType': 'MB',
      'fileMaxSizeType': 'MB',
      'fileFormat': [
        'pdf'
      ],
      'type': 'file',
    },
    {
      'id': '9',
      'title': 'Image',
      'label': 'KTP',
      'description': 'silahkan scan KTP anda',
      'required': true,
      'imageMaxNumber': 1,
      'imageAllowGallery': true,
      'type': 'image',
    },
    {
      'id': '10',
      'title': 'Signature',
      'label': 'Tanda Tangan',
      'description': 'silahkan gambar tanda tangan anda',
      'required': true,
      'type': 'signature',
    },
  ]
}
