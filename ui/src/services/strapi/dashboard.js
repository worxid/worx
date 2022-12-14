// APIS
import axios from 'apis/axiosStrapi'

export const getDashboardMetaData = async (
  inputSignal,
  inputEndpoint,
) => {
  try {
    const response = await axios.get(
      `/${inputEndpoint}?populate=*`,
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