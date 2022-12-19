export const downloadFileFromFileObject = (
  inputFileObject,
  inputName,
) => {
  const href = URL.createObjectURL(inputFileObject)

  const link = document.createElement('a')
  link.href = href
  link.setAttribute('download', inputName)
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(href)

  return { status: 200 }
}