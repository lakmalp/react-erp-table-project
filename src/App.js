import './App.css';
import PurchaseOrderScreen from "./Screens/PurchaseOrderScreen";
import {Loader} from "./_core/components/index";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { DialogBoxProvider } from './_core/providers/DialogBoxContext';
import { DialogBoxContainer } from './_core/components/DialogBox';
import { GlobalStateProvider } from './_core/providers/GlobalStateContext';
import { BreadCrumbs, MainCommandBar, ToastContainer } from "./_core/components/index"
import { ToastProvider } from './_core/providers/ToastContext';

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
                  <div className='overflow-y-auto' style={{ maxHeight: 'calc(100vh - 40px)' }}>
                    <Loader />
                    <Routes>
                      <Route path="purchaseOrders/:id" element={<PurchaseOrderScreen />}></Route>
                    </Routes>
                  </div>
                </div>
              </div>
            </ToastProvider>
          </DialogBoxProvider>
        </GlobalStateProvider>
      </BrowserRouter>
    </>
  )
}

export default App;
