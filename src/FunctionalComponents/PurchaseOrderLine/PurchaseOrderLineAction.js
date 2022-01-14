
const emptyObject = {
  id: "",
  _seq_: "",
  part_code: "",
  part_desc: "",
  po_no: "",
  supplier: {
    id: "",
    code: "",
    description: ""
  },
  status: "",
  tax: 0,
  amount: 0,
}

const data = [
  {
    id: 1,
    _seq_: 1,
    part_code: "AXT012",
    part_desc: "MasterPact MTZ (Schneider Electric, France)",
    po_no: "P7364",
    supplier: {
      id: 12,
      code: "S65",
      description: "Associated Motorways (Pvt) Ltd"
    },
    status: "Open",
    tax: 10,
    amount: 120000,
  },
  {
    id: 2,
    _seq_: 2,
    part_code: "P508",
    part_desc: "Strawberry Cordial (MD, Local)",
    po_no: "P1260",
    supplier: {
      id: 12,
      code: "S65",
      description: "Associated Motorways (Pvt) Ltd"
    },
    status: "Closed",
    tax: 45,
    amount: 55868,
  },
  {
    id: 3,
    _seq_: 3,
    part_code: "P509",
    part_desc: "Raspberry Nectar (Euro Beverages, Denmark)",
    po_no: "P94587",
    supplier: {
      id: 12,
      code: "S23",
      description: "Maliban Biscuits (Pvt) Ltd"
    },
    status: "Closed",
    tax: 13,
    amount: 789856,
  }
]

export const startup = (setData) => {
  setTimeout(() => setData(data), 2000);
}

export const lineMenuActionHandler = (action, ...params) => {
  switch (action) {
    case "menuOpenLineDetail":
      alert(params);
      break;

    default:
      break;
  }
}

export const lineMenuInquireHandler = (action, id) => {
  switch (action) {
    case "menuOpenLineDetail":
      return true;

    default:
      return false;
  }
}

export const commandBarInquireHandler = (data, setData, line_selections, action) => {
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

export const commandBarActionHandler = (data, setData, line_selections, action) => {
  alert(line_selections, action)
}

export const sideBarInquireHandler = (data, setData, line_selections, action) => {
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

export const sideBarActionHandler = (data, setData, line_selections, action) => {
  // switch (action) {
  //   case "cmdNewRecord":
  //     let dlgPurchaseOrder = createDialogBox(PurchaseOrderLineForm);
  //     let params = {
  //       data: data,
  //       setData: setData,
  //       selectedLines: line_selections
  //     };
  //     let _ret = await dlgPurchaseOrder.showModal(params);
      
  //     EventBus.dispatch(
  //       "ShowModalDialog",
  //       {
  //         windowSize: "sm:w-5/6 md:w-4/6 lg:w-2/4 xl:w-2/5 2xl:w-2/6",
  //         callback: cmdNewRecord_Clicked,
  //         component: PurchaseOrderLineForm,
  //         params: {
  //           data: data,
  //           setData: setData,
  //           selectedLines: line_selections
  //         }
  //       })
  //     // cmdNewRecord_Clicked(data, setData, line_selections);
  //     break;
  //   case "cmdDuplicateSelected":
  //     cmdDuplicateSelected_Clicked(data, setData, line_selections);
  //     break;
  //   case "cmdDeleteSelected":
  //     cmdDeleteSelected_Clicked(data, setData, line_selections);
  //     break;  
  //   default:
  //     break;
  // }
}

export const doSearch = (searchParams) => {
  alert("please write search logic");
}

const cmdNewRecord_Clicked = (data, setData, line_selections) => {
  setData([])
  // let _data = [...data];
  // setData([{ ...emptyObject, _seq_: 1 }, ..._data.map((item, index) => {
  //   item._seq_ = index + 2;
  //   return item;
  // })]);
}

const cmdDuplicateSelected_Clicked = (data, setData, line_selections) => {
  let _data = [...data];
  let _insert_index = _data.filter(item => item.id === line_selections[0])[0]._seq_ - 1;
  let _insert_object = [..._data].filter(item => line_selections.includes(item.id)).map(item => {
    return item;
  })[0]
  _insert_object = { ..._insert_object, id: "" };
  _data.splice(_insert_index + 1, 0, _insert_object);
  _data = _data.map((item, seq) => {
    item._seq_ = seq + 1;
    return item;
  })
  setData(_data);
}

const cmdDeleteSelected_Clicked = (data, setData, line_selections) => {
  let _data = [...data];
  _data = _data.filter(item => {
    let _ret = line_selections.includes(item.id)
    return !_ret;
  })
  setData(_data);
}