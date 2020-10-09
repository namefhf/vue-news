import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
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
  error => {
    const status = error.response.status
    if (status === 400) {
      // 客户端参数错误
      Toast.fail('客户端请求参数异常')
    } else if (status === 401) {
      // token无效
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
export default request
