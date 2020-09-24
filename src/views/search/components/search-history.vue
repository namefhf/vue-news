<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDelete">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDelete = !isDelete" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :title="item"
      :key="index"
    >
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistories: {
      type: Array
    }
  },
  created () {
    console.log(this.searchHistories)
  },
  data () {
    return {
      isDelete: false
    }
  }
}
</script>

<style lang="less" scoped></style>
