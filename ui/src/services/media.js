//APIS
import axios from 'apis/axios'

// QUERY
import { stringify } from 'query-string'

export const getMediaPresignedUrl = async (inputSignal, inputQuery) => {
  try {
    const response = await axios.get(`/media/presigned-url?${stringify(inputQuery)}`, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}