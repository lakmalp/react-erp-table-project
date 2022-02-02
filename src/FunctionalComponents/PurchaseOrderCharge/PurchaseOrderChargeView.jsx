import { useContext, useEffect } from "react";
import { StandardTable } from "react-erp-table";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { startup, commandBarActionHandler, commandBarInquireHandler, lineMenuActionHandler, lineMenuInquireHandler, sideBarActionHandler, sideBarInquireHandler, doSearch } from "./PurchaseOrderChargeAction";
import { columns, commandBarButtons, sideBarButtons, lineMenus, tableConfig, tableStyle } from "./PurchaseOrderChargeConfig"

const PurchaseOrderCharge = (props) => {
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    props.active && !props.disabled && props.refreshData()
  }, [props.active, props.disabled])

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
      buttonEnablers={[props.disabled]}
    />
  )
}

export default PurchaseOrderCharge;