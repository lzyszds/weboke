import request from '@/http/request';

//获取诗词
export function getArticleComment(aid) {
  return request({
    method: 'get',
    url: '/comment/getArticleComment',
    params: {
      id: aid
    }
  })
}


//发布评论
export function postRemarkList(data) {
  return request({
    method: 'post',
    url: '/comment/addComment',
    data
  })
}


//获取最新评论
export function getNewComment() {
  return request({
    method: 'get',
    url: '/comment/getNewComment',
    params: {
      limit: 5
    }
  })
}
