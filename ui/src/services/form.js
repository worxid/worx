//APIS
import axios, { axiosPrivate } from 'apis/axios'

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
  inputRequestPearams,
  inputBodyParams,
) => {
  try {
    const response = await axiosPrivate.post(`/form/search?${stringify(inputRequestPearams)}`, 
      inputBodyParams, 
      { signal: inputSignal },
    )
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}