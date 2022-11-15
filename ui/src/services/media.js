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
      try {
        await axios.put(response.data.url, inputFileObject, {
          headers: {
            'Content-Type': inputFileObject.type,
          }
        })
      } catch (error) {
        if (!error.response) return { status: 'No Server Response' }
        else return error.response
      }
    }

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postDetailMediaFiles = async (inputSignal, inputBodyParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.post('/media/files', inputBodyParams, {
      signal: inputSignal
    })

    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}