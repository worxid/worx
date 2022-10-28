//APIS
import axios from 'apis/axios'

// UTILITIES
import { didSuccessfullyCallTheApi } from 'utilities/validation'

// QUERY
import { stringify } from 'query-string'

export const getMediaPresignedUrl = async (inputSignal, inputQuery, inputFileObject) => {
  try {
    const response = await axios.get(`/media/presigned-url?${stringify(inputQuery)}`, {
      signal: inputSignal,
    })

    if(didSuccessfullyCallTheApi(response?.status)) {
      await axios.put(response.data.url, inputFileObject, {
        headers: {
          'Content-Type': inputFileObject.type,
        }
      })
    }

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}