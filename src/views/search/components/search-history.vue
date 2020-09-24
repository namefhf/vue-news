<template>
  <div class="search-history">
    <van-cell title="搜索历史" value="内容">
      <div v-if="isDelete">
        <span>全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDelete = !isDelete" />
    </van-cell>
    <van-cell title="hello">
      <van-icon name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  data () {
    return {
      isDelete: false
    }
  }
}
</script>

<style lang="less" scoped></style>
