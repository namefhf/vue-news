<template>
  <div class="channel-edit">
    <van-cell center :border="false">
      <div slot="title">
        我的频道
      </div>
      <van-button
        slot="default"
        round
        size="small"
        @click="isEdit = !isEdit"
        type="danger"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ active: activeIndex === index }"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        v-for="(item, index) in userChannels"
        :key="item.id"
        :text="item.name"
        @click="onUserChannelClick(index)"
      >
      </van-grid-item>
    </van-grid>
    <van-cell center :border="false">
      <div slot="title">
        频道推荐
      </div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="onAdd(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false
    }
  },
  mounted () {},
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      //   console.log('data: ', data)
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      console.log('channel: ', channel)
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      // 编辑状态 删除频道
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index)
      } else {
        // 非编辑状态 切换频道
        this.switchChannel(index)
      }
    },
    // 删除频道
    deleteChannel (index) {
      //   console.log('删除')
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.activeIndex) {
        // 更新激活频道索引
        this.$emit('update-active', this.activeIndex - 1)
      }
      this.userChannels.splice(index, 1)
    },
    // 切换频道
    switchChannel (index) {
      //   console.log('切换', index)
      // 传递事件 关闭popup
      this.$emit('close')
      // 向父组建传递事件来更新tab的activeindex
      this.$emit('update-active', index)
    }
  },
  computed: {
    // 推荐频道列表
    recommendChannels () {
      // 所有频道减去我的频道
      return this.allChannels.filter(channel => {
        return !this.userChannels.find(userChannel => {
          return userChannel.id === channel.id
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.grid-item {
  height: 50px;
  /deep/.van-grid-item__content {
    background-color: #eee;
    position: relative;
    .van-grid-item__text {
      margin-top: unset;
    }
  }
  /deep/&.active .van-grid-item__text {
    color: red;
  }
  /deep/.van-icon {
    font-size: 14px;
    position: absolute;
    top: -5px;
    right: -7px;
    color: #ccc;
  }
}
</style>
