import { useContext, useEffect, useRef, useState } from "react"
import { auth_api_get_user, auth_api_login } from "../../api/auth_api";
import { IconKey, IconLoading } from "../../utilities/svg-icons"
import { AuthContext } from "../../providers/AuthContext";
import history from "../../utilities/history";

const Login = () => {
  const emailRef = useRef()
  const auth = useContext(AuthContext);
  const [focussedEl, setFocussedEl] = useState("email");
  const [data, setData] = useState({email:"",password:""})
  const login = async () => {
    auth.login(data.email, data.password);
  }
  useEffect(() => {
    emailRef.current.focus();
  }, [])
  return (
    <div className="container h-screen" style={{ paddingTop: "calc(100vh/5)" }}>
      <div className="relative mx-auto bg-ss-100 rounded-2xl shadow-md pt-14 max-w-xs pb-2 pl-2 pr-2">
        <div className=" flex justify-center items-center">
          <IconKey className="absolute -mt-6 p-0 " width="55" color="rgb(59, 130, 246)" />
        </div>
        <div className={"mt-20 bordera border-ss-300 rounded-md " + (focussedEl === "email" ? "bg-whitea" : "bg-ss-50a")}>
          <label className={"block font-montserrat text-xs font-semibold mb-1 " + (focussedEl === "email" ? "text-gray-600" : "text-gray-300")}>Email</label>
          <input
            value={data.email}
            onChange={(e) => setData(prev => ({...prev, email: e.target.value}))}
            ref={emailRef}
            type="text"
            disabled={auth.status==="pending"}
            className={"h-8 w-full font-inter border rounded px-1 focus:outline-none mt-0 " + (focussedEl === "email" ? "text-gray-600 bg-white" : "text-gray-400 bg-ss-50")}
            onFocus={() => setFocussedEl("email")}
          />
        </div>
        <div className={"mt-3 bordera border-ss-300 rounded-md " + (focussedEl === "password" ? "bg-whitea" : "bg-ss-50a")}>
          <label className={"block font-montserrat text-xs font-semibold mb-1 " + (focussedEl === "password" ? "text-gray-600" : "text-gray-300")}>Password</label>
          <input
            value={data.password}
            onChange={(e) => setData(prev => ({ ...prev, password: e.target.value }))}
            type="password"
            disabled={auth.status === "pending"}
            className={"h-8 w-full font-inter border rounded px-1 focus:outline-none mt-0 " + (focussedEl === "password" ? "text-gray-600 bg-white" : "text-gray-400 bg-ss-50")}
            onFocus={() => setFocussedEl("password")}
          />
        </div>
        <div className={"my-3 mx-1 text-xs font-inter p-1 rounded bg-whitea text-red-500 " + (["pending", "success"].includes(auth.status) ? "hidden" : "")}>
          {auth.authErr}
        </div>
        <div className="flex justify-between items-center mt-3 px-1">
          <div className={"text-xs font-inter rounded text-green-500 "} >
            <span className={(["pending"].includes(auth.status) ? "" : "hidden")}>
              <IconLoading className="animate-spin-slow" width="18" color="rgb(59, 59, 59)" />
            </span>
          </div>
          <button
            className={"py-2 font-semibold px-3 rounded-tl-xl rounded-br-xl font-montserrat text-xs " + (["pending"].includes(auth.status) ? "text-gray-400 cursor-default" : "text-white bg-gray-800 hover:bg-gray-900 hover:shadow")}
            disabled={(["pending"].includes(auth.status) ? true : false)}
            onClick={() => login()}
          >
            Sign In
          </button>
        </div>
      </div>
      {/* <pre>
        {
          JSON.stringify(auth.status)
        }
      </pre> */}
    </div>
  )
}

export default Login