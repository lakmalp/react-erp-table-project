import React, { useContext, useRef, useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
// import PoJournalView from '../../FunctionalComponents/PoJournal';
// import PurchaseOrderChargeView from '../../FunctionalComponents/PurchaseOrderCharge';
import PurchaseOrderLineView from '../../FunctionalComponents/PurchaseOrderLine';
import { TabContainer, Tab, TabPane } from "../../_core/components/Tabber"
// import { useSearchParams } from 'react-router-dom';
import PurchaseOrderView from '../../FunctionalComponents/PurchaseOrder/PurchaseOrderView';
import ScreenSection from '../../_core/components/ScreenSection';
import GlobalStateContext from '../../_core/providers/GlobalStateContext';
import purchase_order_api from '../../FunctionalComponents/PurchaseOrder/api/purchase_order_api';
import purchase_order_line_api from '../../FunctionalComponents/PurchaseOrderLine/purchase_order_line_api';
import EventBus from "../../_core/utilities/event-bus"

const PurchaseOrderScreen = (props) => {
  let id = useParams().id;
  const theme = useRef("blue").current;
  const containerRef = useRef();
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    EventBus.on("loadHeader", () => {
      refreshData("PurchaseOrder");
    }
    );

    return () => {
      EventBus.remove("loadHeader");
    }
  }, [])

  const refreshData = async (dataSource, parent_id) => {
    globalState.setLoadingSource(dataSource)
    let data = '';
    let _res = '';
    switch (dataSource) {
      case "PurchaseOrder":
        try {
          EventBus.dispatch("headerLoading", "");
          EventBus.dispatch("loadingStarted", dataSource);
          globalState.write(dataSource, {});
          _res = await purchase_order_api.get(id);
          data = _res.data.data;
          globalState.write(dataSource, data);
          globalState.setLoadingSource("");
          EventBus.dispatch("headerLoadingDone", id);
          EventBus.dispatch("loadingFinished");
        } catch (err) {
          console.log(err.message)
          EventBus.dispatch("headerLoadingError", "");
        }
        break;

      case "PurchaseOrderLine":
        try {
          EventBus.dispatch("loadingStarted", dataSource);
          _res = await purchase_order_line_api.getPOLines(parent_id, 0, 0);
          data = _res.data.data;
          globalState.write(dataSource, data);
          globalState.setLoadingSource("");
          EventBus.dispatch("loadingFinished");
        } catch (err) {
          console.log(err.message)
        }
        break;

      case "PurchaseOrderCharge":
        try {
          // _res = await purchase_order_charge_api.index(id, 0, 0);
          // data = _res.data.data;
          // globalState.write(dataSource, data);
          globalState.setLoadingSource("");
        } catch (err) {
          console.log(err.message)
        }
        break;

      default:
        break;
    }
  }

  return (
    <div className=" w-full" ref={containerRef}>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 my-2">
        {`Purchase Order ` + (globalState.loadingSource === "PurchaseOrder" ? "" : `# ${id}`)}
      </div>
      <ScreenSection name="Header">
        <PurchaseOrderView
          parent=""
          parentId={id}
          name="PurchaseOrder"
          containerRef={containerRef}
          data={globalState.read("PurchaseOrder")}
          refreshData={async (id) => refreshData("PurchaseOrder", id)}
          className="mt-4 mb-8 px-2"
          theme={theme}
          disabled={globalState.headerIsLoading}
        />
      </ScreenSection>
      <ScreenSection className="px-2" name="PODetails">
        <TabContainer>
          <Tab target="tabPurchaseOrderLine" label="PO Lines" active />
          {/* <Tab target="tabPurchaseOrderCharge" label="Charges" />
          <Tab target="tabPoAddressInfo" label="Addres Info" disabled />
          <Tab target="tabPoJournal" label="PO Journal" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab1" label="Another Tab 1" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab2" label="Another Tab With Long Name" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab3" label="Another Tab 3" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab4" label="Let's Make It Little Bigger" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab5" label="Another Tab 5" disabled={globalState.headerIsLoading} />
          <Tab target="tabTab6" label="Another Tab 6" disabled={globalState.headerIsLoading} /> */}

          <TabPane name="tabPurchaseOrderLine" >
            <PurchaseOrderLineView
              parent="PurchaseOrder"
              parentId={id}
              name="PurchaseOrderLine"
              containerRef={containerRef}
              refreshData={async (id) => refreshData("PurchaseOrderLine",id)}
              theme={theme}
              disabled={globalState.headerIsLoading}
            />
          </TabPane>
          {/* <TabPane name="tabPurchaseOrderCharge">
            <PurchaseOrderChargeView
              parent="PurchaseOrder"
              parentId={id}
              name="PurchaseOrderCharge"
              containerRef={containerRef}
              refreshData={async (id) => refreshData("PurchaseOrderCharge", id)}
              theme={theme}
              disabled={globalState.headerIsLoading}
            />
          </TabPane>
          <TabPane name="tabPoJournal">
            <PoJournalView
              parent="PurchaseOrder"
              parentId={id}
              name="PoJournal"
              containerRef={containerRef}
              refreshData={async (id) => refreshData("PoJournal", id)}
              theme={theme}
              disabled={globalState.headerIsLoading}
            />
          </TabPane> */}
        </TabContainer>
      </ScreenSection>
    </div>
  )
}

export default PurchaseOrderScreen;
