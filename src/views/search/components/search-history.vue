<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelete">
        <span @click="deleteAll">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDelete = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDelete = !isDelete" />
    </van-cell>
    <van-cell v-for="(item, index) in searchHistories" :key="index">
      <div slot="title" @click="$emit('updatesearchtext', item)">
        {{ item }}
      </div>
      <van-icon name="close" v-show="isDelete" @click="deleteHistory(index)" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { deleteAllHistories } from '@/api/search'
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array
    }
  },
  data () {
    return {
      isDelete: false
    }
  },
  created () {
    // console.log(this.searchHistories)
  },
  methods: {
    deleteHistory (index) {
      console.log(index)
      this.searchHistories.splice(index, 1)
      // 数据持久化
      setItem('search-histories', this.searchHistories)
    },
    async deleteAll () {
      const data = await deleteAllHistories()
      console.log(data)
      // this.searchHistories = []
      this.$emit('update-histories', [])
      setItem('search-histories', [])
    }
  }
}
</script>

<style lang="less" scoped></style>
