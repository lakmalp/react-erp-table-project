export const decodeError = (err) => {
  if (err.response) {
    if (err.response.status === 404) {
      return ({ message: "APP_ERR: Please contact system administrator." })
    }
    return ({ message: (err.response.data.errors ? err.response.data.errors : err.response.data.message) })
  } else if (err.request) {
    return ({ message: "Network Error" })
  } else {
    return ({ message: err.message })
  }
}