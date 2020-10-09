<template>
  <div class="article-list" ref="article-list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successtext"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in articles"
          :key="index"
          :article="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
import { debounce } from 'lodash'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      articles: [],
      refreshing: false,
      timestamp: null,
      successtext: '',
      scrollTop: 0 // 列表滚动距离
    }
  },
  mounted () {
    const articlelist = this.$refs['article-list']
    articlelist.onscroll = debounce(() => {
      // console.log(articlelist.scrollTop)
      this.scrollTop = articlelist.scrollTop
    }, 50)
  },
  activated () {
    this.$refs['article-list'].scrollTop = this.scrollTop
  },
  deactivated () {},
  methods: {
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 0 // 是否包含置顶文章
      })
      // console.log(data)
      const { results } = data.data
      this.articles.push(...results)
      console.log(this.articles)
      this.loading = false
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      // 重新执行获取数据方法
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 0
      })
      const { results } = data.data
      // 新内容方到数组最前面
      this.articles.unshift(...results)
      this.refreshing = false
      this.successtext = `已更新${results.length}条数据`
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
