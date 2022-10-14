//APIS
import { axiosPrivate } from 'apis/axios'

export const deleteGroup = async (inputSignal, inputId, inputToken) => {
  try {
    const response = await axiosPrivate.delete(
      `/groups/${inputId}`, 
      {
        signal: inputSignal,
        headers: { 'Authorization': `Bearer ${inputToken}` },
      },
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// TO DO: REPLACE WITH THE NEW API CONTAINING FILTER, SORT, PAGINATION, AND SEARCH
export const getGroupList = async (inputSignal, inputToken) => {
  try {
    const response = await axiosPrivate.get(
      '/groups', 
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

export const postCreateGroup = async (inputSignal, inputBodyParams, inputToken) => {
  try {
    const response = await axiosPrivate.post(
      '/groups', 
      inputBodyParams, 
      {
        signal: inputSignal,
        headers: { 'Authorization': `Bearer ${inputToken}` },
      },
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putEditGroup = async (inputSignal, inputId, inputBodyParams, inputToken) => {
  try {
    const response = await axiosPrivate.put(
      `/groups/${inputId}`, 
      inputBodyParams, 
      {
        signal: inputSignal,
        headers: { 'Authorization': `Bearer ${inputToken}` },
      },
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}