import request from '@/utils/request'
// 获取文章评论
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 点赞评论或回复
export const addCommentLike = comId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data: {
      target: comId
    }
  })
}
// 取消点赞评论或回复
export const deleteCommentLike = comId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${comId}`
  })
}
// 发布、回复评论
export const addComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
