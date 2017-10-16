<template>
  <div class="edit_hotfood">
    <dl>
      <dt>周一</dt>
      <dd><input type="" name="" v-model="aa" :value="aa" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
    </dl>
    <dl>
      <dt>周二</dt>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
    </dl>
    <dl>
      <dt>周三</dt>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
    </dl>
    <dl>
      <dt>周四</dt>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
    </dl>
    <dl>
      <dt>周五</dt>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
      <dd><input type="" name="" placeholder="请输入菜品和价格"></dd>
    </dl>
    
  </div>
</template>
<script>
  export default {
    data: () => ({
      aa: ''
    })
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .edit_hotfood
    height:220px
    background-color:rgba(188,194,218,0.8)
    dl:nth-child(5)
      border:none !important
    dl
      float:left
      width:20%
      text-align:center
      border-right:1px dashed #5f5fd9
      box-sizing:border-box
      dt
        height:30px
        line-height:30px
      input
        height:25px
        width:80%
        font-size:12px
        border:1px solid #6b6bf9
        text-align:center
        margin-bottom:8px
</style>