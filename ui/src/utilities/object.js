export const getDefaultErrorMessage = (inputResponse) => {
  return {
    open: true,
    severity: 'error',
    title: inputResponse?.data?.error?.status?.replaceAll('_', ' ') || '',
    message: inputResponse?.data?.error?.message || 'Something went wrong',
  }
}