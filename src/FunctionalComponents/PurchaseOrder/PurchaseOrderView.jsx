import PurchaseOrderForm from "./PurchaseOrderForm";
import { IconEdit, IconPlus } from "../../_core/utilities/svg-icons"
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { useContext } from "react";
import { DialogBoxContext } from "../../_core/providers/DialogBoxContext";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";
import { purchase_order_api } from "../../_core/api";

const PurchaseOrderView = (props) => {
  const globalState = useContext(GlobalStateContext)
  let DialogBox = useContext(DialogBoxContext);

  const edit = () => {
    globalState.write("activeDataSource", "PurchaseOrder")
    let params = {
      data: globalState.read(props.name),
      selectedLines: "line_selections"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/6";
    DialogBox.showModal(<PurchaseOrderForm />, window_size, params, cmdEdit_callback);
  }

  const cmdEdit_callback = async (result, data) => {
    if (result === DialogBoxConstants.Result.Ok) {
      globalState.write(props.name, data)
    }
  }
  
  return (
    <>
      <div className="font-montserrat text-sm font-semibold text-ss-900 bg-ss-100 p-2">
        <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-400 hover:bg-ss-600 text-black' onClick={() => edit()}>
          <div className='flex items-center mx-2'><IconEdit width="13" className="mr-2" color="#000" />Edit</div>
        </button>
        <button className='mr-2 py-2 text-xs font-roboto font-semibolda bg-ss-400 hover:bg-ss-600 text-black'>
          <div className='flex items-center mx-2'><IconPlus width="13" className="mr-2" color="#000" />New</div>
        </button>
      </div>
      <div className={props.className}>
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          <div className="font-inter 2xl:col-span-2">
            <label className="block text-xs">Supplier</label>
            <input type="text" className="h-7 w-full text-sm" value={props.data?.supplier || ''} readOnly />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Created Date</label>
            <input type="text" className="h-7 w-full text-sm" value={props.data?.created_date || ''} readOnly />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Delivery Date</label>
            <input type="text" className="h-7 w-full text-sm" value={props.data?.delivery_date || ''} readOnly />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Status</label>
            <input type="text" className="h-7 w-full text-sm" value={props.data?.status || ''} readOnly />
          </div>
        </div>
      </div>
    </>
  )
}

export default PurchaseOrderView;