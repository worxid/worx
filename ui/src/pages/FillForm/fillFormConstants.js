export const dummyData = {
  'id': 1,
  'label': 'Laporan Valid',
  'description': 'isi form sesuai sop',
  'created': '',
  'updated': '',
  'listFields': [
    {
      'id': '1',
      'label': 'Nama',
      'description': 'isi nama lengkap anda',
      'required': true,
      'type': 'text',
    },
    {
      'id': '84834727238',
      'label': 'Email',
      'description': 'isi email anda',
      'required': true,
      'type': 'text',
    },
    {
      'id': '2',
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
      'label': 'DoB',
      'description': 'tanggal lahir anda',
      'required': true,
      'dateDisableFuture': false,
      'dateDisablePast': false,
      'type': 'date',
    },
    {
      'id': '6',
      'label': 'Silahkan pilih',
      'description': 'dari 1 - 10',
      'type': 'separator',
    },
    {
      'id': '7',
      'label': 'Frontend',
      'description': 'penguasaan anda dibidang frontend',
      'required': true,
      'ratingStarsCount': 10,
      'type': 'rating',
    },
    {
      'id': '6c99c837-c532-43b2-8201-638014ffa742',
      'label': 'Dokumen',
      'description': '',
      'type': 'separator',
    },
    {
      'id': '8',
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
      'label': 'KTP',
      'description': 'silahkan scan KTP anda',
      'required': true,
      'imageMaxNumber': 1,
      'imageAllowGallery': true,
      'type': 'image',
    },
    {
      'id': '10',
      'label': 'Tanda Tangan',
      'description': 'silahkan gambar tanda tangan anda',
      'required': true,
      'type': 'signature',
    },
  ]
}
