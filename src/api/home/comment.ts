import request from '@/http/request';

//获取诗词
export function getArticleComment(aid) {
  return request({
    method: 'get',
    url: '/api/comment/getArticleComment',
    params: {
      id: aid
    }
  })
}


//发布评论
export function postRemarkList(data) {
  return request({
    method: 'post',
    url: '/api/comment/addComment',
    data
  })
}
