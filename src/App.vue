<template>
  <div id="app">
    <h1>news</h1>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="warning">111</van-button>
    <div class="wrap">wrap</div>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
.wrap {
  width: 375px;
  height: 375px;
  background-color: aquamarine;
}
</style>
