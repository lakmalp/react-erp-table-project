import api from "./init"

const po_api = {
  index: (pageNo, pageSize) => {
    return api().get(`/api/purchaseOrders/`, { params: { pageNo: pageNo, pageSize: pageSize } })
  },
  get: (id) => {
    return api().get(`/api/purchaseOrders/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/purchaseOrders/query`, { params: { pageNo: pageNo, pageSize: pageSize, query: query } })
  },
}

export default po_api;