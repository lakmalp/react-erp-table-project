import { useContext, useEffect } from "react";
import { StandardTable } from "react-erp-table";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { commandBarActionHandler, commandBarInquireHandler, lineMenuActionHandler, lineMenuInquireHandler, sideBarActionHandler, sideBarInquireHandler, doSearch, doDetailSearch } from "./PurchaseOrderChargeAction";
import { commandBarButtons, sideBarButtons, lineMenus, tableConfig, tableStyle } from "./PurchaseOrderChargeConfig"

const PurchaseOrderCharge = (props) => {
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    props.active && !props.disabled && props.refreshData()
  }, [props.active, props.disabled])

  return (
    <StandardTable
      configuration={tableConfig}
      style={tableStyle}
      theme={props.theme}
      data={props.data}
      dataSource={props.name}
      loadingSource={globalState.loadingSource}
      refreshData={props.refreshData}
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
      doSearch={doSearch}
      doDetailSearch={doDetailSearch}
      disabled={props.disabled}
    />
  )
}

export default PurchaseOrderCharge;