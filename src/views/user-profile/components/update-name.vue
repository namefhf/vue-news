<template>
  <div class="update-name">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      class="app-nav-bar"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <div style="padding:10px">
      <van-field
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.name
    }
  },
  methods: {
    async onConfirm () {
      const { data } = await editUserProfile({ name: this.localName })
      console.log(data)
      this.$emit('update-name', this.localName)
    }
  }
}
</script>

<style lang="less" scoped>
.app-nav-bar {
  /deep/.van-nav-bar__text {
    color: #fff;
  }
}
</style>
