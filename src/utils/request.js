import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint'
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
export default request
