import { Html5QrcodeSupportedFormats } from 'html5-qrcode'

export const anyFormatFile = ['csv', 'doc', 'pdf', 'xls']
export const anyFormatImage = ['jpg', 'jpeg', 'png']

export const getKeyValue = (type) => {
  if(type === 'text' || type === 'date' || type === 'rating' || type === 'signature' || type === 'barcode') return 'value'
  else if (type === 'checkbox_group') return  'values'
  else if (type === 'radio_group' || type === 'dropdown') return 'value_index'
  else if (type === 'file' || type === 'photo') return  'values'
  else return 'value'
}

export const getKeyValueType = (type, itemField) => {
  if(type === 'text' || type === 'date' || type === 'signature') return ''
  else if (type === 'checkbox_group') return itemField.group.map(item => false)
  else if (type === 'radio_group' || type === 'dropdown') return ''
  else if(type === 'rating') return 0
  else if(type === 'file' || type === 'photo') return []
  else return ''
}

export const structureParamsValuesCheckbox = (fields) => {
  if(!fields) return
  let tempObject = {}
  fields.forEach(item => {
    if (item.type === 'checkbox_group') tempObject[item.id] = {
      type: item.type,
      [getKeyValue(item.type)]: getKeyValueType(item.type, item),
      required: item.required
    }
  })
  return tempObject
}

export const structureErrorMessage = (fields) => {
  let tempObject = {}
  fields.forEach(item => {
    if (item.type !== 'separator') tempObject[item.id] = ''
  })
  return tempObject
}

// FORMAT SIZE
export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export const checkboxErrorMessage = (message, min_checked, max_checked) => {
  if(message.includes('Value is more than maximum')) return `Select maximum ${max_checked} option${max_checked >= 2 ? 's' : ''}`
  if(message.includes('Value is less than minimum')) return `Select minimum ${min_checked} option${min_checked >= 2 ? 's' : ''}`
  else return message
}

// CONVERT DATA URL TO JS FILE OBJECT
export const dataURLtoFileObject = (dataurl, filename) => {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while(n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {type:mime})
}

// FORMAT FILE VALIDATION
export const formatFileValidation = (fileObject, allowedExtensions = ['jpg', 'png', 'jpeg']) => {
  let isValid = false
  allowedExtensions.forEach(item => {
    if(fileObject?.type?.includes(item)) isValid = true
  })

  return isValid
}

const convertToBytes = (size, type) => {
  const types = ['BYTE', 'KB', 'MB', 'GB', 'TB']
  const key = types.indexOf(type.toUpperCase())
  
  if (typeof key !== 'boolean') {
    return  size * 1024 ** key
  }
}

// SIZE FILE VALIDATION
export const sizeFileValidation = (fileObject, minSize, minFormat = 'byte', maxSize, maxFormat = 'byte') => {
  let isValid = false
  const minInBytes = convertToBytes(minSize, minFormat)
  const maxInBytes = convertToBytes(maxSize, maxFormat)
  const fileInBytes = fileObject.size

  if(fileInBytes >= minInBytes && fileInBytes <= maxInBytes) isValid = true
  return isValid
}

// D1 CODE SUPPORTED ON HTML5 QRCODE
export const d1CodeType = [
  Html5QrcodeSupportedFormats.CODABAR,
  Html5QrcodeSupportedFormats.CODE_39,
  Html5QrcodeSupportedFormats.CODE_93,
  Html5QrcodeSupportedFormats.CODE_128,
  Html5QrcodeSupportedFormats.ITF,
  Html5QrcodeSupportedFormats.EAN_13,
  Html5QrcodeSupportedFormats.EAN_8,
  Html5QrcodeSupportedFormats.PDF_417,
  Html5QrcodeSupportedFormats.RSS_14,
  Html5QrcodeSupportedFormats.RSS_EXPANDED,
  Html5QrcodeSupportedFormats.UPC_A,
  Html5QrcodeSupportedFormats.UPC_E,
  Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION,
]

// D2 CODE SUPPORTED ON HTML5 QRCODE
export const d2CodeType = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.AZTEC,
  Html5QrcodeSupportedFormats.DATA_MATRIX,
  Html5QrcodeSupportedFormats.MAXICODE,
]

export const scanQrCodeType = (accept1D = true, accept2D = true) => {
  let typeArr = []
  if(accept1D) {
    typeArr = [...d1CodeType]
  }

  if(accept2D) {
    typeArr = [...d2CodeType]
  }
  
  return typeArr
}