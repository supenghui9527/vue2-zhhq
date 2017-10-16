<template>
  <div>
    <div class="logo">
      <h1>建邺智慧后勤管理中心</h1>
      <div>
        <img class="user" src="../login/already_login.png" @click="$router.push('/login')">
        <span class="rule_tit">全部订单</span>
        <span @click="printOrder" class="rule_tit">打印订单</span>
        <span class="rule_tit" @click="$router.push('/login')">返回主页</span>
      </div>
    </div>
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
          width="70"
          label="序号">
          <template scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="订单编号">
          <template scope="scope">{{ scope.row.orderNO }}</template>
        </el-table-column>
        <el-table-column
          prop="param2"
          label="详情"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="订单人姓名">
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="6"
          layout="prev, pager, next, jumper"
          :total="allOrder.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => ({
      allOrder: {},
      multipleSelection: []
    }),
    created () {
      this.getAllOrder(1)
    },
    methods: {
      getAllOrder (pageIndex) {
        this.$store.dispatch('find/food/order', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          pageIndex: pageIndex,
          pageNumber: 6
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
      handleSizeChange (val) {
      },
      handleCurrentChange (val) {
        this.getAllOrder(val)
      },
      // 打印订单http://127.0.0.1/tsc/print.php
      printOrder () {
        this.axios.post('http://192.168.8.9/tsc/print.php', {list: this.multipleSelection}).then(response => {
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
@import '~common/css/common.styl'
.all_order
  position:absolute
  width:700px
  left:50%
  margin-left:-350px
  top:240px
  .block
    background-color:#fff
</style>