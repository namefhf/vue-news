<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      round
      cover
      :src="comment.aut_photo"
      class="avatar"
    />
    <div slot="title">
      <div style="display: flex;justify-content: space-between">
        <div class="name">{{ comment.aut_name }}</div>
        <div class="like-wrap">
          <van-icon
            :name="comment.is_liking ? 'good-job' : 'good-job-o'"
            :color="comment.is_liking ? 'red' : ''"
            class="icon-like"
            @click="onCommentLike"
          />
          <span class="count">{{ comment.like_count }}</span>
        </div>
      </div>

      <div class="content">{{ comment.content }}</div>
      <div>
        <span class="pubdata"> {{ comment.pubdate | datatime }}</span>
        <van-button
          class="reply-btn"
          type="default"
          round
          size="mini"
          @click="$emit('reply-click', comment)"
          >{{ comment.reply_count }}回复</van-button
        >
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onCommentLike () {
      console.log('like')
      if (this.comment.is_liking) {
        await deleteCommentLike(this.comment.com_id.toString())
        this.comment.like_count--
      } else {
        await addCommentLike(this.comment.com_id.toString())
        this.comment.like_count++
      }
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.comment-item {
  .avatar {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .name {
    color: red;
  }
  .content {
    font-size: 16px;
  }
  .pubdata {
    margin-right: 10px;
  }
  .like-wrap {
    display: flex;
    align-items: center;
  }
}
</style>
