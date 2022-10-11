// DATE AND TIME
import { format } from 'date-fns'

export const convertDate = (inputDate, inputFormat = 'dd-MM-yyyy, hh:mm a') => {
  if (!inputDate) return ''
  else {
    const date = new Date(inputDate).toLocaleString('en-US', {timeZone: 'Asia/Jakarta'})
    return date === 'Invalid Date' ? inputDate : format(new Date(date), inputFormat)
  }
}