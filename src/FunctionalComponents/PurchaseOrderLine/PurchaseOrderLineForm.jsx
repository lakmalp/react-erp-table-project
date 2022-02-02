import { useEffect, useState } from "react";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";
import purchase_order_line_api from "./purchase_order_line_api";
import { decodeError } from "../../_core/utilities/exception-handler"

const PurchaseOrderLineForm = (props) => {
  const [localData, setLocalData] = useState({ ...props.data });
  const [apiPreparing, setApiPreparing] = useState(false);
  const [apiCreating, setApiCreating] = useState(false);
  const [apiErrors, setApiErrors] = useState({})
  const [isBtnSaveDisabled, setIsBtnSaveDisabled] = useState(false)

  useEffect(() => {
    const { parent_id, current_sequence, positioning } = props;
    (async () => {
      try {
        let res = "";
        setApiPreparing(true)
        if (props.mode === "new") {
          res = await purchase_order_line_api.prepareCreate(parent_id, current_sequence, positioning);
        } else {
          res = await purchase_order_line_api.prepareEdit(localData.id);
        }
        setLocalData(res.data.data)
      } catch (err) {
        setApiErrors(decodeError(err).message)
      } finally {
        setApiPreparing(false)
      }
    })();
  }, [])

  useEffect(() => {
    setIsBtnSaveDisabled(apiPreparing || apiCreating)
  }, [apiPreparing, apiCreating])

  const save = async () => {
    try {
      setApiCreating(true);
      let res = await purchase_order_line_api.create(localData);
      setApiCreating(false);
      props.callback(DialogBoxConstants.Result.Ok, localData);
    } catch (err) {
      setApiErrors(decodeError(err).message)
    } finally {
      setApiCreating(false);
    }
  }

  return (
    <div className="w-full bg-white font-inter text-sm">
      <div className="grid grid-cols-6 gap-2 p-2">
        <div className="col-span-2">
          <label className="block">Part Code</label>
          <input
            id="part_code"
            type="text"
            value={localData.part_code || ''}
            onChange={(e) => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
            className="border rounded h-7 outline-none px-1 w-full"
            disabled={apiPreparing || apiCreating}
          />
          {(apiErrors.hasOwnProperty("part_code")) && <div className="text-xs text-red-600 mt-1">{apiErrors.part_code}</div>}
        </div>
        <div className="col-span-4">
          <label className="block">Part Description</label>
          <input
            id="part_description"
            type="text"
            value={localData.part_description || ''}
            onChange={(e) => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
            className="border rounded h-7 outline-none px-1 w-full"
            disabled={apiPreparing || apiCreating}
          />
          {(apiErrors.hasOwnProperty("part_description")) && <div className="text-xs text-red-600 mt-1">{apiErrors.part_description}</div>}
        </div>
        <div className="col-span-2">
          <label className="block">Delivery Date</label>
          <input
            id="delivery_date"
            type="date"
            value={localData.delivery_date || ''}
            onChange={(e) => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))}
            className="border rounded h-7 outline-none px-1 w-full"
            disabled={apiPreparing || apiCreating}
          />
          {(apiErrors.hasOwnProperty("delivery_date")) && <div className="text-xs text-red-600 mt-1">{apiErrors.delivery_date}</div>}
        </div>
        {/* <div className="col-span-2">
          <label className="block">Tax</label>
          <input type="text" className="border rounded h-7 outline-none px-1 w-full" />
        </div>
        <div className="col-span-2">
          <label className="block">Discount</label>
          <input type="text" className="border rounded h-7 outline-none px-1 w-full" />
        </div> */}
      </div>
      <div className="bg-ss-100 w-full p-2 text-right text-xs mt-3">
        <button
          className={"px-4 rounded font-nunito h-7 font-semibold " + (isBtnSaveDisabled ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white")}
          onClick={() => save()}
        >
          {apiPreparing ? <span>Please wait...</span> : (apiCreating ? <span>Saving...</span> : <span>Save</span>)}
        </button>
      </div>
    </div>
  )
}
export default PurchaseOrderLineForm;