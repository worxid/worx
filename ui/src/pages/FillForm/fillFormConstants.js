// next to-do: compatible for upload input
export const getKeyValue = (type) => {
  if(type === 'text' || type === 'date' || type === 'rating') return 'value'
  else if (type === 'checkbox_group') return  'values'
  else if (type === 'radio_group' || type === 'dropdown') return 'value_index'
  else return 'value'
}

// next to-do: compatible for upload input
export const getKeyValueType = (type, itemField) => {
  if(type === 'text' || type === 'date') return ''
  else if (type === 'checkbox_group') return itemField.group.map(item => false)
  else if (type === 'radio_group' || type === 'dropdown') return ''
  else if(type === 'rating') return 0
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

// to-do: next make for upload input
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