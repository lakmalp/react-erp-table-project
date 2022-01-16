import { useEffect, useState, useContext } from "react";
import { purchase_order_api } from "../../_core/api";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";

const PurchaseOrderForm = (props) => {
  const [localData, setLocalData] = useState({});
  const globalState = useContext(GlobalStateContext)
  const [status, setStatus] = useState("")

  const save = async () => {
    try {
      setStatus("waiting")
      let res = await purchase_order_api.update(props.data.id, localData)
      setStatus("success")
      props.callback(DialogBoxConstants.Result.Ok, res.data)
    } catch (err) {
      setStatus("error")
    }
  }

  return (
    <div className={" bg-white " + props.className}>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 py-2">
        Purchase Order
      </div>
      <div className="px-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 mb-2">
        <div className="font-inter 2xl:col-span-3">
          <label className="block text-xs">Supplier</label>
          <input id="supplier" type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={localData.supplier ?? props.data.supplier} onChange={e => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))} />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Created Date</label>
          <input id="created_date" type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={localData.created_date ?? props.data.created_date} disabled />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Delivery Date</label>
          <input id="delivery_date" type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={localData.delivery_date ?? props.data.delivery_date} onChange={e => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))} />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Status</label>
          <input type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={localData.status ?? props.data.status} disabled />
        </div>
      </div>
      <div className="bg-ss-100 w-full p-2 text-right text-xs">
        <button
          className={"px-4 rounded font-montserrat font-semibold h-7 " + ((status === "waiting") ? "bg-gray-100 text-gray-500" : "bg-blue-500 text-white")}
          onClick={() => save()}
        >
          {(status === "waiting") ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  )
}

export default PurchaseOrderForm;