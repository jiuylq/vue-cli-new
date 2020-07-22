<template>
  <div id="dropbox">
    <cardDragger :data="cardList"></cardDragger>
  </div>
</template>

<script>
import cardDragger from '@/components/carddrgger/index.vue'
export default {
  components: {
    cardDragger
  },
  data () {
    return {
      cardList: []
    }
  },
  beforeCreate () {
  },
  created () {
    this.addDataList()
  },
  beforeMount () {},
  mounted () {},
  methods: {
    addDataList () {
      for (let i = 1; i < 30; i++) {
        this.cardList.push({
          positionNum: i,
          name: '演示卡片' + i,
          id: 'card' + i
        })
      }
      console.log(this.cardList)
    }
  },
  beforeDestroy () {},
  destroyed () {}
}
</script>

<style>

</style>
