import { useContext, useEffect } from "react";
import { DialogBoxContext } from "../../_core/providers/DialogBoxContext";
import { StandardTable } from "react-erp-table";
import { columns, commandBarButtons, sideBarButtons, lineMenus, tableConfig, tableStyle } from "./PurchaseOrderLineConfig"
import PurchaseOrderLineForm from "./PurchaseOrderLineForm";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import {DialogBoxConstants} from "../../_core/components/DialogBox"

const PurchaseOrderLineView = (props) => {
  let DialogBox = useContext(DialogBoxContext);
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    props.active && !props.disabled && props.refreshData()
  }, [props.active, props.disabled])

  const lineMenuActionHandler = (action, params) => {
    switch (action) {
      case "menuInsertAbove":
        lineMenuInsert(params, "above");
        break;
      case "menuInsertBelow":
        lineMenuInsert(params, "below");
        break;
      case "menuOpenLineDetail":
        alert(params);
        break;

      default:
        break;
    }
  }

  const lineMenuInquireHandler = (action, id) => {
    switch (action) {
      case "menuInsertAbove":
        return true;
      case "menuInsertBelow":
        return true;
      case "menuOpenLineDetail":
        return true;

      default:
        return false;
    }
  }

  const commandBarInquireHandler = (data, setData, line_selections, action) => {
    if (props.disabled) {
      return false;
    } else {
      // line_selections = [id1, id2, ...]
      if (line_selections.length > 0) {
        switch (action) {
          case "cmdRelease":
            return data.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Open")
            }, true);

          case "cmdCreateInvoice":
            return data.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Released")
            }, true);

          case "cmdSendToIfs":
            return data.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Closed")
            }, true);

          case "cmdSendToProm":
            return data.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
              return acc && (["Released", "Closed"].includes(curr.status))
            }, true);

          default:
            return false;
        }
      } else {
        return false;
      }
    }
  }

  const commandBarActionHandler = (data, setData, line_selections, action) => {
    alert(line_selections, action)
  }

  const sideBarInquireHandler = (data, setData, line_selections, action) => {
    if (props.disabled) {
      return false;
    } else {
      switch (action) {
        case "cmdNewRecord":
          return true;

        case "cmdDuplicateSelected":
          return (line_selections.length === 1 ? true : false);

        case "cmdEditSelected":
          return (line_selections.length === 1 ? true : false);

        case "cmdDeleteSelected":
          return (line_selections.length > 0 ? true : false);

        default:
          return false;
      }
    }
  }

  const doSearch = (searchParams) => {
    alert("please write search logic");
  }

  const prepareCreate = async (seq, positioning) => {
    let params = {
      parent_id: globalState.read(props.parent).id,
      current_sequence: seq,
      positioning: positioning,
      mode: "new"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<PurchaseOrderLineForm />, window_size, params, cmdNewRecord_callback);
  }

  const prepareEdit = async (data) => {
    let params = {
      data: data,
      mode: "edit"
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<PurchaseOrderLineForm />, window_size, params, cmdEditRecord_callback);
  }

  const lineMenuInsert = async ([id], positioning) => {
    let curr_seq = [...globalState.read("PurchaseOrderLine")]?.filter(item => item.id === id).map(item => item._seq_)[0];
    await prepareCreate(curr_seq, positioning);
  }

  const cmdNewRecord_callback = async (result, data) => {
    if (result === DialogBoxConstants.Result.Ok) {
      props.refreshData(props.name)
    }
  }

  const cmdEditRecord_callback = async (result, data) => {

  }

  const cmdDuplicateSelected_Clicked = () => { }

  const cmdDeleteSelected_Clicked = () => { }

  const sideBarActionHandler = async (data, setData, line_selections, action) => {
    switch (action) {
      case "cmdNewRecord":
        let max_seq = 0;
        if (globalState.read("PurchaseOrderLine").length > 0) {
          max_seq = Math.max(...globalState.read("PurchaseOrderLine").map(item => item._seq_));
        }
        await prepareCreate(max_seq, "bottom");
        break;
      case "cmdEditSelected":
        await prepareEdit(data);
        break;
      case "cmdDuplicateSelected":
        cmdDuplicateSelected_Clicked(data, setData, line_selections);
        break;
      case "cmdDeleteSelected":
        cmdDeleteSelected_Clicked(data, setData, line_selections);
        break;
      default:
        break;
    }
  }
  return (
    <StandardTable
      conf={tableConfig}
      style={tableStyle}
      theme={props.theme}
      data={globalState.read("PurchaseOrderLine")}
      dataSource={props.name}
      loadingSource={globalState.loadingSource}
      refreshData={props.refreshData}
      columns={columns}
      lineMenu={lineMenus}
      lineMenuInquireHandler={lineMenuInquireHandler}
      lineMenuActionHandler={lineMenuActionHandler}
      commandBarButtons={commandBarButtons}
      commandBarInquireHandler={commandBarInquireHandler}
      commandBarActionHandler={commandBarActionHandler}
      sideBarButtons={sideBarButtons}
      sideBarInquireHandler={sideBarInquireHandler}
      sideBarActionHandler={sideBarActionHandler}
      containerRef={props.containerRef}
      search={doSearch}
      buttonEnablers={[props.disabled]}
    />
  )
}

export default PurchaseOrderLineView;