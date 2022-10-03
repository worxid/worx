import axios from 'axios'

const baseURL = process.env.REACT_APP_API_BASE_URL
const headers = { 'Content-Type': 'application/json' }

export default axios.create({
  baseURL: baseURL,
  headers: headers,
})

export const axiosPrivate = axios.create({
  baseURL: baseURL,
  headers: headers,
})