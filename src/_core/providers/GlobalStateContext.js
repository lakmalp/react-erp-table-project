import React, { useState } from 'react';

export const GlobalStateContext = React.createContext();

export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({})
  const [loadingSource, setLoadingSource] = useState()

  return (
    <GlobalStateContext.Provider
      value={{
        read: (section) => state[section],
        write: (section, val) => setState(prev => ({ ...prev, [section]: val })),
        loadingSource: loadingSource,
        setLoadingSource: (p) => setLoadingSource(p)
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateContext;