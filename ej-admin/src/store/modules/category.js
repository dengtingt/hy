import { get, post, post_array } from '@/http/axios'

export default {
  namespaced: true,
  state: {
    categories: [],
    visible: false,
    title: '添加顾客信息'
  },
  getters: {
    categorySize(state) {
      return state.categories.length
    },
    orderCategory: (state) => {
      return function(flag) {
        state.categories.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.categories
      }
    }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshCategories(state, categories) {
      state.categories = categories
    },
    setTitle(state, title) {
      state.title = title
    }
  },
  actions: {
    async batchDeleteCategory(context, ids) {
      // 1. 批量删除
      const response = await post_array('/category/batchDelete', { ids })
      // 2. 分发
      // context.dispatch("findAllCategories");
      // 3. 返回结果
      return response
    },

    // 删除
    async deleteCategoryById(context, id) {
      const response = await get('/category/deleteById?id=' + id)
      // context.dispatch("findAllCategories");
      return response
    },

    // 分页查询所有栏目
    async findAllCategories(context, params) {
      // 1. ajax查询
      const response = await post('/category/query', params)
      // 2. 将查询结果更新到state中
      context.commit('refreshCategories', response.data)
    },

    // payload 栏目信息
    async saveOrUpdateCategory({ commit, dispatch }, payload) {
      // 1. 保存或更新
      const response = await post('/category/saveOrUpdate', payload)
      // 2. 刷新页面
      // dispatch("findAllCategories");
      // 3. 关闭模态框
      commit('closeModal')
      // 4. 提示
      return response
    }
  }
}
