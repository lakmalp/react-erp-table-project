import api from "./init"

const pol_api = {
  index: (poNo, pageNo, pageSize) => {
    return api().get(`/api/purchaseOrderLines`, { params: { poNo: poNo, pageNo: pageNo, pageSize: pageSize } })
  },
  get: (id) => {
    return api().get(`/api/purchaseOrderLines/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/purchaseOrderLines/query`, { params: { pageNo: pageNo, pageSize: pageSize, query: query } })
  },
}

export default pol_api;