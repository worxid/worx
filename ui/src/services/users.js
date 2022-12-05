//APIS
import axios from 'apis/axios'

export const getUserDetails = async (
  inputSignal, 
  inputAxiosPrivate,
) => {
  try {
    const response = await inputAxiosPrivate.get(
      '/api/users/user-details', 
      { signal: inputSignal },
    )

    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postForgotPasswordUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/reset-password', 
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

export const postLoginUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/login', 
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

export const postRefreshToken = async (inputRefreshToken) => {
  try {
    const response = await axios.post(
      '/api/users/refresh-token',
      { refresh_token: inputRefreshToken },
    )

    return response
  }
  catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postRegisterUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/register', 
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

export const postResetPasswordUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/reset-password/verify', 
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

export const postResendEmailConfirmation = async (inputSignal, inputBodyParams) => {
  try {
    const response = await axios.post('/api/users/email-verify', inputBodyParams, {
      signal: inputSignal,
    })

    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const postChangePasswordUser = async (
  inputSignal, 
  inputBodyParams,
  inputAxiosPrivate
) => {
  try {
    const response = await inputAxiosPrivate.post(
      '/api/users/change-password', 
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