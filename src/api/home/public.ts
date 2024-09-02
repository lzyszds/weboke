import request from '@/http/request';

//获取诗词
export function getPoetry() {
  return request({
    url: '/toolkit/getPoetry',
    method: 'get'
  });
}
