import { useEffect, useState, useContext } from "react";
import { Button } from "../../_core/components";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";
import { formatDate } from "../../_core/utilities/date-formatting";
import { IconExclamationInCircle, IconSave, IconTickInCircle } from "../../_core/utilities/svg-icons";
import purchase_order_api from "./api/purchase_order_api";
// import { createHashHistory as history } from "history";
import { decodeError } from "../../_core/utilities/exception-handler";
import { useNavigate } from "react-router-dom";

const PurchaseOrderForm = (props) => {
  let navigate = useNavigate();
  const [localData, setLocalData] = useState(props.data);
  const [status, setStatus] = useState("")
  const [error, setError] = useState()

  useEffect(() => {
    setLocalData(prev => ({ ...prev, created_date: formatDate(props.data.created_date), delivery_date: formatDate(props.data.delivery_date) }))
  }, [props.data])

  const save = async () => {
    try {
      setStatus("waiting")
      if (typeof props.data.id === 'undefined') {
        let res = await purchase_order_api.create(localData)
        setStatus("success")
        navigate(`/purchaseOrders/${res.data.data.id}`);
      } else {
        let res = await purchase_order_api.update(props.data.id, localData)
        setStatus("success")
        setTimeout(() => props.callback(DialogBoxConstants.Result.Ok, res.data.data), 1000)
      }
    } catch (err) {
      setError(JSON.parse(decodeError(err).message))
      setStatus("error")
    }
  }

  return (
    <div className={" bg-white " + props.className}>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 py-2">
        Purchase Order
      </div>
      <div className="px-2 grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-2">
        <div className="font-inter 2xl:col-span-2">
          <label className="block text-xs">PO No</label>
          <input id="supplier" type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={localData.po_no ?? props.data?.po_no} disabled />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Created Date</label>
          <input id="created_date" type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={formatDate(localData.created_date ?? props.data?.created_date)} disabled />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Delivery Date</label>
          <input id="delivery_date" type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={(localData.delivery_date ?? (props.data?.delivery_date))} onChange={e => setLocalData(prev => ({ ...prev, [e.target.id]: e.target.value }))} onBlur={e => setLocalData(prev => ({ ...prev, [e.target.id]: formatDate(e.target.value) }))} />
        </div>
        <div className="font-inter">
          <label className="block text-xs">Status</label>
          <input type="text" className="w-full text-sm px-1 border rounded h-7 mt-1" value={localData.status ?? props.data?.status} disabled />
        </div>
      </div>
      <div className={"bg-ss-100 flex items-center w-full py-2 mt-6 " + (status === "error" ? "justify-between" : "justify-end")}>
        {
          (status === "error") &&
          <span className="flex items-center text-red-500 text-xs px-2">
            {
              Object.values(error)
            }
          </span>
        }
        <Button
          text={
            status === "waiting" ? "Saving..."
              : status === "success" ? "Saved"
                : "Save"
          }
          disabled={["waiting", "success"].includes(status) ? true : false}
          callback={() => save()}
          icon={{ component: (status === "success" ? <IconTickInCircle /> : <IconSave />), width: 13 }}
        />
      </div>
      {/* <pre>
        {
          JSON.stringify(localData, null, 2)
        }
      </pre> */}
    </div>
  )
}

export default PurchaseOrderForm;