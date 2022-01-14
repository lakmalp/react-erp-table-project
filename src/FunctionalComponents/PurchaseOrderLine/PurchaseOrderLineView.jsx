import { useContext, useEffect } from "react";
import { DialogBoxContext } from "../../_core/providers/DialogBoxContext";
import { StandardTable } from "../../_core/components/Table/index"
import { columns, commandBarButtons, sideBarButtons, lineMenus, tableConfig, tableStyle } from "./PurchaseOrderLineConfig"
import PurchaseOrderLineForm from "./PurchaseOrderLineForm";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";

const PurchaseOrderLineView = (props) => {
  let DialogBox = useContext(DialogBoxContext);
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    props.active && !globalState.read(props.name) && props.refreshData()
  }, [props.active])

  const lineMenuActionHandler = (action, ...params) => {
    switch (action) {
      case "menuOpenLineDetail":
        alert(params);
        break;

      default:
        break;
    }
  }

  const lineMenuInquireHandler = (action, id) => {
    switch (action) {
      case "menuOpenLineDetail":
        return true;

      default:
        return false;
    }
  }

  const commandBarInquireHandler = (data, setData, line_selections, action) => {
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

  const commandBarActionHandler = (data, setData, line_selections, action) => {
    alert(line_selections, action)
  }

  const sideBarInquireHandler = (data, setData, line_selections, action) => {
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

  const doSearch = (searchParams) => {
    alert("please write search logic");
  }

  const cmdNewRecord_callback = (result, data) => {
    alert(data);
  }

  const cmdDuplicateSelected_Clicked = () => { }
  
  const cmdDeleteSelected_Clicked = () => { }

  const sideBarActionHandler = (data, setData, line_selections, action) => {
    switch (action) {
      case "cmdNewRecord":
        let params = {
          data: data,
          selectedLines: line_selections
        };
        let window_size = "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6";        
        DialogBox.showModal(<PurchaseOrderLineForm />, window_size, params, cmdNewRecord_callback);
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
      data={props.data}
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
      />
  )
}

export default PurchaseOrderLineView;