import { useContext, useEffect } from "react";
import { StandardTable } from "react-erp-table";
import GlobalStateContext from "../../_core/providers/GlobalStateContext";
import { commandBarActionHandler, commandBarInquireHandler, lineMenuActionHandler, lineMenuInquireHandler, sideBarActionHandler, sideBarInquireHandler, doSearch, doDetailSearch } from "./PurchaseOrderChargeAction";
import { commandBarButtons, sideBarButtons, lineMenus, tableConfig, tableStyle } from "./PurchaseOrderChargeConfig"
import EventBus from "../../_core/utilities/event-bus"

const PurchaseOrderCharge = (props) => {
  let globalState = useContext(GlobalStateContext)
  let {
    parent_id: props_parent_id,
    active: props_active,
    disabled: props_disabled,
    refreshData: props_refreshData
  } = props;

  useEffect(() => {
    EventBus.on("headerLoadingDone", (id) => {
      props_active && props_refreshData(id);
    }
    );

    return () => {
      EventBus.remove("headerLoadingDone");
    }
  }, [])

  // useEffect(() => {
  //   props_active && !props_disabled && props_refreshData();
  // }, [props_parent_id, props_active, props_disabled, props_refreshData])

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