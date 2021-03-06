export const data = {
  lines: [
    {
      id: 13,
      _seq_: 1,
      po_line_no: 1,
      description: "P046",
      amount: 225,
    },
    {
      id: 13,
      _seq_: 2,
      po_line_no: 6,
      description: "P046",
      amount: 13.5,
    },
    {
      id: 13,
      _seq_: 3,
      po_line_no: 8,
      description: "P046",
      amount: 112.5,
    },
    {
      id: 13,
      _seq_: 4,
      po_line_no: 8,
      description: "P046",
      amount: 88,
    },
    {
      id: 13,
      _seq_: 5,
      po_line_no: 11,
      description: "P046",
      amount: 138.5,
    },
    {
      id: 13,
      _seq_: 6,
      po_line_no: 12,
      description: "P046",
      amount: 155,
    }
  ]
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

export const commandBarInquireHandler = (data_lines, line_selections, action) => {
  // line_selections = [id1, id2, ...]
  if (line_selections.length > 0) {
    switch (action) {
      case "cmdRelease":
        return data_lines.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
          return acc && (curr.status === "Open")
        }, true);

      case "cmdCreateInvoice":
        return data_lines.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
          return acc && (curr.status === "Released")
        }, true);

      case "cmdSendToIfs":
        return data_lines.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
          return acc && (curr.status === "Closed")
        }, true);

      case "cmdSendToProm":
        return data_lines.filter(line => line_selections.includes(line.id)).reduce((acc, curr) => {
          return acc && (["Released", "Closed"].includes(curr.status))
        }, true);

      default:
        return false;
    }
  } else {
    return false;
  }
}

export const commandBarActionHandler = (data_lines, line_selections, action) => {
  alert(line_selections, action)
}

export const sideBarInquireHandler = (data_lines, line_selections, action) => {
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

export const sideBarActionHandler = (data_lines, line_selections, action) => {
  alert(line_selections, action)
}

export const doSearch = (searchParams) => {
  alert("please write search logic");
}