<template>
  <div>
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :comment="item"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  name: 'CommentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      list: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  components: {
    CommentItem
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      // 获取评论(文章id139987有评论数据)
      const { data } = await getComments({
        type: this.type,
        source: this.source,
        offset: this.offset,
        limit: this.limit
      })
      console.log(data)
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
      this.$emit('update-total-count', data.data.total_count)
    }
  }
}
</script>

<style lang="less" scoped></style>
