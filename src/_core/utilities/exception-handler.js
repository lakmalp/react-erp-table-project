export const decodeError = (err) => {
  if (err.response) {
    if (err.response.status === 404) {
      return "APP_ERR: Please contact system administrator."
    }
    return (err.response.data.errors ? err.response.data.errors : err.response.data.message)
  } else if (err.request) {
    return "Network Error"
  } else {
    return err.message
  }
}