<template>
  <el-table-column
    v-if="(col.type === 'index' || col.type === 'selection' || col.type === 'expand') && !col.hidden"
    :prop="col.key"
    :label="col.label"
    :align="col.align ? col.align : 'center'"
    :show-overflow-tooltip="col.showTooltip"
    :class-name="col.className"
    :type="col.type"
    :width="col.width"
    :min-width="col.minWidth"
    :fixed="col.fixed"
    :index="index"
    >
  </el-table-column>
  <el-table-column
    v-else-if="!col.hidden"
    :prop="col.key"
    :label="col.label"
    :align="col.align ? col.align : 'center'"
    :show-overflow-tooltip="col.showTooltip"
    :class-name="col.className"
    :width="col.width"
    :min-width="col.minWidth"
    :fixed="col.fixed"
  >
    <template v-if="col.children">
      <table-column v-for="(item, index) in col.children" :key="index" :col="item"></table-column>
    </template>
    <template slot-scope="scope">
      <slot
        v-if="col.type === 'slot'"
        :name="col.slotName"
        :row="scope.row"
      ></slot>
      <components
        v-else-if="col.isComponents"
        :row="scope.row"
        :prop="col.key"
        :col="col"
        :is="`column-${col.type}`"
      ></components>
      <span v-else>
        <span v-if="col.type === 'money'">{{ scope.row[col.key] | formatMoney }}</span>
        <span v-else-if="col.type === 'date'">{{ scope.row[col.key] | formatDate }}</span>
        <span v-else>{{ scope.row[col.key] ? scope.row[col.key] : '--' }}</span>
      </span>
    </template>
  </el-table-column>

</template>

<script>
// 动态表格封装
// https://juejin.cn/post/7131669281758150692
const modules = {};
function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function validateFileName (str) {
  return /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => capitalizeFirstLetter($1))
}
const files = require.context("./components", true, /\.vue$/);
files.keys().forEach((filePath) => {
  const componentConfig = files(filePath)
  const fileName = validateFileName(filePath)
  const componentName = fileName.toLowerCase() === 'index'
    ? capitalizeFirstLetter(componentConfig.default.name)
    : fileName
  modules[`Column${componentName}`] = files(filePath).default || componentName;
});
console.log(modules, "modules");
export default {
  name: 'TableColumn',
  components: {
    // 组件动态注册
    ...modules
  },
  props: {
    col: {
      type: Object
      // default: () => {
      //   return {
      //     key: 'xx',
      //     label: 'xx',
      //     align: 'xx',
      //     type: 'money',
      //     showTooltip: false,
      //     className: 'className',
      //     hidden: true
      //   }
      // }
    },
    index: {
      type: Function,
      default: (e) => {
        return e + 1
      }
    }
  }
}
</script>

<style scoped></style>
