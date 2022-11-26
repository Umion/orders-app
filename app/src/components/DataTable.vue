<template lang="pug">
.data-table
  table.table(cellspacing=0)
    tbody
      tr(
        v-for="(item, rowIndex) in items"
        :key="rowIndex"
        
      )
        td(
          v-for="(header, celIndex) in headers"
          :key="`${rowIndex}_${celIndex}_${header.key}`"
          :class="[`table__cel-${header.key}`, {squeeze: header.squeeze}]"
          :title="item[header.key]"
        )
          slot(
            :name="`cel_${header.key}`"
            :index="rowIndex"
            :item="item"
          ) {{ item[header.key] }}

  </template>

<script>
export default {
  components: {},

  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.data-table {
  .table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 5px;

    tr {
      border-radius: 5px;
      font-size: 12px;
      background: #fff;
    }

    td {
      padding: 10px;

      &.squeeze {
        width: 0.1%;
        white-space: nowrap;
      }
    }
  }
}
</style>
