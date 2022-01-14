const emptyObject = {
  id: "",
  _seq_: "",
  po_line_no: "",
  description: "",
  amount: ""
}

const data = [
  {
    id: 1,
    _seq_: 1,
    po_line_no: 1,
    description: "P046",
    amount: 225,
  },
  {
    id: 2,
    _seq_: 2,
    po_line_no: 6,
    description: "P046",
    amount: 13.5,
  },
  {
    id: 3,
    _seq_: 3,
    po_line_no: 8,
    description: "P046",
    amount: 112.5,
  },
  {
    id: 4,
    _seq_: 4,
    po_line_no: 8,
    description: "P046",
    amount: 88,
  },
  {
    id: 5,
    _seq_: 5,
    po_line_no: 11,
    description: "P046",
    amount: 138.5,
  },
  {
    id: 6,
    _seq_: 6,
    po_line_no: 12,
    description: "P046",
    amount: 155,
  }
]

export const startup = (setData) => {
  setData(data);
}

export const lineMenuInquireHandler = (action, id) => {
  switch (action) {
    case "menuCreateVoucher":
      return true;

    default:
      return false;
  }
}

export const lineMenuActionHandler = (action, ...params) => {
  switch (action) {
    case "menuCreateVoucher":
      alert(params);
      break;

    default:
      break;
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
  let _data = [...data];
  switch (action) {
    case "cmdNewRecord":
      setData([emptyObject, ..._data]);
      break;
    case "cmdDeleteSelected":
      _data = _data.filter(item => {
        let _ret = line_selections.includes(item.id)
        return !_ret;
      })
      setData(_data);
      break;

    default:
      break;
  }
}

export const doSearch = (searchParams) => {
  alert("please write search logic");
}