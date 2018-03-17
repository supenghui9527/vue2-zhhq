<template>
  <div class="all_order">
    <el-table
      ref="multipleTable"
      :data="allOrder.list"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection">
      </el-table-column>
      <el-table-column
        width="100"
        label="取货码">
        <template scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column
        prop="param1"
        label="订单生成时间"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="param2"
        label="详情"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名">
      </el-table-column>
      <el-table-column
        label="部门名称">
        <template scope="scope">{{ scope.row.tag}}</template>
      </el-table-column>
    </el-table>
    <el-button class="order_btn" @click="printOrder" type="primary">打印面食订单</el-button>
  </div>
</template>
<script>
  export default {
    data: () => ({
      allOrder: {},
      multipleSelection: []
    }),
    created () {
      this.getAllOrder()
    },
    methods: {
      getAllOrder () {
        this.$store.dispatch('find/food/order', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          foodType: 1
        })
      },
      toggleSelection (rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 打印订单http://127.0.0.1/tsc/print.php
      printOrder () {
        this.axios.post('http://127.0.0.1/tsc/print.php', {list: this.multipleSelection}).then(response => {
          if (response.data.status === 1) {
          }
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
</style>