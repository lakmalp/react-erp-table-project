import React from "react"
import { Helmet } from "react-helmet-async"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <div className="w-screen h-body bg-white flex items-center justify-center">
        <div className="text-lg font-semibold font-inter px-3 py-2 rounded text-center bg-gray-700">
          <div className="text-gray-100">Default Home Page</div>
        </div>
      </div>
    </>
  )
}

export default Home