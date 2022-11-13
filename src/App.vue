<template >
  <Suspense>
    <Loadinge></Loadinge>
  </Suspense>
  <router-view> </router-view>
  <div class="w-full relative">
    <!-- <Music></Music> -->
  </div>
  <div class="w-full absolute bottom-20">
    <!-- <Live2d></Live2d> -->
  </div>

</template>
<script setup lang="ts">
// import Music from "./uiComponents/music/Music.vue";
// import { defineAsyncComponent } from 'vue'
import Loadinge from '@/uiComponents/loader/loading.vue'
// const Live2d = defineAsyncComponent(() => import('@/uiComponents/live2d/Live2d.vue'))

import { getCurrentInstance } from 'vue'
import { useStore } from '@/store/index';
const { proxy } = getCurrentInstance() as any;

const { $state: state } = useStore();
state.nowWeatherData = proxy.$common.getIpWeather();
console.log(state.nowWeatherData)
</script>
<style lang="less">

</style>
