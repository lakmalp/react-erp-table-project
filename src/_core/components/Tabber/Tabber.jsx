import React, { Children, useState } from "react";
// import { useSearchParams } from "react-router-dom";

export const TabContainer = (props) => {
  let _tab = Children.toArray(props.children).filter(child => {
    return child.props.active
  }
  )
  const [selectedTab, setSelectedTab] = useState(
    _tab
      .reduce((acc, curr) => {
        if (curr.props.active) {
          return curr.props.target;
        } else {
          return ""
        }
      }, "")
  )

  return (
    <>
      {
        Children.map(props.children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              disabled: child.props.disabled,
              active: (selectedTab === child.props.target),
              selectedTab: selectedTab,
              setSelectedTab: setSelectedTab,
              firstTab: (index === 0)
            });
          }
          return child;
        })
      }
    </>
  )
}

export const Tab = (props) => {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const alterSearchParams = (val) => {
  //   let _tabs = searchParams.get("tabs")
  //   if (_tabs && Array.isArray(_tabs.split("^"))) {

  //   }
  // }
  return (
    <button
      onClick={() => {
        // alterSearchParams(props.target)
        props.setSelectedTab(props.target)
      }}
      className={(props.firstTab === true ? "mx-2a" : "mx-2a") + " px-2 py-1 text-xs font-montserrat font-semibold border-b-4 " + (props.active ? " border-blue-500 text-black " : " border-gray-50 hover:bg-ss-100 " + (props.disabled ? " text-ss-300 pointer-events-none " : " text-ss-600"))}
    >
      {props.label}
    </button>
  )
}

export const TabPane = (props) => {
  return (
    <div className={"mt-4 " + (props.selectedTab === props.name ? "" : "hidden")}>
      {
        Children.map(props.children, (child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              disabled: child.props.disabled,
              active: (props.selectedTab === props.name),
            });
          }
          return child;
        })
      }
    </div>
  )
}