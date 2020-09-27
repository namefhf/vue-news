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
        :loading="isFollowLoading"
        @click="onFollow"
        >{{ article.is_followed ? '已关注' : '关注' }}</van-button
      >
    </van-cell>
    <div class="markdown-body">
      <div v-html="article.content" ref="article-content"></div>
    </div>
    <div class="article-bottom">
      <van-button type="default" round szie="small" class="comment-btn"
        >写评论</van-button
      >
      <van-icon name="comment-o" info="123" />
      <van-icon
        :color="article.is_collected ? 'red' : ''"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude === 1 ? 'red' : ''"
        @click="onLike"
      />
      <van-icon name="share" />
    </div>
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'

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
      article: {},
      isFollowLoading: false, // 关注loading
      isCollectLoading: false // 收藏loading
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
    },
    // 关注、取关用户
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        await deleteFollow(this.article.aut_id)
      } else {
        await addFollow(this.article.aut_id)
      }
      this.isFollowLoading = false
      this.article.is_followed = !this.article.is_followed
    },
    // 收藏
    async onCollect () {
      // console.log('click')
      this.$toast.loading({
        message: '操作中....',
        forbidclick: true
      })
      if (this.article.is_collected) {
        await deleteCollect(this.article.art_id)
      } else {
        await addCollect(this.article.art_id)
      }
      this.article.is_collected = !this.article.is_collected
      this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
    },
    // 点赞
    async onLike () {
      this.$toast.loading({
        message: '操作中....',
        forbidclick: true
      })
      if (this.article.attitude === 1) {
        await deleteLike(this.article.art_id)
      } else {
        await addLike(this.article.art_id)
      }
      this.article.attitude = this.article.attitude === 1 ? -1 : 1
      this.$toast.success(
        `${this.article.attitude === 1 ? '' : '取消'}点赞成功`
      )
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
  .article-bottom {
    background-color: #fff;
    padding: 10px 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .comment-btn {
      width: 150px;
      height: 30px;
    }
  }
}
</style>
