//APIS
import { axiosPrivate } from 'apis/axios'

// QUERY
import { stringify } from 'query-string'

export const postCreateFormTemplate = async (inputSignal, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.post('/form/template', inputParams, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}` }
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const getDetailFormTemplate = async (formTemplateId, inputSignal, inputToken) => {
  try {
    const response = await axiosPrivate.get(`/form/template/${formTemplateId}`, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}` }
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putUpdateFormTemplate = async (formTemplateId, inputSignal, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.put(`/form/template/${formTemplateId}`, inputParams, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}` }
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postGetListFormTemplate = async (inputSignal, inputQuery, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.post(`/form/template/search?${stringify(inputQuery)}`,
      inputParams,
      {
        signal: inputSignal,
        headers: { 'Authorization': `Bearer ${inputToken}` },
      }
    )
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}