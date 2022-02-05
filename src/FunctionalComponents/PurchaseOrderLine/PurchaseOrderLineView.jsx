import { useContext, useEffect, useState } from "react";
import { DialogBoxContext } from "../../_core/providers/DialogBoxContext";
import { StandardTable } from "react-erp-table";
import { columns, commandBarButtons, sideBarButtons, lineMenus, tableConfig, tableStyle } from "./PurchaseOrderLineConfig"
import PurchaseOrderLineForm from "./PurchaseOrderLineForm";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { DialogBoxConstants } from "../../_core/components/DialogBox"
import purchase_order_line_api from "./purchase_order_line_api";
import { decodeError } from "../../_core/utilities/exception-handler";

const PurchaseOrderLineView = (props) => {
  let DialogBox = useContext(DialogBoxContext);
  let globalState = useContext(GlobalStateContext)
  const [apiErrors, setApiErrors] = useState({})
  let {
    parentId: props_parentId,
    active: props_active,
    disabled: props_disabled,
    refreshData: props_refreshData,
    headerPopulated: props_headerPopulated
  } = props;

  useEffect(() => {
    props_active && !props_disabled && props_headerPopulated && props_refreshData();
  }, [props_parentId, props_active, props_disabled, props_headerPopulated])

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

  const commandBarInquireHandler = (data, setData, selectedLines, action) => {
    if (props.disabled) {
      return false;
    } else {
      if (selectedLines.length > 0) {
        switch (action) {
          case "cmdRelease":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Open")
            }, true);

          case "cmdCreateInvoice":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Released")
            }, true);

          case "cmdSendToIfs":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
              return acc && (curr.status === "Closed")
            }, true);

          case "cmdSendToProm":
            return data.filter(line => selectedLines.includes(line.id)).reduce((acc, curr) => {
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

  const commandBarActionHandler = (data, setData, selectedLines, action) => {
    alert(selectedLines, action)
  }

  const sideBarInquireHandler = (data, setData, selectedLines, action) => {
    if (props.disabled) {
      return false;
    } else {
      switch (action) {
        case "cmdNewRecord":
          return true;

        case "cmdDuplicateSelected":
          return (selectedLines.length === 1 ? true : false);

        case "cmdEditSelected":
          return (selectedLines.length === 1 ? true : false);

        case "cmdDeleteSelected":
          return (selectedLines.length > 0 ? true : false);

        default:
          return false;
      }
    }
  }

  const doSearch = (token) => {
    alert("please write search logic");
  }

  const doDetailSearch = (tokens) => {
    alert("please write detail search logic");
  }

  const prepareCreate = async (seq, positioning) => {
    let params = {
      parent_id: globalState.read(props.parent).id,
      current_sequence: seq,
      positioning: positioning,
      mode: "new",
      refreshData: async () => props.refreshData(props.name)
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<PurchaseOrderLineForm />, window_size, params, cmdNewRecord_callback);
  }

  const cmdNewRecord_callback = async (result, data) => {
    return null;
  }

  const prepareEdit = async (data) => {
    let params = {
      data: data,
      mode: "edit",
      refreshData: async () => props.refreshData(props.name)
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<PurchaseOrderLineForm />, window_size, params, cmdEditRecord_callback);
  }

  const cmdEditRecord_callback = async (result, data) => {
    return null;
  }

  const lineMenuInsert = async ([id], positioning) => {
    let curr_seq = [...globalState.read("PurchaseOrderLine")]?.filter(item => item.id === id).map(item => item._seq_)[0];
    await prepareCreate(curr_seq, positioning);
  }

  const cmdDuplicateRecord_callback = async (result, data) => {
  }

  const cmdDuplicateSelected_Clicked = (data, positioning) => {
    let params = {
      data: data,
      current_sequence: data._seq_,
      positioning: positioning,
      mode: "duplicate",
      refreshData: async () => props.refreshData(props.name)
    };
    let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";
    DialogBox.showModal(<PurchaseOrderLineForm />, window_size, params, cmdDuplicateRecord_callback);
  }

  const cmdDeleteSelected_Clicked = async (data, setData, selectedLines, setSelectedLines) => {
    let ret = window.confirm('Are you sure you want to delete the selected lines?');
    let availableRecs = [...globalState.read(props.name)];
    if (ret) {
      try {
        [...selectedLines].forEach(async (id) => {
          await purchase_order_line_api.delete(id);
          availableRecs = availableRecs.filter(item => item.id !== id)
          globalState.write(props.name, availableRecs)
          setSelectedLines(prev => prev.filter(item => item !== id))
        })
      } catch (err) {
        setApiErrors(JSON.parse(decodeError(err)))
      }
    }
  }

  const sideBarActionHandler = async (data, setData, selectedLines, setSelectedLines, action) => {
    switch (action) {
      case "cmdNewRecord":
        let max_seq = 0;
        if (globalState.read("PurchaseOrderLine").length > 0) {
          max_seq = Math.max(...globalState.read("PurchaseOrderLine").map(item => item._seq_));
        }
        await prepareCreate(max_seq, "bottom");
        break;
      case "cmdEditSelected":
        await prepareEdit(data.filter(item => item.id === selectedLines[0])[0]);
        break;
      case "cmdDuplicateSelected":
        cmdDuplicateSelected_Clicked(data.filter(item => item.id === selectedLines[0])[0], "below");
        break;
      case "cmdDeleteSelected":
        await cmdDeleteSelected_Clicked(data, setData, selectedLines, setSelectedLines);
        break;
      default:
        break;
    }
  }
  return (
    <StandardTable
      configuration={tableConfig}                         // configuration: table and column configuration details      
      style={tableStyle}                                  // style: table styling details      
      theme={props.theme}                                 // theme: specifies which theme to be applied
      data={globalState.read("PurchaseOrderLine")}        // data: data      
      dataSource={props.name}                             // dataSource: data source in which the table has been attached to
      loadingSource={globalState.loadingSource}           // loadingDataSource: current loading data source
      refreshData={props.refreshData}                     // refreshData: callback to refresh data

      lineMenu={lineMenus}                                // lineMenu: line menu configurations      
      lineMenuInquireHandler={lineMenuInquireHandler}     // lineMenuInquireHandler: line menu inquire handler callback      
      lineMenuActionHandler={lineMenuActionHandler}       // lineMenuActionHandler: line menu action handler callback      

      commandBarButtons={commandBarButtons}               // commandBarButtons: command bar configuration      
      commandBarInquireHandler={commandBarInquireHandler} // commandBarInquireHandler: command bar inquire callback      
      commandBarActionHandler={commandBarActionHandler}   // commandBarActionHandler: command bar action handler callback      

      sideBarButtons={sideBarButtons}                     // sideBarButtons: side bar configuration      
      sideBarInquireHandler={sideBarInquireHandler}       // sideBarInquireHandler: side bar inquire callback      
      sideBarActionHandler={sideBarActionHandler}         // sideBarActionHandler: side bar action handler callback      

      containerRef={props.containerRef}                   // containerRef: used in column resizing when table is resized
      doSearch={doSearch}                                 // doSearch:			            search callback      
      doDetailSearch={doDetailSearch}                     // doDetailSearch:			      detail search callback
      disabled={props.disabled}                           // disabled: disables all button actions
    />
  )
}

export default PurchaseOrderLineView;