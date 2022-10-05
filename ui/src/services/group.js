//APIS
import { axiosPrivate } from 'apis/axios'

// TO DO: REPLACE WITH THE NEW API CONTAINING FILTER, SORT, PAGINATION, AND SEARCH
export const getGroupList = async (inputSignal) => {
  try {
    const response = await axiosPrivate.get(
      '/groups', 
      {
        signal: inputSignal,
        //headers: { 'Authorization': `Bearer ${inputToken}` },
      }
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postCreateGroup = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axiosPrivate.post(
      '/groups', 
      inputBodyParams, 
      {
        signal: inputSignal,
        //headers: { 'Authorization': `Bearer ${inputToken}` },
      },
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}