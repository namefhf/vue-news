<template>
  <div class="my-container">
    <van-cell-group
      v-if="user"
      :border="false"
      style="padding-top: 30px;box-sizing:border-box;"
    >
      <van-cell center :border="false">
        <van-image
          slot="icon"
          width="50"
          height="50"
          round
          fit="cover"
          :src="userInfo.photo"
        />
        <div slot="title" class="nickname">
          {{ userInfo.name }}
        </div>
        <van-button size="small" round>编辑资料</van-button>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item
          ><div slot="text">
            <div class="span">{{ userInfo.art_count }}</div>
            <div class="text">头条</div>
          </div></van-grid-item
        >
        <van-grid-item
          ><div slot="text">
            <div class="span">{{ userInfo.follow_count }}</div>
            <div class="text">关注</div>
          </div></van-grid-item
        >
        <van-grid-item
          ><div slot="text">
            <div class="span">{{ userInfo.fans_count }}</div>
            <div class="text">粉丝</div>
          </div></van-grid-item
        >
        <van-grid-item
          ><div slot="text">
            <div class="span">{{ userInfo.like_count }}</div>
            <div class="text">获赞</div>
          </div></van-grid-item
        >
      </van-grid>
    </van-cell-group>
    <div class="not-login" v-else>
      <van-grid :column-num="1">
        <van-grid-item @click="$router.push('login')">
          <div slot="icon">
            <van-icon name="manager" style="font-size:40px" color="#e10000" />
          </div>
          <span slot="text">点击登录/注册</span>
        </van-grid-item>
      </van-grid>
    </div>
    <van-grid :column-num="2" :border="false">
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="browsing-history-o" text="历史" />
    </van-grid>
    <van-cell title="消息" is-link to="" />
    <van-cell title="小智同学" is-link to="" />
    <van-cell
      v-if="user"
      :border="false"
      title="退出登录"
      style="text-align:center;color: #e10000"
      @click="logout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      console.log(data)
      this.userInfo = data.data
    },
    logout () {
      this.$dialog
        .confirm({
          title: '确认退出登录?'
        })
        .then(() => {
          this.$store.commit('setUser', null)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scope>
.my-container {
  .nickname {
    margin-left: 10px;
  }
  .van-grid-item__content {
    .span {
      font-size: 18px;
      text-align: center;
    }
    .text {
      font-size: 12px;
      text-align: center;
    }
  }
}
</style>
