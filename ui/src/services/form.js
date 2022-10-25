//APIS
import axios from 'apis/axios'

export const postSubmitFormSubmission = async (inputSignal, inputParams) => {
  try {
    const response = await axios.post('/form/submit', inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}