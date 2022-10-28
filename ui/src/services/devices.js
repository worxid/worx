export const postGetListDevices = async (inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.post('/devices/search', inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putApprovedDevices = async (deviceId, inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.put(`/devices/${deviceId}/approve`, inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putAssignGroupDevices = async (deviceId, inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.put(`/devices/${deviceId}/group`, inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const putUpdateLabelDevices = async (deviceId, inputSignal, inputParams, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.put(`/devices/${deviceId}/label`, inputParams, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}

export const deleteDevices = async (deviceId, inputSignal, inputAxiosPrivate) => {
  try {
    const response = await inputAxiosPrivate.delete(`/devices/${deviceId}`, {
      signal: inputSignal,
    })
    return response
  } catch (error) {
    if (error.message === 'canceled') return { status: 'Canceled' }
    else if (!error.response) return { status: 'No Server Response' }
    else return error.response
  }
}