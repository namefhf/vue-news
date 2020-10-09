<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateaGender',
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      //   console.log(index)
      const { data } = await editUserProfile({ gender: index })
      console.log(data)
      this.$emit('update-gender', index)
    }
  }
}
</script>

<style lang="less" scoped></style>
