// AXIOS
import axios from 'axios'

export const downloadFileFromUrl = async (
  inputUrl,
  inputName,
) => {
  try {
    const response = await axios({
      url: inputUrl,
      method: 'GET',
      responseType: 'blob',
    })

    const href = URL.createObjectURL(response.data)

    const link = document.createElement('a')
    link.href = href
    link.setAttribute('download', inputName)
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(href)

    return { status: 200 }
  }
  catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}