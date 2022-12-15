// APIS
import axios from 'apis/axiosStrapi'

export const getRootMetaData = async (inputSignal) => {
  try {
    const response = await axios.get(
      '/root',
      { signal: inputSignal },
    )
    return response
  } 
  catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}