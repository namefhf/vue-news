<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#e10000"
        @search="onSearch"
        @cancel="$router.back()"
        @focus="isResultShow = false"
        @input="getSearchResult"
      />
    </form>
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" />
    <!-- 搜索建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" />
    <!-- 搜索历史 -->
    <search-history v-else />
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
export default {
  name: 'searchIndex',
  components: {
    searchSuggestion,
    searchHistory,
    searchResult
  },
  data () {
    return {
      searchText: '',
      isResultShow: false // 控制搜索结果
    }
  },
  methods: {
    onSearch () {
      console.log('search')
      this.isResultShow = true
    },
    getSearchResult () {}
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search {
    .van-search__action:active {
      background-color: transparent;
    }
  }
}
</style>
