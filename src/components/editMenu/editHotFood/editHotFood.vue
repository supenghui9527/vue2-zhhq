<template>
  <div class="edit_hotfood">
    <dl>
      <dt>周一</dt>
      <dd><input v-model="allFoods.food1" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food2" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food3" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周二</dt>
      <dd><input v-model="allFoods.food4" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food5" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food6" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周三</dt>
      <dd><input v-model="allFoods.food7" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food8" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food9" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周四</dt>
      <dd><input v-model="allFoods.food10" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food11" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food12" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周五</dt>
      <dd><input v-model="allFoods.food13" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food14" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food15" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周六</dt>
      <dd><input v-model="allFoods.food16" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food17" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food18" type="text" placeholder="请输入菜品/价格/数量"></dd>
    </dl>
    <dl>
      <dt>周日</dt>
      <dd><input v-model="allFoods.food19" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food20" type="text" placeholder="请输入菜品/价格/数量"></dd>
      <dd><input v-model="allFoods.food21" type="text" placeholder="请输入菜品/价格/数量"></dd>
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
        food21: ''
      },
      allFoodsId: []
    }),
    created () {
      this.getMenu()
    },
    methods: {
      getMenu () {
        this.$store.dispatch('get/hot/menu', {
          Vue: this
        })
      },
      submitMenu () {
        let foodJson = ''
        for (let i in this.allFoods) {
          if (i.substring(4) * 1 % 3 === 0) {
            foodJson += `${this.allFoodsId[i.substring(4)]},${this.allFoods[i].replace(/\//g, ',')}-`
          } else {
            foodJson += `${this.allFoodsId[i.substring(4)]},${this.allFoods[i].replace(/\//g, ',')};`
          }
        }
        this.$store.dispatch('edit/hot/menu', {
          Vue: this,
          foodJson: foodJson.substring(0, foodJson.length - 1)
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .edit_hotfood
    position:relative
    height:220px
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
        height:25px
        width:85%
        font-size:14px
        border:1px solid #6b6bf9
        margin-bottom:8px
        box-sizing:border-box
        text-align:center
</style>