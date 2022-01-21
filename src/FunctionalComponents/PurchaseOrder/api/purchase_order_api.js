import api from "../../../_core/api/init"

const purchase_order_api = {
  index: (pageNo, pageSize) => {
    return api().get(`/api/purchaseOrders/`, { params: { pageNo: pageNo, pageSize: pageSize } })
  },
  get: (id) => {
    return api().get(`/api/purchaseOrders/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/purchaseOrders/query`, { params: { pageNo: pageNo, pageSize: pageSize, query: query } })
  },
  update: (id, data) => {
    return api().patch(`/api/purchaseOrders/${id}`, data)
  },
  prepareCreate: () => {
    return api().get(`/api/purchaseOrders/prepareCreate`)
  },
  create: (data) => {
    return api().post(`/api/purchaseOrders`, data)
  },
}

export default purchase_order_api;