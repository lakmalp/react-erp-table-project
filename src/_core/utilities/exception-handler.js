export const processException = (err) => {
  let msg = ""
  if (err.response) {
    msg = err.response.data.message
  } else if (err.request) {
    console.error(err.request)
    msg = "NETWORK ERROR: Server is not available."
  } else {
    msg = err.message
  }
  return msg
}

export const decodeError = (err) => {
  if (err.response) {
    if (err.response.status === 404) {
      return ({ type: "ERR", message: "APP_ERR: Please contact system administrator." })
    }
    return ({ type: "ERR", message: err.response.data.message })
  } else if (err.request) {
    return ({ type: "ERR", message: "Network Error" })
  } else {
    return ({ type: "ERR", message: err.message })
  }
}