<script setup lang="ts" >
import img from '@/assets/icon/weather/import'
import { ref, getCurrentInstance } from 'vue';
import { useDateFormat } from '@vueuse/core'

import http from '@/http/http'
const data = ref<any>([])
const { proxy } = getCurrentInstance() as any
const { cid, } = proxy.$getip || ''
//{cip: '116.10.168.123', cid: '450000', cname: '广西壮族自治区'}
// 高德地图api
const key = '78182b9b39355dc0ae4ce91dae7f0bbf	'
data.value = await http('get', `/mapApi/weather/weatherInfo?key=${key}&city=${cid}`)
function getWeather() {
  /* 
    避免当前使用的ip为国外ip 导致的获取不到ip 
    sougou的查询ip方法不支持国外ip
  */
  if (!proxy.$getip) {
    console.warn('当前网络环境不支持获取天气信息(把梯子关了才行)')
    return `/src/assets/icon/weather/undefind.svg`
  }
  const { weather, reporttime } = data.value.lives[0]
  const formatted: any = useDateFormat(reporttime, 'HH')
  const isdark = formatted >= 19 || formatted <= 6
  console.log(`lzy ~ isdark`, weather)
  switch (weather) {
    case '晴':
      return isdark ? img.NightSunny : img.Sunny
    case '多云': case '少云':
      return isdark ? img.NightCloudy : img.NightCloudy
    case '晴间多云':
      return isdark ? img.NightLessCloudy : img.Cloudy
    case '阴':
      return img.CloudyDay
    case '阵雨':
      return img.Shower
    case '雷阵雨':
      return img.ThundershowersSunny
    case '雨夹雪':
      return img.SleetRain
    case '小雨': case '小雨-中雨': case '中雨': case '中雨-大雨':
      return img.Rain
    case '暴雨':
      return img.HeavyRain
    case '霾': case '中度霾': case '重度霾': case '严重霾': case '雾': case '浓雾': case '强浓雾': case '轻雾': case '大雾':
      return img.Foggy
    case '浮尘': case '强沙尘暴':
      return img.Dust
    case '冻雨':
      return img.Sleet
    case '雪':
      return img.Snow
    case '暴雪':
      return img.Snowstorm
    case '大雪':
      return img.HeavySnow
    case '扬沙':
      return img.Sand
    case '沙尘暴':
      return img.Sandstorm
    case '龙卷风':
      return img.Tornado
    case '有风': case '微风': case '和风': case '清风': case '强风/劲风': case '疾风': case '大风': case '烈风': case '风暴': case '狂爆风': case '飓风': case '热带风暴':
      return img.Wind
    default:
      return `/src/assets/icon/weather/undefind.svg`
  }
}
</script>
<template>
  <div class="loaderbody">
    <img :src="getWeather()" alt="">
  </div>
</template>

<style>
body.loading .loaderbody::before {
  transform: translate(-50%, -50%) scale(1.5);
}

.loaderbody::before {
  top: 50%;
  left: 50%;
  z-index: 2;
  content: "";
  width: 100vmax;
  height: 100vmax;
  position: fixed;
  border-radius: 50%;
  background: var(--themeColor);
  transition: transform .5s cubic-bezier(0, 0, .5, 1.25);
  transform: translate(-50%, -50%) scale(0);
}

.dark .loaderbody::before {
  top: 50%;
  left: 50%;
  z-index: 2;
  content: "";
  width: 100vmax;
  height: 100vmax;
  position: fixed;
  border-radius: 50%;
  background: var(--darkBgcolor);
  transition: transform .5s cubic-bezier(0, 0, .5, 1.25);
  transform: translate(-50%, -50%) scale(0);
}

body.loading .loaderbody img {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, -50%) scale(1);
}

.loaderbody {
  overflow: hidden;
}

.loaderbody img {
  top: 50%;
  left: 50%;
  opacity: 0;
  z-index: 3;
  height: 40em;
  color: #fff;
  position: fixed;
  visibility: hidden;
  transform: translate(-50%, -50%) scale(0);
  transition: opacity .3s, transform .5s cubic-bezier(.5, 0, .5, 1.5), visibility .3s;
}
</style>
