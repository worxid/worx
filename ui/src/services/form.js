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
  inputRequestParams,
  inputBodyParams,
) => {
  try {
    const response = await axiosPrivate.post(`/form/search?${stringify(inputRequestParams)}`, 
      inputBodyParams, 
      { signal: inputSignal },
    )
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}