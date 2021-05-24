import Vue from 'vue'
import Vuex from 'vuex'
import a from './moduls/a'
import b from './moduls/b'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 1,
    num: 1
  },
  getters: { // 可以认为是 store 的计算属性
    count: state => state.count,
    num: state => state.num
  },
  mutations: {
    UPDATECOUNT (state, data) {
      // 变更状态
      if (data) {
        state.count += data
      } else {
        state.count++
      }
    },
    UPDATENUM (state, data) {
      // 变更状态
      if (data) {
        state.num += data
      } else {
        state.num++
      }
    }
  },
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了
    // updateCount (context) { // context
    //   context.commit('UPDATECOUNT')
    // },
    actionA ({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('UPDATENUM')
          resolve()
        }, 500)
      })
    },
    async updateCount ({ dispatch, commit }, data) { // context
      await dispatch('actionA', data)
      commit('UPDATECOUNT', data)
    }
  },
  modules: {
    aa: a, // 不开启命名空间
    bb: b // 开启命名空间
  }
})
