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
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- 搜索建议 -->
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @updateSearchText="searchText = $event"
    />
    <!-- 搜索历史 -->
    <search-history
      v-else
      :searchHistories="searchHistories"
      @updatesearchtext="searchText = $event"
      @update-histories="searchHistories = $event"
    />
  </div>
</template>

<script>
import searchSuggestion from './components/search-suggestion'
import searchHistory from './components/search-history'
import searchResult from './components/search-result'
import { getItem, setItem } from '@/utils/storage'
import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
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
      isResultShow: false, // 控制搜索结果
      searchHistories: []
    }
  },
  created () {
    this.loadSearchHistories()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch () {
      console.log('search')
      // 数组不放重复项
      if (this.searchHistories.indexOf(this.searchText) === -1) {
        // 如果数组中没有searchText则unshift
        this.searchHistories.unshift(this.searchText)
      }
      // 搜索历史数据持久化 接口已完成登录时历史记录存储到线上
      setItem('search-histories', this.searchHistories)
      this.isResultShow = true
    },
    getSearchResult () {},
    // 获取线上历史搜索记录
    async loadSearchHistories () {
      // 获取本地数据
      const localHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getSearchHistories()
        const onLineHistories = data.data.keywords
        this.searchHistories.push(
          ...new Set([...onLineHistories, ...localHistories])
        )
        console.log(this.searchHistories)
      }
    }
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
