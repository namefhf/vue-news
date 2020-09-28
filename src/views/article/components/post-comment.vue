<template>
  <div class="post-comment">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button
      type="default"
      size="mini"
      @click="onPost"
      style="width:50px"
      :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    target: {
      type: [Number, String, Object],
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId.toString()
      })
      console.log(data)
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  align-items: center;
  padding: 0 10px;
}
</style>
