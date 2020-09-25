import request from '@/utils/request'
// 获取联想建议
export const getSearchSuggestions = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params
  })
}
// 获取搜索结果
export const getSeachResults = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params
  })
}
// 获取用户搜索历史
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
// 删除所有搜索历史
export const deleteAllHistories = () => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}
