import { useRef, useState } from "react"
import { IconDuplicate, IconEdit, IconPlus, IconTrash } from "../../_core/utilities/svg-icons"

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
    label: "View Purchasing History",
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
    label: "Insert Above",
    action: "menuInsertAbove",
    params: ["id"]
  }, {
    label: "Insert Below",
    action: "menuInsertBelow",
    params: ["id"]
  }, {
    label: "Open Detail View",
    action: "menuOpenLineDetail",
    params: ["id", "_seq_"]
  },
  {
    label: "Show Invoice",
    action: "menuShowInvoice",
    params: ["id", "_seq_"]
  },
  {
    label: "Transfer to IFS",
    action: "menuTransferToIfs",
    params: ["id", "_seq_"]
  }
]

export const tableConfig = {
  general: {
    sumColumns: ["tax", "amount"],
    showGrandSum: true,
    showFilterSum: true,
    addSystemButtonsToSideBar: true
  },
  columns: [
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
      label: '_seq_',
      type: 'number',
      align: 'left',
      length: 70,
      decimals: 0,
      visible: { 'xs': false, 'sm': false, 'md': false, 'lg': false, 'xl': false, '2xl': false, '3xl': false },
      autosum: false
    },
    {
      name: '_line_no_',
      label: 'Line No',
      type: 'number',
      align: 'left',
      length: 70,
      decimals: 0,
      visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      autosum: false
    },
    {
      name: 'part_code',
      label: 'Part Code',
      type: 'string',
      align: 'left',
      length: 90,
      decimals: 0,
      visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      autosum: false
    },
    {
      name: 'part_description',
      label: 'Part Description',
      type: 'string',
      align: 'left',
      length: 270,
      decimals: 0,
      visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      autosum: false
    },
    // {
    //   name: 'supplier',
    //   label: 'Supplier',
    //   type: 'object',
    //   align: 'left',
    //   length: 320,
    //   decimals: 0,
    //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    //   select: ['code', 'description'],
    //   concatChar: " - ",
    //   autosum: false
    // },
    {
      name: 'delivery_date',
      label: 'Delivery Date',
      type: 'date',
      align: 'left',
      length: 270,
      decimals: 0,
      visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      autosum: false
    },
    {
      name: 'status',
      label: 'Status',
      type: 'string',
      align: 'left',
      length: 80,
      decimals: 0,
      visible: { 'xs': true, 'sm': true, 'md': true, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
      autosum: false
    },
    // {
    //   name: 'tax',
    //   label: 'Tax',
    //   type: 'currency',
    //   align: 'right',
    //   length: 70,
    //   decimals: 0,
    //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    //   autosum: true
    // },
    // {
    //   name: 'amount',
    //   label: 'Amount',
    //   type: 'currency',
    //   align: 'right',
    //   length: 70,
    //   decimals: 0,
    //   visible: { 'xs': false, 'sm': false, 'md': false, 'lg': true, 'xl': true, '2xl': true, '3xl': true },
    //   autosum: true
    // },
  ]
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

export function useTheme(_theme) {
  const [theme, _settheme] = useState(_theme);
  return theme;
}

export function useContainerRef() {
  const containerRef = useRef();
  return containerRef;
}