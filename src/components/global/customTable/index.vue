<template>
  <el-table :data="tableData" v-bind="$attrs" v-on="$listeners" :key="layoutKey">
    <table-column v-for="item in tableSetting" :key="item.key" :col="item" :index="index">
    </table-column>
  </el-table>
</template>

<script>
export default {
  name: 'CustomTable',
  props: {
    tableData: {
      type: Array,
      require: true
    },
    tableSetting: {
      type: Array,
      default: () => {
        return [
          // { key: '3', label: '3' },
          // {
          //   key: '4',
          //   label: '4',
          //   children: [
          //     { key: '11', label: '11' },
          //     {
          //       key: '22',
          //       label: '22',
          //       children: [
          //         { key: '33', label: '33' },
          //         { key: '44', label: '44', type: 'money' }
          //       ]
          //     }
          //   ]
          // }
          // type: money金额, percent百分数
        ]
      }
    },
    index: {
      type: Function
    }
  },
  data() {
    return {
      layoutKey: 1
    }
  },
  computed: {},
  watch: {
    tableSetting(val) {
      this.layoutKey++
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped lang="scss"></style>
