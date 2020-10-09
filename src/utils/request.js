import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '../router'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [
    function (data) {
      // 后端返回数据可能不是JSON格式字符串如果不是JSONbig.parse会报错
      try {
        return JSONbig.parse(data)
      } catch (error) {
        console.log('转换失败', error)
      }
      return data
    }
  ]
})
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(config => {
  // console.log(123)
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
request.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const status = error.response.status
    if (status === 400) {
      // 客户端参数错误
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      // token无效
      const { user } = store.state
      if (!user || !user.token) {
        return redirectLogin()
      }
      try {
        // 刷新token
        const { data } = await refreshTokenReq({
          url: '/app/v1_0/authorizations',
          method: 'PUT',
          headers: { Authorization: `Bearer ${user.refresh_token}` }
        })
        console.log(data)
        user.token = data.data.token
        store.commit('setUser', user)
        // 重新发送失败的请求
        console.log(error.config)
        return request(error.config)
      } catch (error) {
        redirectLogin()
      }
    } else if (status === 403) {
      // 无权限
      Toast.fail('无权限操作')
    } else if (status >= 500) {
      // 服务端错误
      Toast.fail('服务端异常')
    }
    return Promise.reject(error)
  }
)
function redirectLogin () {
  router.replace('/login')
}
export default request
