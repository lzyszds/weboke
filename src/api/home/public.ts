import request from '@/http/request';

//获取诗词
export function getPoetry() {
  return request({
    url: '/api/common/getPoetry',
    method: 'get'
  });
}
