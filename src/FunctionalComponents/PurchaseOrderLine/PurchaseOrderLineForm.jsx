import { useState } from "react";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";

const PurchaseOrderLineForm = (props) => {
  const [localData, setLocalData] = useState({});

  return (
    <div className="w-full bg-white font-inter text-sm">
      <div className="grid grid-cols-6 gap-2 p-2">
        <div className="col-span-2">
          <label className="block">Part Code</label>
          <input id="part_code" type="text" className="border rounded h-7 outline-none px-1 w-full" value={localData.part_code || ''} onChange={(e) => setLocalData(prev => ({...prev, [e.target.id]: e.target.value}))} />
        </div>
        <div className="col-span-4">
          <label className="block">Part Description</label>
          <input type="text" className="border rounded h-7 outline-none px-1 w-full" />
        </div>
        <div className="col-span-2">
          <label className="block">Price</label>
          <input type="text" className="border rounded h-7 outline-none px-1 w-full" />
        </div>
        <div className="col-span-2">
          <label className="block">Tax</label>
          <input type="text" className="border rounded h-7 outline-none px-1 w-full" />
        </div>
        <div className="col-span-2">
          <label className="block">Discount</label>
          <input type="text" className="border rounded h-7 outline-none px-1 w-full" />
        </div>
      </div>
      <div className="bg-ss-100 w-full p-2 text-right text-xs mt-3">
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
export default PurchaseOrderLineForm;