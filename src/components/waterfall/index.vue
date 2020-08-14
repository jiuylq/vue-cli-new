<template>
  <div class="child">
    <!-- 第一列 -->
    <div ref="column1" :style="{marginTop: merge && mergeColumns.indexOf(1) > -1 ? mergeHeight + 'px':''}">
        <template v-if="$slots['first-col']">
            <slot name="first-col"></slot>
        </template>
        <template v-for="(item, index) in columnList1">
            <!-- 第一列瀑布流内容... -->
          {{`${index} + ${item}`}}
        </template>
    </div>
    <!-- 第二列 -->
    <div ref="column2" :style="{marginTop: merge && mergeColumns.indexOf(2) > -1 ? mergeHeight + 'px':''}">
        <template v-if="$slots['second-col']">
            <slot name="second-col"></slot>
        </template>
        <template v-for="(item, index) in columnList2">
            <!-- 第二列瀑布流内容... -->
          {{`${index} + ${item}`}}
        </template>
    </div>
    <!-- 第三列 -->
    <div ref="column3" :style="{marginTop: merge && mergeColumns.indexOf(3) > -1 ? mergeHeight + 'px':''}">
        <template v-if="$slots['third-col']">
            <slot name="third-col"></slot>
        </template>
        <template v-for="(item, index) in columnList3">
            <!-- 第三列瀑布流内容... -->
          {{`${index} + ${item}`}}
        </template>
    </div>
    <!-- 第四列 -->
    <div ref="column4" v-if="is4Columns">
        <template v-if="$slots['last-col']">
            <slot name="last-col"></slot>
        </template>
        <template v-for="(item, index) in columnList4">
            <!-- 第四列瀑布流内容... -->
          {{`${index} + ${item}`}}
        </template>
    </div>
    <!-- 合并块非瀑布流内容 -->
    <div class="column-merge" v-if="merge" :style="{left: (mergeColumns[0] - 1)*330 + 'px'}">
        <slot name="merge-col"></slot>
    </div>
</div>
</template>

<script>
export default {
  props: {
    requestParams: {
      type: Object,
      require: !0
    },
    merge: {
      type: Boolean
    },
    mergeHeight: {
      type: Number
    },
    origin: {
      type: String
    }
  },
  data () {
    return {
      columnList1: [], // 第一列元素列表
      columnList2: [],
      columnList3: [],
      columnList4: [],
      renderIndex: -1, // 渲染第几个item
      isRendering: false, // 是否正在渲染
      itemList: [], // 所有元素列表
      isEnd: false
    }
  },
  watch: {
    renderIndex (value) {
      let renderMinTop, winHeight, loadedItemNum, canShowItemNum
      // 当前滚动条高度
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      // 最小列高度 - 滚动高度 < 可视区域高的的1.5倍
      if (renderMinTop - scrollTop < winHeight * 1.5) {
        this.renderWaterfall()
      }
      // 已加载的元素个数 + 一屏可以展示元素预估个数 > 所有请求拿到的元素个数
      if (loadedItemNum + canShowItemNum > this.itemList.length && !this._requesting && !this.isEnd) {
        // 请求瀑布流数据
        this.getData()
      }
    }
  },
  methods: {
    getMinhIndex (arr, value) {
      // eslint-disable-next-line promise/param-names
      return new Promise((reslove) => {
        let minIndex = 0
        for (let i in arr) {
          if (arr[i] === value) {
            minIndex = i
            reslove(minIndex)
          }
        }
      })
    },
    scroll () {
      let lastScrollTop, winHeight
      // 当前滚动条高度
      const scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

      // 底部检测高度
      const bottomDetectionTop = this.$refs.bottomDetection.offsetTop

      const tempLastScrollTop = lastScrollTop // lastScrollTop:上次一滚动高度
      lastScrollTop = scrollTop

      if (tempLastScrollTop === -1) {
        this.renderWaterfall()
      }

      // 如果是向下滚动则判断是否需要继续渲染
      if (scrollTop > tempLastScrollTop) {
        if (bottomDetectionTop - tempLastScrollTop < winHeight * 1.5 && !this.isRendering) {
          this.renderWaterfall()
        }
      }
    },
    renderWaterfall () {
      let columnsHeight, minHeight
      // 如果还没有数据、所有数据已经渲染完成、正在渲染则不进行渲染计算操作
      if (this.itemList.length === 0 || this.renderIndex >= this.itemList.length - 1 || this.isRendering) {
        if (this.renderIndex === this.feedList.length - 1 && !this._requesting && !this.isEnd) {
          this.getData()
        }
        return
      }
      this.isRendering = true

      /***
    *** 获取最小高度代码
    ***/
      this.getMinhIndex(columnsHeight, minHeight).then(minIndex => {
        const key = `columnList${minIndex + 1}`
        let itemData = this.itemList[this.renderIndex + 1]
        this[key] = this[key].concat(itemData)
        this.$nextTick(() => {
          this.renderIndex = this.renderIndex + 1
          this.isRendering = false
        })
      })
    }
  }
}
</script>

<style>

</style>
