//APIS
import axios from 'apis/axios'

export const postSubmitFormSubmission = async (inputSignal, inputParams) => {
  try {
    const response = await axios.post(
      '/guest/form/submit', 
      inputParams, 
      { signal: inputSignal }
    )
    
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
