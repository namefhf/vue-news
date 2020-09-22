<template>
  <div class="login-container">
    <van-nav-bar
      left-arrow
      title="登录/注册"
      class="app-nav-bar"
      @click-left="$router.back()"
    />
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      :validate-first="true"
      ref="loginForm"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="输入手机号"
        name="mobile"
        clearable
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        center
        clearable
        name="code"
        icon-prefix="toutiao"
        left-icon="yanzhengma "
        placeholder="请输入短信验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            @finish="isCountDownShow = fasle"
            :time="1000 * 60"
            format="ss s"
          />
          <van-button
            v-else
            size="small"
            round
            @click.prevent="send"
            :loading="issendsmsloading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="padding:16px 16px;">
        <van-button block>登录</van-button>
      </div>
    </van-form>
    <p style="text-align:center;color:#ccc;margin-top:5px; font-size:14px">
      注:未注册用户登录成功将自动注册
    </p>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13922222222',
        code: '246810'
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false,
      issendsmsloading: false
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await login(this.user)
        console.log(data)
        Toast.success('登录成功')
        // 将token存到vuex中
        this.$store.commit('setUser', data.data)
        this.$router.push('my')
      } catch (error) {
        console.log(error)
        Toast.fail('登录失败')
      }
    },
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: top
        })
      }
    },
    async send () {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        // 验证通过
        this.issendsmsloading = true
        const res = await sendSms(this.user.mobile)
        console.log(res)
        this.isCountDownShow = true
      } catch (error) {
        this.$toast({
          message: error.message,
          position: top
        })
      }
      this.issendsmsloading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  background-color: #e10000;
  color: white;
}
</style>
