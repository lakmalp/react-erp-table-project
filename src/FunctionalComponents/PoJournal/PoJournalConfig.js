import { useRef, useState } from "react"
import { IconDuplicate, IconEdit, IconPlus, IconTrash } from "../../_core/utilities/svg-icons"

export const columns = [
  {
    name: 'id',
    label: 'ID',
    type: 'number',
    align: 'center',
    length: 30,
    decimals: 0,
    visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
    autosum: false
  },
  {
    name: '_seq_',
    label: 'Line No',
    type: 'number',
    align: 'left',
    length: 70,
    decimals: 0,
    visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    autosum: false
  },
  {
    name: 'po_line_no',
    label: 'PO Line No',
    type: 'string',
    align: 'left',
    length: 70,
    decimals: 0,
    visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    autosum: false
  },
  {
    name: 'description',
    label: 'Description',
    type: 'string',
    align: 'left',
    length: 70,
    decimals: 0,
    visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    autosum: false
  },
  {
    name: 'amount',
    label: 'Amount',
    type: 'currency',
    align: 'right',
    length: 320,
    decimals: 0,
    visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    autosum: false
  },
]

export const commandBarButtons = [
  {
    label: "Release",
    action: "cmdRelease"
  },
  {
    label: "Create Invoice",
    action: "cmdCreateInvoice"
  },
  {
    label: "Send to IFS",
    action: "cmdSendToIfs"
  }
]

export const sideBarButtons = [
  {
    label: "New",
    action: "cmdNewRecord",
    icon: IconPlus
  },
  {
    label: "Duplicate",
    action: "cmdDuplicateSelected",
    icon: IconDuplicate
  },
  {
    label: "Edit",
    action: "cmdEditSelected",
    icon: IconEdit
  },
  {
    label: "Delete",
    action: "cmdDeleteSelected",
    icon: IconTrash
  }
]

export const lineMenus = [
  {
    label: "Create Voucher",
    action: "menuCreateVoucher",
    params: ["id", "_seq_"]
  }
]

export const tableConfig = {
  sumColumns: ["tax", "amount"],
  showGrandSum: true,
  showFilterSum: true
}

export const tableStyle = {
  baseStyle: {
    commandBarButton: {
      enabled: "text-xs font-semibold px-3 py-2 font-montserrat hover:shadow cursor-pointer",
      disabled: "text-xs font-semibold px-3 py-2 font-montserrat cursor-default"
    },
    sideBarButton: {
      enabled: " hover:bg-ss-200 cursor-pointer",
      disabled: " opacity-50 cursor-default"
    }
  },
  yellow: {
    commandBarButton: {
      enabled: "golden-yellow text-black",
      disabled: "bg-ss-100 text-gray-400"
    }
  },
  blue: {
    commandBarButton: {
      enabled: "bg-blue-500 hover:bg-blue-600 text-white",
      disabled: "bg-ss-100 text-gray-400"
    },
    sideBarButton: {
      enabled: "",
      disabled: ""
    }
  },
  dark: {
    commandBarButton: {
      enabled: "bg-gray-800 text-gray-100",
      disabled: "bg-ss-100 text-gray-400"
    }
  }
}