import React, { useContext, useState } from "react"
import { DialogBoxContext } from "../../providers/DialogBoxContext"
import { IconTimes, IconWindowMaximize, IconWindowRestore } from "../../utilities/svg-icons"

export const DialogBoxConstants = {
  Result: {
    Ok: "ok",
    Cancel: "cancel",
    Close: "close"
  }
}

export const DialogBoxPlaceholder = (props) => {
  const windowSizes = {
    Default: props.windowSize,
    Maximized: " sm:w-full sm:max-w-full h-dlg-height"
  }
  const [windowSize, setWindowSize] = useState(windowSizes.Default)
  let DialogBox = useContext(DialogBoxContext);

  const dlgCallback = (result, data) => {
    props.callback(result, data, DialogBox.stack)
  }

  return (
    <div className="fixed inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" style={{ zIndex: props.windowId }}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className={"inline-block bg-white " + (windowSize === windowSizes.Maximized ? " h-screen " : "rounded-lg") + " text-left overflow-hidden shadow-lg transform transition-all sm:align-middle " + (windowSize)}>
          <div className="bg-ss-100  w-full">
            <div className={`flex sm:justify-end`}>
              <button
                onClick={() => {
                  if (windowSize === windowSizes.Default) {
                    setWindowSize(windowSizes.Maximized)
                  }
                  if (windowSize === windowSizes.Maximized) {
                    setWindowSize(windowSizes.Default)
                  }
                }}
                type="button"
                className={`h-8 w-8 bg-ss-700 text-xs font-inter hover:bg-ss-800`}
              >
                {
                  windowSize === windowSizes.Maximized
                    ? <IconWindowMaximize className="mx-auto" color="#fff" width="12" />
                    : <IconWindowRestore className="mx-auto" color="#fff" width="12" />
                }
              </button>
              <button
                onClick={() => props.callback(DialogBoxConstants.Result.Close, {}, DialogBox.stack)}
                type="button"
                className={"h-8 w-8 bg-ss-700 text-center " + (windowSize === windowSizes.Maximized ? "" : "rounded-tr") + " bg-gradient-to-b text-xs font-inter hover:from-red-600 hover:to-red-600 hover:shadow-md hover:text-white"}
              >
                <IconTimes className="mx-auto" color="#fff" width="18" />
              </button>
            </div>
            <div className="sm:flex sm:items-start w-full">
              <div className="text-center sm:mt-0 sm:text-left w-full">
                <DynamicComponent component={props.component} callback={(result, data) => dlgCallback(result, data)} {...props.params} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

const DynamicComponent = (props) => {
  return React.cloneElement(props.component, {
    ...props
  })
}
