<template>
  <span>{{ row[col.key] | formatMoney }}</span>
</template>
<script>
export default {
  name: 'ColumnMoney',
  props: {
    row: {
      type: Object
    },
    col: {
      type: Object
    }
  }
}
</script>
