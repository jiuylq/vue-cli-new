export default {
  state: {
    count2: 2,
    num2: 2
  },
  getters: { // 可以认为是 store 的计算属性
    count2: state => state.count2,
    num2: state => state.num2
  },
  mutations: {
    UPDATECOUNT2 (state, data) {
      // 变更状态
      if (data) {
        state.count2 += data
      } else {
        state.count2++
      }
    },
    UPDATENUM2 (state, data) {
      // 变更状态
      if (data) {
        state.num2 += data
      } else {
        state.num2++
      }
    }
  },
  actions: {
    // Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。当我们在之后介绍到 Modules 时，你就知道 context 对象为什么不是 store 实例本身了
    // updateCount (context) { // context
    //   context.commit('UPDATECOUNT2')
    // },
    actionA2 ({ commit }, data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('UPDATENUM2', data)
          resolve()
        }, 500)
      })
    },
    async updateCount2 ({ dispatch, commit, rootState }, data) { // context
      await dispatch('actionA2', data)
      commit('UPDATECOUNT2', data)
    }
  }
}
