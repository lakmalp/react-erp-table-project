import _ from "lodash";
import React, { useState } from "react";

export const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [stack, setStack] = useState([])
  const [windowId, setWindowId] = useState(50);

  const handleDialogAction = (stack) => {
    let _stack = _.cloneDeep(stack);
    _stack.pop();
    setStack(_stack);
  }

  return (
    <ToastContext.Provider
      value={{
        Constants: {
          Type: {
            Success: "success",
            Error: "error",
            Info: "info"
          },
          ModeOfClose: {
            Auto: "auto",
            Manual: "manual"
          }
        },
        stack: stack,
        show: (comp, type, modeOfClose, duration = 1000) => {
          let next_window_id = windowId + 1;
          setWindowId(next_window_id);
          setStack(prev => {
            return (
              [
                ...prev,
                {
                  component: comp,
                  type: type,
                  modeOfClose: modeOfClose,
                  duration: duration,
                  callback: (stack) => handleDialogAction(stack),
                  windowId: next_window_id

                }
              ]
            )
          });
        },
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}