//APIS
import axios from 'apis/axios'

// QUERY STRING
import { stringify } from 'query-string'

export const getReadFormTemplate = async (formCode, inputSignal) => {
  try {
    const response = await axios.get(
      `/guest/form/template/read?code=${formCode}`, 
      { signal: inputSignal }
    )

    return response
  } 
  catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postSubmitFormSubmission = async (inputSignal, inputParams) => {
  try {
    const response = await axios.post(
      '/guest/form/submit', 
      inputParams, 
      { signal: inputSignal }
    )
    
    return response
  } 
  catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const getGuestShareLinkFormTemplate = async (inputSignal, inputQuery) => {
  try {
    const response = await axios.get(`/guest/form/template/share?${stringify(inputQuery)}`, {
      signal: inputSignal,
    })

    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}