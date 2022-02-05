import React, { useContext, useEffect } from "react"
import { ToastContext } from "../../providers/ToastContext"
import { IconTimes } from "../../utilities/svg-icons"

export const ToastPlaceholder = (props) => {
  let Toast = useContext(ToastContext);

  useEffect(() => {
    if (props.modeOfClose === Toast.Constants.ModeOfClose.Auto) {
      setTimeout(() => props.callback(Toast.stack),props.duration)
    }
  },[])

  const close = () => {
    props.callback(Toast.stack)
  }

  return (
    <div className="fixed rounded-lg m-8 md:w-full max-w-sm" style={{ left: "50%", transform: "translateX(-50%)"}}>
      <div className="bg-green-100 shadow-lga mx-auto max-w-full text-sm pointer-events-auto shadow-lg bg-clip-padding rounded block" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
        <div className=" bg-green-100 flex justify-between items-center py-2 px-3 bg-clip-padding  rounded">
          <p className=" text-green-700">{ props.component}</p>
          <div className="flex items-center">
            {
              (props.modeOfClose !== Toast.Constants.ModeOfClose.Auto) &&
              <button
                type="button"
                className=" btn-close box-content w-4 h-4 ml-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-mdb-dismiss="toast"
                aria-label="Close"
                onClick={() => close()}
              >
                <IconTimes width="15" />
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
