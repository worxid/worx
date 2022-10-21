//APIS
import axios, { axiosPrivate } from 'apis/axios'

export const getUserDetails = async (
  inputSignal, 
  inputAccessToken,
) => {
  try {
    const response = await axiosPrivate.get(
      '/api/users/user-details', 
      {
        signal: inputSignal,
        headers: { 'Authorization': `Bearer ${inputAccessToken}` },
      },
    )

    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
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

export const postLoginUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/login', 
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

export const postResetPasswordUser = async (
  inputSignal, 
  inputBodyParams, 
) => {
  try {
    const response = await axios.post(
      '/api/users/reset-password/verify', 
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