<template >
  <Suspense>
    <Loadinge></Loadinge>
  </Suspense>
  <router-view> </router-view>
  <div class="w-full relative">
    <!-- <Music v-if="false"></Music> -->
  </div>
  <div class="w-full absolute bottom-20">
    <!-- <Live2d></Live2d> -->
  </div>
  <!-- <div class="maskBg" v-if="!state.dark"> </div> -->
</template>
<script setup lang="ts">
// import Music from "./uiComponents/music/Music.vue";
// import { defineAsyncComponent } from 'vue'
import Loadinge from '@/uiComponents/loader/loading.vue'
import { useStore } from '@/store/index';
import { copyTip, getIpWeather } from '@/utils/common'
// const Live2d = defineAsyncComponent(() => import('@/uiComponents/live2d/Live2d.vue'))


const { $state: state } = useStore();
const weather = getIpWeather() as any
weather.then(res => {
  //将个人信息存入localStorage，避免每次刷新都要请求接口
  localStorage.setItem('nowWeatherData', JSON.stringify(res))
})
state.nowWeatherData = weather;

copyTip()

</script>
