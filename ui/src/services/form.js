// QUERY STRING
import { stringify } from 'query-string'

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