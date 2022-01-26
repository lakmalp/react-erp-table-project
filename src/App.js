import React, {
  // Suspense, 
  useContext
} from 'react';
// import { Helmet, HelmetProvider } from 'react-helmet-async';
import './App.css';
import PurchaseOrderScreen from "./Screens/PurchaseOrderScreen"
// import RouteStore from "./_core/components/RouteStore"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { DialogBoxContext, DialogBoxProvider } from './_core/providers/DialogBoxContext';
import { DialogBoxContainer } from './_core/components/DialogBox';
// import { AuthProvider } from "./_core/providers/AuthContext"
import { GlobalStateProvider, GlobalVarProvider } from './_core/providers/GlobalStateContext';
import { BreadCrumbs, MainCommandBar, ToastContainer } from "./_core/components/index"
import { ToastProvider } from './_core/providers/ToastContext';
// import history from './_core/utilities/history';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStateProvider>
          <DialogBoxProvider>
            <ToastProvider>
              <ToastContainer />
              <DialogBoxContainer />
              <div className='flex h-screen '>
                <div className='w-60 bg-gray-900 h-full pt-10 pl-2 text-white text-sm'>
                  <div className='py-1 pl-1 hover:bg-gray-800'>Purchase Orders</div>
                  <div className='py-1 pl-1 hover:bg-gray-800'>Customer Orders</div>
                </div>
                <div className=" w-full">
                  <div className='flex justify-between items-center bg-gray-900 px-2 h-10'>
                    <BreadCrumbs />
                    <MainCommandBar />
                  </div>
                  <Routes>
                    <Route path="purchaseOrders/:id" element={<PurchaseOrderScreen />}></Route>
                  </Routes>
                </div>
              </div>
            </ToastProvider>
          </DialogBoxProvider>
        </GlobalStateProvider>
      </BrowserRouter>
      {/* <AuthProvider>
        <GlobalVarProvider>
        <DialogBoxProvider>
          <DialogBoxContainer />
          <Router>
            <div className="container mx-auto w-full">
              <Routes>
                <Route path="/po" element={<PurchaseOrderScreen />}></Route>
              </Routes>
            </div>
          </Router>
          </DialogBoxProvider>
        </GlobalVarProvider>
      </AuthProvider> */}
      {/* <Router history={history} basename={process.env.PUBLIC_URL}>
        <AuthProvider>
          <GlobalVarProvider>
            <DialogBoxProvider>
              <DialogBoxContainer />
              <HelmetProvider>
              <Helmet>
                <style type="text/css">{`body {background-color: #dfe0e2;}`}</style>
              </Helmet>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <Suspense fallback={<div>Loading...</div>}>
                  <div className="w-full bg-white">
                      <RouteStore />
                  </div>
                </Suspense>
              </div>
              <CookieConsent
                buttonStyle={{ color: "#4e503b", fontSize: "14px", borderRadius: "5px", paddingLeft: "15px" }}
              >
                This site uses cookies. We use cookies to better understand the user and deliver a rich user experience.
              </CookieConsent>
              </HelmetProvider>
            </DialogBoxProvider>
          </GlobalVarProvider>
        </AuthProvider>
      </Router > */}
      {
        /* <pre>
          <ol className="">
            <li>* Addition should be able to be done either from top or bottom (if bottom, page should be scrolled to the end)</li>
            <ul>
              <li>* * when record is added, table should be refreshed since line numbers are altered in all records.</li>
            </ul>
            <li>* Delete callback should be called after getting the user confirmation for deletion</li>
          </ol>
        </pre> */
      }
    </>
  )
}

const Temp = () => {
  let dlg = useContext(DialogBoxContext);

  return (
    JSON.stringify(dlg.stack)
  )
}

export default App;
