<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      require: true
    }
  },
  computed: {},
  data () {
    return {
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2021, 10, 1),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')
      console.log('date: ', date)
      await editUserProfile({
        birthday: date
      })
      this.$emit('input', date)
    }
  }
}
</script>

<style lang="less" scoped></style>
