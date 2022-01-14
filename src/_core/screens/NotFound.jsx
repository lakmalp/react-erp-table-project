import React, { useContext, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { AuthContext } from "../providers/AuthContext"

const NotFound = ({ intended }) => {
  let auth = useContext(AuthContext)

  // useEffect(() => {
  //   setTimeout(() => {
  //     auth.logout()
  //   }, 300)
  // }, [])

  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <div className="flex justify-center">
        <div>
          <div className="text-center font-publicSans text-xl mt-10 text-gray-500">Oops</div>
          <div className="font-publicSans text-base mt-10 text-gray-500">Requested URL <pre className="inline-block text-red-700">{intended}</pre> was not found on this server.</div>
        </div>
      </div>
    </>
  )
}

export default NotFound