<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestions"
      :key="index"
      @click="sendSearchText(item)"
    >
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
// const fn = _.debounce(() => {
//   console.log(1)
// }, 2000)
// fn()
export default {
  name: 'searchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  methods: {
    // 高亮搜索词
    highlight (str) {
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color:red">${this.searchText}</span>`
      )
    },
    sendSearchText (item) {
      this.$emit('updateSearchText', item)
    }
  },
  watch: {
    // searchText(newValue, oldValue) {
    //   console.log(1)
    // }
    searchText: {
      // lodash实现函数防抖
      handler: debounce(async function () {
        console.log('hello')
        const { data } = await getSearchSuggestions({
          q: this.searchText
        })
        console.log('data: ', data)
        this.suggestions = data.data.options
      }, 1000),
      // async handler() {
      //   console.log('hello')
      //   const data = await getSearchSuggestions(this.searchText)
      //   console.log('data: ', data)
      //   this.suggestions = data.data.optios
      // },
      immediate: true // 立即触发 不需要等组件挂载
    }
  }
}
</script>

<style lang="less" scoped></style>
