import { useState } from "react";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";

const PurchaseOrderForm = (props) => {
  const [localData, setLocalData] = useState({});
  return (
    <div className={" bg-white " + props.className}>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 py-2">
        Purchase Order
      </div>
      <div className="px-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mb-2">
        <div className="font-inter 2xl:col-span-3">
          <label className="block text-xs">Supplier</label>
          <input type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={props.data.supplier} />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Created Date</label>
          <input type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={props.data.created_date} />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Delivery Date</label>
          <input type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={props.data.delivery_date} />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Status</label>
          <input type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={props.data.status} />
        </div>
      </div>
      <div className="bg-ss-100 w-full p-2 text-right text-xs">
        <button
          className="px-4 bg-blue-500 text-white rounded font-montserrat font-semibold h-7"
          onClick={() => props.callback(DialogBoxConstants.Result.Ok, localData.part_code)}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default PurchaseOrderForm;