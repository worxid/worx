//APIS
import axios from 'apis/axios'

export const postRegisterUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/register', 
      inputBodyParams, 
      {
        signal: inputSignal,
      },
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}