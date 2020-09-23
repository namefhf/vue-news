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
      <!-- hamburger按钮 -->
      <div slot="nav-right" @click="isShow = !isShow" class="wap-nav-wrap">
        <van-icon name="wap-nav" />
      </div>
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <!-- 文章列表 -->
        <article-list :channel="item" />
      </van-tab>
      <!-- 解决最后的tab被汉堡包遮住 -->
      <div slot="nav-right" style="width:24px;height:44px;flex-shrink:0"></div>
    </van-tabs>
    <!-- 频道列表弹出层popup -->
    <van-popup
      v-model="isShow"
      get-container="body"
      closeable
      round
      position="bottom"
      class="channel-edit-popup"
    >
      <channel-edit
        :user-channels="channels"
        :activeIndex="active"
        @close="isShow = !isShow"
        @update-active="active = $event"
      />
      <!-- @update-active="active=$event" -->
      <!-- @update-active="onUpdateActive"
         -->
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isShow: true // 控制popup
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
    // onUpdateActive(index) {
    //   console.log(index)
    //   this.active = index
    // }
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
  .wap-nav-wrap {
    position: fixed;
    right: 0;
    height: 44px;
    line-height: 50px;
    background-color: white;
    opacity: 0.9;
    .van-icon {
      color: #c8c9cc;
    }
  }
}
</style>
