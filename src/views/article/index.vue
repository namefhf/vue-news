<template>
  <div class="article-container">
    <van-nav-bar
      left-arrow
      title="文章详情"
      class="app-nav-bar"
      @click-left="$router.back()"
    />
    <div class="title">{{ article.title }}</div>
    <van-cell center class="user-info">
      <van-image
        class="avatar"
        slot="icon"
        :src="article.aut_photo"
        round
        width="35"
        height="35"
      />
      <div slot="title" class="name">{{ article.aut_name }}</div>
      <div slot="label" class="pubdate">
        {{ article.pubdate | relativeTime }}
      </div>
      <van-button
        round
        size="small"
        :type="article.is_followed ? 'default' : 'danger'"
        class="follow-btn"
        :icon="article.is_followed ? '' : 'plus'"
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button
      >
    </van-cell>
    <div class="markdown-body">
      <div v-html="article.content" ref="article-content"></div>
    </div>
  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import './github-markdown.css'
import { ImagePreview } from 'vant'
export default {
  name: 'AticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}
    }
  },
  created () {
    this.loadArticleDetail()
  },
  mounted () {},
  methods: {
    async loadArticleDetail () {
      const { data } = await getArticleById(this.articleId)
      // console.log(data)
      this.article = data.data
      this.$nextTick(() => {
        this.handlePreviewImg()
      })
    },
    handlePreviewImg () {
      const articleContent = this.$refs['article-content']
      console.log('articleContent: ', articleContent)
      const imgs = articleContent.querySelectorAll('img')
      console.log('imgs : ', imgs)
      const imgPaths = []
      imgs.forEach((img, i) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({ images: imgPaths, startPosition: i })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .title {
    font-size: 20px;
    font-weight: bold;
    padding: 14px;
    background-color: #fff;
  }
  .user-info {
    .avatar {
      margin-right: 8px;
    }
    .name {
      font-size: 12px;
    }
    .pubdate {
      color: #b4b4b4;
      font-size: 12px;
    }
    .follow-btn {
      width: 85px;
      height: 29px;
    }
  }
  .markdown-body {
    padding: 14px;
    background-color: #fff;
  }
}
</style>
