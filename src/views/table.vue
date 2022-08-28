<template>
  <div class="home">
    <!-- <custom-table
      border
      :table-data="tableData"
      :table-setting="tableSetting"
      ref="tableData"
      style="width: 100%"
      stripe
      header-row-class-name="ps-table-header-row"
      >
        <template #operate="{ row }">
          <el-button size="small">删除</el-button>
          <el-button size="small" type="primary" @click="onEdit(row)">
            编辑
          </el-button>
        </template>
      </custom-table> -->
      <el-table :data="tableData" border style="width: 100%" stripe header-row-class-name="ps-table-header-row">
        <table-column v-for="item in tableSetting" :key="item.key" :col="item">
          <template #operate="{ row }">
          <el-button size="small">删除</el-button>
          <el-button size="small" type="primary" @click="onEdit(row)">
            编辑
          </el-button>
        </template>
        </table-column>
      </el-table>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      tableSetting: [
        { key: 'primary', label: '序号', type: 'index' },
        { key: 'secondary', label: '地区' },
        { key: 'company', label: '公司' },
        { key: 'canteen', label: '食堂' },
        { key: 'area', label: '食堂区域' },
        { key: 'stall', label: '消费点' },
        { key: 'consume', label: '总营业额', type: 'money' },
        { key: 'consume1', label: '总营业额1', type: 'money', isComponents: true },
        { key: 'consume_count', label: '总消费笔数' },
        {
          key: 'breakfast',
          label: '早餐',
          children: [
            { key: 'breakfast_consume', label: '营业额' },
            { key: 'breakfast_consume_count', label: '消费笔数' }
          ]
        },
        {
          key: 'lunch',
          label: '午餐',
          children: [
            { key: 'lunch_consume', label: '营业额' },
            { key: 'lunch_consume_count', label: '消费笔数' }
          ]
        },
        {
          key: 'afternoon',
          label: '下午茶',
          children: [
            { key: 'afternoon_consume', label: '营业额' },
            { key: 'afternoon_consume_count', label: '消费笔数' }
          ]
        },
        {
          key: 'dinner',
          label: '下午茶',
          children: [
            { key: 'dinner_consume', label: '营业额' },
            { key: 'dinner_consume_count', label: '消费笔数' }
          ]
        },
        {
          key: 'supper',
          label: '宵夜',
          children: [
            { key: 'supper_consume', label: '营业额' },
            { key: 'supper_consume_count', label: '消费笔数' }
          ]
        },
        {
          key: 'morning',
          label: '凌晨餐',
          children: [
            { key: 'morning_consume', label: '营业额' },
            { key: 'morning_consume_count', label: '消费笔数' }
          ]
        },
        { key: 'operate', label: '操作', type: 'slot', slotName: "operate", fixed: 'right' }
      ],
      tableData: [{ aa: 1, consume1: 3 }, { bb: 2, consume1: 99 }]
    }
  },
  methods: {
    onEdit(e) {
      console.log(111, e)
    }
  }
}
</script>

<style lang="scss">
.ps-table-header-row{
  background-color: #ebedf2 !important;
  border-radius: 4px 4px 0px 0px;
  th.el-table__cell {
    background-color: #ebedf2 !important;
  }
}
</style>
