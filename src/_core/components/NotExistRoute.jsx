import React from "react";
import { useLocation } from "react-router-dom";
import NotFound from "../screens/NotFound";

const NotExistRoute = ({ routes }) => {
  const location = useLocation()

  return (
    <>
      {
        (typeof routes === 'undefined') &&
        <div>Loading...</div>
      }
      {
        (typeof routes !== 'undefined') &&
        <NotFound intended={location.pathname} />
      }
    </>
  )

}

export default NotExistRoute