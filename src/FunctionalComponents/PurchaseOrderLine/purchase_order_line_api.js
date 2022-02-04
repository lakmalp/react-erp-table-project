import api from "../../_core/api/init"

const purchase_order_line_api = {
  index: (page_no, page_size) => {
    return api().get(`/api/purchaseOrderLines/`, { params: { page_no: page_no, page_size: page_size } })
  },
  getPOLines: (po_id, page_no, page_size) => {
    return api().get(`/api/purchaseOrderLines/`, { params: { po_id: po_id, page_no: page_no, page_size: page_size } })
  },
  get: (id) => {
    return api().get(`/api/purchaseOrders/${id}`)
  },
  query: (page_no, page_size, query) => {
    return api().get(`/api/purchaseOrderLines/query`, { params: { page_no: page_no, page_size: page_size, query: query } })
  },
  prepareEdit: (id) => {
    return api().get(`/api/purchaseOrderLines/prepareEdit`, { params: { id: id } })
  },
  update: (id, data) => {
    return api().patch(`/api/purchaseOrderLines/${id}`, data)
  },
  prepareDuplicate: (id) => {
    return api().get(`/api/purchaseOrderLines/prepareDuplicate`, { params: { id: id } })
  },
  prepareCreate: (parent_id, curr_seq, positioning) => {
    return api().get(`/api/purchaseOrderLines/prepareCreate`, { params: { parent_id: parent_id, curr_seq: curr_seq, positioning: positioning}})
  },
  create: (data) => {
    return api().post(`/api/purchaseOrderLines`, data)
  },
  delete: (id) => {
    return api().delete(`/api/purchaseOrderLines/${id}`)
  },
}

export default purchase_order_line_api;