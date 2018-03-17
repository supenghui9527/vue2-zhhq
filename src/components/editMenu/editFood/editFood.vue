<template>
  <div class="edit_food">
    <dl>
      <dt>周一</dt>
      <dd><input v-model="allFoods.food1" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food2" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food3" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food4" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food5" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food6" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周二</dt>
      <dd><input v-model="allFoods.food7" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food8" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food9" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food10" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food11" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food12" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周三</dt>
      <dd><input v-model="allFoods.food13" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food14" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food15" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food16" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food17" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food18" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周四</dt>
      <dd><input v-model="allFoods.food19" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food20" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food21" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food22" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food23" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food24" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周五</dt>
      <dd><input v-model="allFoods.food25" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food26" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food27" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food28" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food29" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food30" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周六</dt>
      <dd><input v-model="allFoods.food31" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food32" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food33" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food34" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food35" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food36" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周日</dt>
      <dd><input v-model="allFoods.food37" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food38" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food39" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food40" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food41" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food42" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <el-button class="menu_btn" type="primary" @click="this.submitMenu">确认提交</el-button>
  </div>
</template>
<script>
  export default {
    data: () => ({
      allFoods: {
        food1: '',
        food2: '',
        food3: '',
        food4: '',
        food5: '',
        food6: '',
        food7: '',
        food8: '',
        food9: '',
        food10: '',
        food11: '',
        food12: '',
        food13: '',
        food14: '',
        food15: '',
        food16: '',
        food17: '',
        food18: '',
        food19: '',
        food20: '',
        food21: '',
        food22: '',
        food23: '',
        food24: '',
        food25: '',
        food26: '',
        food27: '',
        food28: '',
        food29: '',
        food30: '',
        food31: '',
        food32: '',
        food33: '',
        food34: '',
        food35: '',
        food36: '',
        food37: '',
        food38: '',
        food39: '',
        food40: '',
        food41: '',
        food42: ''
      },
      allFoodsId: {}
    }),
    created () {
      this.getMenu()
    },
    methods: {
      getMenu () {
        this.$store.dispatch('get/food/menu', {
          Vue: this,
          userID: window.localStorage.getItem('userID')
        })
      },
      submitMenu () {
        let foodJson = ''
        for (let i in this.allFoods) {
          if (this.allFoods[i] === '') {
            this.$message({message: '请确认编辑内容格式是否如下“请输入菜品/价格/数量”', type: 'warning'})
            return false
          }
          if (i.substring(4) * 1 % 6 === 0) {
            foodJson += `${this.allFoodsId[i.substring(4)]},${this.allFoods[i].replace(/\//g, ',')}-`
          } else {
            foodJson += `${this.allFoodsId[i.substring(4)]},${this.allFoods[i].replace(/\//g, ',')};`
          }
        }
        this.$store.dispatch('edit/food/menu', {
          Vue: this,
          userID: window.localStorage.getItem('userID'),
          foodJson: foodJson.substring(0, foodJson.length - 1)
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .edit_food
    position:relative
    height:300px
    background-color:rgba(188,194,218,0.8)
    .menu_btn
      position:absolute
      right:10px
      bottom:10px
    dl:nth-child(7)
      border:none !important
    dl
      float:left
      width:14.28%
      text-align:center
      border-right:1px dashed #5f5fd9
      box-sizing:border-box
      dt
        height:30px
        line-height:30px
      input
        height:30px
        width:85%
        font-size:16px
        border:1px solid #6b6bf9
        margin-bottom:8px
        box-sizing:border-box
        text-align:center
</style>