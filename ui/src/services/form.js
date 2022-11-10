//APIS
import axios from 'apis/axios'

// QUERY STRING
import { stringify } from 'query-string'

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

export const postSearchFormSubmissionList = async (
  inputSignal, 
  inputRequestParams,
  inputBodyParams,
  inputAxiosPrivate
) => {
  try {
    const response = await inputAxiosPrivate.post(`/form/search?${stringify(inputRequestParams)}`, 
      inputBodyParams, 
      { signal: inputSignal },
    )
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}