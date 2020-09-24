<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in searchResults"
        :title="item.title"
        :key="item.art_id"
      />
    </van-list>
  </div>
</template>

<script>
import { getSeachResults } from '@/api/search'
export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      searchResults: [],
      page: 1, // 页码
      per_page: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      const data = await getSeachResults({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      console.log(data)
      const { results } = data.data.data
      this.searchResults.push(...results)
      this.loading = false
      if (results.length) {
        // 如果还有数据
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-result {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  overflow-y: auto;
}
</style>
