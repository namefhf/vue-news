<template>
  <div class="comment-reply">
    <van-nav-bar :title="`${comment.reply_count}条回复`" />
    <van-cell title="当前评论" />
    <comment-item :comment="comment" />
    <comment-list
      :source="comment.com_id.toString()"
      type="c"
      :list="commentList"
    />
    <div class="reply-btn">
      <van-button type="default" round @click="isReplyShow = true"
        >发表回复</van-button
      >
    </div>
    <!-- 回复popup -->
    <van-popup v-model="isReplyShow" position="bottom">
      <post-comment
        :target="comment.com_id"
        :articleId="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  data () {
    return {
      isReplyShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  methods: {
    onPostSuccess (comment) {
      console.log(comment)
      this.isReplyShow = false
      this.comment.reply_count++
      this.commentList.unshift(comment)
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  .reply-btn {
    text-align: center;
    .van-button {
      width: 80%;
    }
  }
}
</style>
