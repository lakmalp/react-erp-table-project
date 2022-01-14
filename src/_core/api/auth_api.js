import api from "./init"

const throwErr = (err) => {
  if (err.response) {
    throw Error(err.response.data.message);
  } else if (err.request) {
    throw Error("Service is not available. Please refresh the page and try again later.");
  } else {
    throw Error(err.message);
  }
}

export const auth_api_login = async (email, password) => {
  var payload = {
    "email": email,
    "password": password
  }
  await api().post("/login", payload)
    .then()
    .catch(err => {
      throwErr(err)
    })
  // try {
  //   let res = await api().post("/login", payload)
  // } catch (err) {
  //   throwErr(err)
  // }
}

export const auth_api_change_password = async ({ current_pwd, new_pwd }) => {
  var ret = {}
  var payload = {
    "current_pwd": current_pwd,
    "new_pwd": new_pwd
  }
  await api().post("/auth/resetPassword", payload)
    .then((response) => {
      ret = { status: "OK", data: response.data.data, code: response.status, message: "Password successfully changed." }
    })
    .catch(err => {
      if (err.response) {
        ret = { status: "ERR", type: "RESPONSE", data: "", code: err.response.status, message: err.response.data.message }
      } else if (err.request) {
        ret = { status: "ERR", type: "REQUEST", data: "", code: "", message: "Network Error" }
      } else {
        ret = { status: "ERR", type: "GENERAL", data: "", code: "", message: err.message }
      }
    });
  return ret
}

export const auth_api_logout = async () => {
  var ret = {}
  await api().post("/logout")
    .then((response) => {
      ret = { status: "OK", data: response.data.data, code: response.status, message: "" }
    })
    .catch(err => {
      if (err.response) {
        ret = { status: "ERR", type: "RESPONSE", data: "", code: err.response.status, message: err.response.data.message }
      } else if (err.request) {
        ret = { status: "ERR", type: "REQUEST", data: "", code: "", message: err.request.message }
      } else {
        ret = { status: "ERR", type: "GENERAL", data: "", code: "", message: err.message }
      }
    });
  return ret
}

export const auth_api_is_logged = async () => {
  try {
    return await api().get("/api/is-logged");
  } catch (err) {
    throwErr(err);
  }
}

export const auth_api_get_user = async () => {
  try {
    return await api().get("/api/user");
  } catch (err) {
    throwErr(err)
  }
}

export const auth_api_set_csrf_cookie = async () => {
  try {
    return await api().get("/sanctum/csrf-cookie");
  } catch (err) {
    throwErr(err)
  }
}