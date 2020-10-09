<template>
  <div class="layout-container">
    <van-tabbar v-model="active" active-color="#e10000" route>
      <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="user-circle-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  mounted () {
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped></style>
