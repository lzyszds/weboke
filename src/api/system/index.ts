import request from '@/http/request';

// 获取系统信息
export function getSystemConfig() {
  return request({
    method: 'get',
    url: "/system/getSystemConfig",
    params: {
      type: "reception"
    },
  })
}

//获取页脚信息
export function getFooterInfo() {
  return request({
    method: 'get',
    url: "/system/getFooterInfo",
  })
}


