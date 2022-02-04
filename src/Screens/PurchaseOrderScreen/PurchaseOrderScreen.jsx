import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import PoJournalView from '../../FunctionalComponents/PoJournal';
import PurchaseOrderChargeView from '../../FunctionalComponents/PurchaseOrderCharge';
import PurchaseOrderLineView from '../../FunctionalComponents/PurchaseOrderLine';
import { TabContainer, Tab, TabPane } from "../../_core/components/Tabber"
import { useSearchParams } from 'react-router-dom';
import PurchaseOrderView from '../../FunctionalComponents/PurchaseOrder/PurchaseOrderView';
import ScreenSection from '../../_core/components/ScreenSection';
import GlobalStateContext from '../../_core/providers/GlobalStateContext';
import purchase_order_api from '../../FunctionalComponents/PurchaseOrder/api/purchase_order_api';
import purchase_order_line_api from '../../FunctionalComponents/PurchaseOrderLine/purchase_order_line_api';

const PurchaseOrderScreen = (props) => {
  let id = useParams().id;
  let [headerLoading, setHeaderLoading] = useState(true);
  const theme = useRef("blue").current;
  const containerRef = useRef();
  // let id = searchParams.get("id")
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    refreshData("PurchaseOrder");
  }, [id])

  useEffect(() => {
    if (globalState.read("PurchaseOrder")) {
      setHeaderLoading(false)
    } else {
      setHeaderLoading(true)
    }
  }, [globalState])

  const refreshData = async (dataSource) => {
    console.log(`Refreshing: ${dataSource}`)
    globalState.setLoadingSource(dataSource)
    let data = '';
    let _res = '';
    switch (dataSource) {
      case "PurchaseOrder":
        try {
          _res = await purchase_order_api.get(id);
          data = _res.data.data;
          globalState.write(dataSource, data);
          globalState.setLoadingSource("");
        } catch (err) {
          console.log(err.message)
        }
        break;

      case "PurchaseOrderLine":
        try {
          _res = await purchase_order_line_api.getPOLines(id, 0, 0);
          data = _res.data.data;
          globalState.write(dataSource, data);
          globalState.setLoadingSource("");
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
        Purchase Order # {id}
      </div>
      <ScreenSection name="Header">
        <PurchaseOrderView
          parent=""
          name="PurchaseOrder"
          containerRef={containerRef}
          data={globalState.read("PurchaseOrder")}
          refreshData={() => refreshData("PurchaseOrder")}
          className="mt-4 mb-8 px-2"
          theme={theme}
          disabled={headerLoading}
          isHeaderLoading={headerLoading}
        />
      </ScreenSection>
      <ScreenSection className="px-2" name="PODetails">
        <TabContainer>
          <Tab target="tabPurchaseOrderLine" label="PO Lines" active />
          <Tab target="tabPurchaseOrderCharge" label="Charges" />
          <Tab target="tabPoAddressInfo" label="Addres Info" disabled />
          <Tab target="tabPoJournal" label="PO Journal" disabled={headerLoading} />
          <Tab target="tabTab1" label="Another Tab 1" disabled={headerLoading} />
          <Tab target="tabTab2" label="Another Tab With Long Name" disabled={headerLoading} />
          <Tab target="tabTab3" label="Another Tab 3" disabled={headerLoading} />
          <Tab target="tabTab4" label="Let's Make It Little Bigger" disabled={headerLoading} />
          <Tab target="tabTab5" label="Another Tab 5" disabled={headerLoading} />
          <Tab target="tabTab6" label="Another Tab 6" disabled={headerLoading} />

          <TabPane name="tabPurchaseOrderLine" >
            <PurchaseOrderLineView
              parent="PurchaseOrder"
              name="PurchaseOrderLine"
              containerRef={containerRef}
              refreshData={async () => refreshData("PurchaseOrderLine")}
              theme={theme}
              disabled={headerLoading}
              isHeaderLoading={headerLoading}
            />
          </TabPane>
          <TabPane name="tabPurchaseOrderCharge">
            <PurchaseOrderChargeView
              parent="PurchaseOrder"
              name="PurchaseOrderCharge"
              containerRef={containerRef}
              refreshData={() => refreshData("PurchaseOrderCharge")}
              theme={theme}
              disabled={headerLoading}
              isHeaderLoading={headerLoading}
            />
          </TabPane>
          <TabPane name="tabPoJournal">
            <PoJournalView
              parent="PurchaseOrder"
              name="PoJournal"
              containerRef={containerRef}
              refreshData={() => refreshData("PoJournal")}
              theme={theme}
              disabled={headerLoading}
              isHeaderLoading={headerLoading}
            />
          </TabPane>
        </TabContainer>
      </ScreenSection>
    </div>
  )
}

export default PurchaseOrderScreen;
