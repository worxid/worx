// QUERY
import { stringify } from 'query-string'

export const postCreateFormTemplate = async (inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.post('/form/template', inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const getDetailFormTemplate = async (formTemplateId, inputSignal, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.get(`/form/template/${formTemplateId}`, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putUpdateFormTemplate = async (formTemplateId, inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.put(`/form/template/${formTemplateId}`, inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postGetListFormTemplate = async (inputSignal, inputQuery, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.post(`/form/template/search?${stringify(inputQuery)}`,
      inputParams,
      { signal: inputSignal },
    )
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const deleteFormTemplate = async (formTemplateId, inputSignal, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.delete(`/form/template/${formTemplateId}`, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putAssignGroupFormTemplate = async (formTemplateId, inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.put(`/form/template/${formTemplateId}/assign`, inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postShareFormTemplate = async (formTemplateId, inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.post(`/form/template/${formTemplateId}/share`, inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}