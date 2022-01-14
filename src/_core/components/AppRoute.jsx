import React, { useContext } from "react";
import { Navigate, Route, useLocation } from "react-router-dom";
// import AnimatedLoader from "./AnimatedLoader";
import { AuthContext } from "../providers/AuthContext";
import NotFound from "../screens/NotFound";
import AppShell from "./AppShell";


const AppRoute = ({ component: Component, path, clientPath, isPrivate, isAuthed, grant, ...rest }) => {
  const auth = useContext(AuthContext)
  const location = useLocation()
  const permissions = auth.permissions

  if ((location.pathname === "/login") && (auth.isAuthed)) {
    return (
      <Navigate replace to="/" />
      // <Redirect to={{ pathname: "/" }} />
    )
  }

  return (
    <Route
      path={path}
      render={props => {
        if (isPrivate) {
          if (typeof auth.isAuthed === 'undefined') {
            // return <AnimatedLoader />
            return <></>
          } else {
            if (auth.isAuthed) {
              if (typeof permissions === 'undefined') {
                return <div>Checking permissions...</div>
              } else {
                if (permissions.includes(grant)) {
                  // if (location.pathname === "/") {
                  //   return (
                  //     <Redirect to={{ pathname: "/projects/current" }} />
                  //   )
                  // } else if (location.pathname === "/login") {
                  if (location.pathname === "/login") {
                    return <Component {...props} />
                  // } else if (location.pathname === "/test") {
                  //   return <Component {...props} />
                  } else {
                    return (
                      <AppShell>
                        <Component {...props} />
                      </AppShell>
                    )
                  }
                } else {
                  return <NotFound intended={location.pathname} />
                }
              }

            }
            else {
              // return <Redirect
              //   to={{
              //     pathname: "/login",
              //     state: { from: location }
              //   }}
              // />
            }
          }
        } else {
          return <Component {...props} />
        }
      }
      }
      {...rest}
    />
  )
}

export default AppRoute