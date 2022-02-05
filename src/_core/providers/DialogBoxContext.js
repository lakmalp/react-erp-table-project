import _ from "lodash";
import React, { useState } from "react";

export const DialogBoxContext = React.createContext();

export const DialogBoxProvider = ({ children }) => {
  const [stack, setStack] = useState([])
  const [windowId, setWindowId] = useState(50);

  const handleDialogAction = (result, data, callback, stack) => {
    let _stack = _.cloneDeep(stack);
    _stack.pop();
    setStack(_stack)
    callback(result, data);
  }

  return (
    <DialogBoxContext.Provider
      value={{
        stack: stack,
        showModal: (comp, window_size, params, callback) => {
          let next_window_id = windowId + 1;
          setWindowId(next_window_id);
          setStack(prev => {
            return (
              [
                ...prev,
                {
                  component: comp,
                  callback: (result, data, stack) => handleDialogAction(result, data, callback, stack),
                  windowId: next_window_id,
                  windowSize: window_size,
                  params: params
                }
              ]
            )
          });
        },
      }}
    >
      {children}
    </DialogBoxContext.Provider>
  );
}