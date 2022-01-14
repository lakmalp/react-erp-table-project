import React, { useContext } from "react"
import { AuthContext } from "../providers/AuthContext"
// import NavbarPioneer from "./NavbarPioneer"
// import SidebarPioneer from "./SidebarPioneer"
// import SubNavbar from "./SubNavbar"

const AppShell = (props) => {
  const auth = useContext(AuthContext)
  const logout = () => {
    auth.logout()
  }
  return (
    // <div className="container mx-auto flex justify-center" style={{ height: "100vh", backgroundColor: "#EDEDED", minWidth: "768px", widtha: "100%" }}>
    //   <div className="" style={{ width: "225px", backgroundColor: "#EDEDED" }}>
    //     <div className="h-20 flex justify-center items-center"><div><img width="100px" src="./logo.png" alt="logo" /></div></div>
    //     <div className="pt-6a" style={{ backgroundColor: "#f8f8f8", height: "calc(100vh - 12rem)", width: "225px", minWidth: "225px" }}>
    //       <SidebarPioneer />
    //     </div>
    //     <div className=" absolute bottom-0" style={{ width: "225px", minWidth: "225px" }}>
    //       <div className="h-16 rounded-bl-3xl flex items-center" style={{ backgroundColor: "#E2E2E2" }}>
    //         {/* <button className="text-gray-600 font-semibold font-montserrat pl-6" style={{ fontSize: 12 }} onClick={() => logout()}>
    //           <img className="inline pr-2" src="./img/fi-rr-sign-in.svg" alt="Logout" />{`${auth.user.name} (logout)`}
    //         </button> */}
    //       </div>
    //       <div className="h-20 flex justify-center items-center" style={{ backgroundColor: "#EDEDED" }}>
    //         <div className="font-montserrat text-gray-500" style={{ fontSize: 10 }}>© 2021 PIONEER SHADE STRUCTURES</div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="" style={{ width: "calc(100vw - (225px + 2 * (100vw * 0.3 - 225px)))" }}>
    //     <NavbarPioneer />
    //     <div className="w-full bg-white rounded-r-2xl overflow-y-auto p-4 center-content-shadow" style={{ height: "calc(100vh - 160px)", minHeight: "192px" }}>
    //       {props.children}
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto px-2" style={{ height: "100vh", backgroundColor: "#EDEDED", minWidth: "768px", maxWidth: "calc(100vw - (0px + 2 * (100vw * 0.3 - 225px)))" }}>
      <div className="flex items-center justify-between">
        <div><img width="200px" src="./logo.png" alt="logo" /></div>
        <div className="text-right">
          <span className="text-black font-semibold font-montserrat py-3 mr-2" style={{ fontSize: 12 }}>
            Welcome {auth.user.name}
          </span>
          <span className="text-black font-semibold font-montserrat py-3" style={{ fontSize: 12 }}>
            (
            <button className="text-black font-semibold font-montserrat py-3 hover:text-blue-500" style={{ fontSize: 12 }} onClick={() => logout()}>
              logout
            </button>
            )
          </span>
          {/* <NavbarPioneer /> */}
        </div>
      </div>
      <div className="flex justify-start items-center mt-3 rounded-t-3xl bg-ss-100 overflow-hidden">
        {/* <SubNavbar /> */}
      </div>
      <div className="bg-white overflow-y-auto rounded-b-3xl" style={{ height: "calc(100vh - 182px)", minHeight: "192px" }}>
        {props.children}
      </div>
      <div className=" flex justify-start items-center" style={{ backgroundColor: "#EDEDED", height: "40px" }}>
        <div className="font-montserrat text-gray-500" style={{ fontSize: 10 }}>© 2021 PIONEER SHADE STRUCTURES</div>
      </div>
    </div>
  )
}

export default AppShell