import { get } from '@/http/axios'
export default {
  namespaced: true,
  state: {
    customers: [],
    orders: []
  },
  getters: {
    // 通过顾客id过滤订单信息
    ordersFilter(state) {
      return function(id) {
        return this.orders.filter(item => item.customerId === id)
      }
    },
    customersFilter(state) {
      return function(id) {
        return this.customers.filter(item => item.id === id)
      }
    }
  },
  mutations: {
    refreshCustomers(state, customers) {
      state.customers = customers
    },
    refreshOrders(state, orders) {
      state.orders = orders
    }
  },
  actions: {
    // 查询所有顾客信息
    async findAllCustomers(context) {
      const response = await get('/customer/findAll')
      response.data.map((item)=>{
        if(item.type === 'customer'){
          context.commit('refreshCustomers', response.data)
        }
      })
    },
    // 查询所有订单信息
    async findAllOrders({ commit }) {
      const response = await get('/order/findAll')
      commit('refreshOrders', response.data)
    }
  }
}
