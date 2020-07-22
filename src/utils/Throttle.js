const throttle = function (fn, wait = 50, isDebounce, ctx) {
  let timer
  let lastCall = 0
  return function (...params) {
    if (isDebounce) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(ctx, params)
      }, wait)
    } else {
      const now = new Date().getTime()
      if (now - lastCall < wait) return
      lastCall = now
      fn.apply(ctx, params)
    }
  }
}

export default {
  name: 'Throttle',
  abstract: true,
  props: {
    time: Number,
    events: String,
    isDebounce: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.eventKeys = this.events.split(',')
    this.originMap = {}
    this.throttledMap = {}
  },
  render () {
    const vnode = this.$slots.default[0]
    this.eventKeys.forEach((key) => {
      const target = vnode.data.on[key]
      if (target === this.originMap[key] && this.throttledMap[key]) {
        vnode.data.on[key] = this.throttledMap[key]
      } else if (target) {
        this.originMap[key] = target
        this.throttledMap[key] = throttle(target, this.time, this.isDebounce, vnode)
        vnode.data.on[key] = this.throttledMap[key]
      }
    })
    return vnode
  }
}

// <div id="app">
//     <Throttle :time="1000" events="click">
//         <button @click="onClick($event, 1)">click+1 {{val}}</button>
//     </Throttle>
//     <Throttle :time="1000" events="click" :isDebounce="true">
//         <button @click="onAdd">click+3 {{val}}</button>
//     </Throttle>
//     <Throttle :time="3300" events="mouseleave" :isDebounce="true">
//         <button @mouseleave.prevent="onAdd">click+3 {{val}}</button>
//     </Throttle>
// </div>

// 通过第三个参数isDebounce来控制切换防抖节流。 最后在main.js里引用
// https://juejin.im/post/5cab64ce5188251b19486041
