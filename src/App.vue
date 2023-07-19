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
import { copyTip, getIpWeather } from '@/utils/common'
// const Live2d = defineAsyncComponent(() => import('@/uiComponents/live2d/Live2d.vue'))
// 获取当前天气
getIpWeather()
//复制提示
copyTip()

</script>
