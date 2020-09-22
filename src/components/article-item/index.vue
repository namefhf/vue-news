<template>
  <div class="article-item">
    <van-cell>
      <div slot="title" class="title van-multi-ellipsis--l3">
        {{ article.title }}
      </div>
      <div slot="label">
        <!-- 三张图片 -->
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-wrap-item"
            v-for="(item, index) in article.cover.images"
            :key="index"
          >
            <van-image :src="item" fit="cover" />
          </div>
        </div>
        <div class="label-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <!-- 一张图片 -->
      <van-image
        v-if="article.cover.type === 1"
        :src="article.cover.images[0]"
        fit="cover"
        width="116"
        height="73"
        class="right-cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 16px;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    padding: 10px 0;
    .cover-wrap-item {
      flex: 1;
      width: 100%;
      height: 73px;
      margin-right: 2px;
      // &:not(:last-child) {
      //   padding-right: 4px;
      // }
      .van-image {
        width: 116px;
        height: 73px;
      }
    }
  }
  .label-wrap {
    font-size: 11px;
    span {
      margin-right: 12px;
    }
  }
}
</style>
