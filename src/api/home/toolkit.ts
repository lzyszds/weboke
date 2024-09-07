import request from '@/http/request';

//获取诗词
export function getPoetry() {
  return request({
    url: '/toolkit/getPoetry',
    method: 'get'
  });
}

//获取天气
export function getWeatherApi() {
  return request({
    url: '/toolkit/getWeather',
    method: 'get'
  });
}
