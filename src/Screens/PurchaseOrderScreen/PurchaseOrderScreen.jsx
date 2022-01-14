import React, { useContext, useEffect, useRef } from 'react';
import PoJournalView from '../../FunctionalComponents/PoJournal';
import PurchaseOrderChargeView from '../../FunctionalComponents/PurchaseOrderCharge';
import PurchaseOrderLineView from '../../FunctionalComponents/PurchaseOrderLine';
import { TabContainer, Tab, TabPane } from "../../_core/components/Tabber"
import { useSearchParams } from 'react-router-dom';
import PurchaseOrderView from '../../FunctionalComponents/PurchaseOrder/PurchaseOrderView';
import ScreenSection from '../../_core/components/ScreenSection';
import GlobalStateContext from '../../_core/providers/GlobalStateContext';
import { purchase_order_api, purchase_order_line_api, purchase_order_charge_api } from '../../_core/api';

const PurchaseOrderScreen = (props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const theme = useRef("blue").current;
  const containerRef = useRef();
  let id = searchParams.get("id")
  let globalState = useContext(GlobalStateContext)

  useEffect(() => {
    refreshData("PurchaseOrder");
  }, [])

  const refreshData = async (dataSource) => {
    globalState.setLoadingSource(dataSource)
    let data = '';
    let _res = '';
    switch (dataSource) {
      case "PurchaseOrder":
        try {
          _res = await purchase_order_api.get(id);
          data = _res.data;
        } catch (err) {
          console.log(err.message)
        }
        break;

      case "PurchaseOrderLine":
        try {
          _res = await purchase_order_line_api.index(id, 0, 0);
          console.log(_res.data)
          data = _res.data;
        } catch (err) {
          console.log(err.message)
        }
        break;

      case "PurchaseOrderCharge":
        try {
          _res = await purchase_order_charge_api.index(id, 0, 0);
          console.log(_res.data)
          data = _res.data;
        } catch (err) {
          console.log(err.message)
        }
        break;

      default:
        break;
    }

    setTimeout(() => {
      globalState.write(
        dataSource,
        data
      )
      globalState.setLoadingSource("")
    }, 2000);
  }

  return (
    <div className=" w-full" ref={containerRef}>
      <div className="font-montserrat text-md font-semibold text-ss-900 px-2 my-2">
        Purchase Order # {id}
      </div>
      <ScreenSection name="Header">
        <PurchaseOrderView
          name="PurchaseOrder"
          containerRef={containerRef}
          data={globalState.read("PurchaseOrder")}
          refreshData={() => refreshData("PurchaseOrder")}
          className="mt-4 mb-8 px-2"
          theme={theme}
        />
      </ScreenSection>
      <ScreenSection className="px-2" name="PODetails">
        <TabContainer>
          <Tab target="tabPurchaseOrderLine" label="PO Lines" active />
          <Tab target="tabPurchaseOrderCharge" label="Charges" />
          <Tab target="tabPoAddressInfo" label="Addres Info" disabled />
          <Tab target="tabPoJournal" label="PO Journal" />
          <Tab target="tabTab1" label="Another Tab 1" />
          <Tab target="tabTab2" label="Another Tab With Long Name" />
          <Tab target="tabTab3" label="Another Tab 3" />
          <Tab target="tabTab4" label="Let's Make It Little Bigger" />
          <Tab target="tabTab5" label="Another Tab 5" />
          <Tab target="tabTab6" label="Another Tab 6" />

          <TabPane name="tabPurchaseOrderLine" >
            <PurchaseOrderLineView
              name="PurchaseOrderLine"
              containerRef={containerRef}
              data={globalState.read("PurchaseOrderLine")}
              refreshData={() => refreshData("PurchaseOrderLine")}
              theme={theme}
            />
          </TabPane>
          <TabPane name="tabPurchaseOrderCharge">
            <PurchaseOrderChargeView
              name="PurchaseOrderCharge"
              containerRef={containerRef}
              data={globalState.read("PurchaseOrderCharge")}
              refreshData={() => refreshData("PurchaseOrderCharge")}
              theme={theme}
            />
          </TabPane>
          <TabPane name="tabPoJournal">
            <PoJournalView
              name="PoJournal"
              containerRef={containerRef}
              data={globalState.read("PoJournal")}
              refreshData={() => refreshData("PoJournal")}
              theme={theme}
            />
          </TabPane>
        </TabContainer>
        {/* <pre>
          {
            JSON.stringify(globalState.loadingSource)
          }
        </pre> */}
      </ScreenSection>
    </div>
  )
}

export default PurchaseOrderScreen;
