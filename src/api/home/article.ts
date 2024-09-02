import request from '@/http/request';

// 获取文章列表
export function getArticleList(pages: number, limit: number) {
  return request({
    method: 'get',
    url: "/article/getArticleList",
    params: {
      pages: pages,
      limit: limit,
      search: ''
    },
  })
}


// 获取文章详情
export async function getArticleDetail(id: number) {
  return await request({
    method: 'get',
    url: '/article/getArticleDetail',
    params: {
      id: id
    }
  })
}
