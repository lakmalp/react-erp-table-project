import React, { useRef } from "react"
import { Routes } from "react-router-dom"
import AppRoute from './AppRoute';
import NotExistRoute from '../components/NotExistRoute';
import base_routes from "../base-routes"
import app_routes from "../../Routes"

const RouteStore = () => {
  let _routes = []
  let hasRootRef = useRef(false)

  hasRootRef.current = app_routes.reduce((acc, cur) => {
    acc = acc || (cur.path === '/')
    return acc
  }, false)

  if (hasRootRef.current) {
    _routes = [...base_routes.filter(item => item.path !== '/'), ...app_routes]
  } else {
    _routes = [...base_routes, ...app_routes]
  }


  return (
    <Routes>
      {
        Array.isArray(app_routes) &&
        _routes.map((route) => (
          <AppRoute
            key={route.path}
            path={route.path}
            component={(props) => <LazyComponent page={route.page} folder={route.folder} {...props} />}
            isPrivate={route.isPrivate}
            exact={route.exact}
            clientPath={route.clientPath}
            grant={route.grant}
          />
        ))
      }
      <NotExistRoute routes={[...base_routes, ...app_routes]} />
    </Routes>
  )
}

export const LazyComponent = (props) => {
  let Comp = React.lazy(() => import("../../" + props.folder + "/" + props.page))
  return (
    <Comp {...props} />
  )
}

export default RouteStore