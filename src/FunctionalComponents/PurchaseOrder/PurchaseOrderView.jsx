import PurchaseOrderForm from "./PurchaseOrderForm";
import { IconEdit, IconPlus, IconTrash } from "../../_core/utilities/svg-icons"
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { useContext } from "react";
import { DialogBoxContext } from "../../_core/providers/DialogBoxContext";
import { DialogBoxConstants } from "../../_core/components/DialogBox/DialogBoxPlaceholder";
// import { ToastContext } from "../../_core/providers/ToastContext";
import { SectionCommandBar } from "../../_core/components"
import purchase_order_api from "./api/purchase_order_api";
import { formatDate } from "../../_core/utilities/date-formatting";

const PurchaseOrderView = (props) => {
  const globalState = useContext(GlobalStateContext)
  let DialogBox = useContext(DialogBoxContext);
  // let Toast = useContext(ToastContext)

  const cmdEdit_callback = async (result, data) => {
    if (result === DialogBoxConstants.Result.Ok) {
      globalState.write(props.name, data)
      // Toast.show(<span>Updated</span>, Toast.Constants.Type.Success, Toast.Constants.ModeOfClose.Auto)
    }
  }

  const prepareEdit = () => {
    globalState.write("activeDataSource", "PurchaseOrder")
    let params = {
      data: {...globalState.read(props.name)},
      selectedLines: "line_selections"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<PurchaseOrderForm />, window_size, params, cmdEdit_callback);
  }

  const cmdCreate_callback = async (result, data) => {
    if (result === DialogBoxConstants.Result.Ok) {
      // globalState.write(props.name, data)
      // Toast.show(<span>Updated</span>, Toast.Constants.Type.Success, Toast.Constants.ModeOfClose.Auto)
    }
  }

  const prepareCreate = async () => {
    globalState.write("activeDataSource", "PurchaseOrder")
    let res = await purchase_order_api.prepareCreate();
    let params = {
      data: {...res.data.data}
    };
    console.log(params);
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-3/6";
    DialogBox.showModal(<PurchaseOrderForm />, window_size, params, cmdCreate_callback);
  }

  const prepareDelete = () => {
  }

  let sectionCommandBarButtons = [
    {
      caption: "Edit",
      callback: prepareEdit,
      icon: <IconEdit />,
      disabled: !globalState.read(props.name)
    },
    {
      caption: "New",
      callback: prepareCreate,
      icon: <IconPlus />,
      disabled: false
    },
    {
      caption: "Delete",
      callback: prepareDelete,
      icon: <IconTrash />,
      disabled: false
    }
  ]
  
  return (
    <>
      <SectionCommandBar
        section={props.name}
        buttons={sectionCommandBarButtons}
      />
      <div className={props.className}>
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
          <div className="font-inter 2xl:col-span-2">
            <label className="block text-xs">PO No</label>
            <input type="text" className="h-7 w-full text-sm" value={props.data?.po_no || ''} readOnly />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Created Date</label>
            <input type="text" className="h-7 w-full text-sm" value={formatDate(props.data?.created_date) || ''} readOnly />
          </div>
          <div className="font-inter">
            <label className="block text-xs">Delivery Date</label>
            <input type="text" className="h-7 w-full text-sm" value={formatDate(props.data?.delivery_date) || ''} readOnly />
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