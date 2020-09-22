<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar class="app-nav-bar">
      <van-button
        slot="title"
        icon="search"
        round
        type="danger"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道tab -->
    <van-tabs v-model="active" class="channel-tabs">
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data.data.channels)
      this.channels = data.data.channels
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background-color: #f9223b;
    border: none;
  }
  .channel-tabs {
    /deep/.van-tab__text {
      font-size: 16px;
    }
    /deep/.van-tabs__line {
      position: absolute;
      bottom: 0.8rem;
      left: 0;
      z-index: 1;
      width: 0.8rem;
      height: 0.2rem;
      background-color: #ee0a24b5;
      border-radius: 0.08rem;
    }
  }
}
</style>
