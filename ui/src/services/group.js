export const deleteGroup = async (
  inputSignal, 
  inputAxiosPrivate, 
  inputBodyParams,
) => {
  try {
    const response = await inputAxiosPrivate.delete(
      '/groups', 
      {
        data: inputBodyParams,
        signal: inputSignal,
      },
    )

    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

// TO DO: REPLACE WITH THE NEW API CONTAINING FILTER, SORT, PAGINATION, AND SEARCH
export const getGroupList = async (inputSignal, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.get(
      '/groups', 
      { signal: inputSignal }
    )

    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postCreateGroup = async (inputSignal, inputBodyParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.post(
      '/groups', 
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

export const putEditGroup = async (inputSignal, inputId, inputBodyParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.put(
      `/groups/${inputId}`, 
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