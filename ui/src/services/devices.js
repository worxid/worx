//APIS
import { axiosPrivate } from 'apis/axios'

export const postGetListDevices = async (inputSignal, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.post('/devices/search', inputParams, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}`}
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putApprovedDevices = async (deviceId, inputSignal, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.put(`/devices/${deviceId}/approve`, inputParams, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}`}
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putAssignGroupDevices = async (deviceId, inputSignal, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.put(`/devices/${deviceId}/group`, inputParams, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}`}
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putUpdateLabelDevices = async (deviceId, inputSignal, inputParams, inputToken) => {
  try {
    const response = await axiosPrivate.put(`/devices/${deviceId}/label`, inputParams, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}`}
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const deleteDevices = async (deviceId, inputSignal, inputToken) => {
  try {
    const response = await axiosPrivate.delete(`/devices/${deviceId}`, {
      signal: inputSignal,
      headers: { 'Authorization': `Bearer ${inputToken}`}
    })
    return response
  } catch (error) {
    if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}