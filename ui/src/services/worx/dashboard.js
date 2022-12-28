// QUERY
import { stringify } from 'query-string'

export const postDashboardStatsMap = async (
  inputSignal,
  inputRequestParams, 
  inputBodyParams, 
  inputAxiosPrivate,
) => {
  try {
    const response = await inputAxiosPrivate.post(
      `/dashboard-stats/map?${stringify(inputRequestParams)}`, 
      inputBodyParams, 
      { signal: inputSignal }
    )
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postDashboardStatsChart = async (
  inputSignal,
  inputRequestParams, 
  inputBodyParams, 
  inputAxiosPrivate,
) => {
  try {
    const response = await inputAxiosPrivate.post(
      `/dashboard-stats/chart?${stringify(inputRequestParams)}`, 
      inputBodyParams, 
      { signal: inputSignal }
    )
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}
