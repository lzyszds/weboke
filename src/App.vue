<template>
  <div>
    <Suspense>
      <Loadinge></Loadinge>
    </Suspense>
    <div v-if="isLoaded">
      <router-view> </router-view>
      <div class=" w-full relative">
        <!-- <Music ></Music> -->
      </div>
      <div class="w-full absolute bottom-20">
        <!-- <Live2d></Live2d> -->
      </div>
      <!-- <ContextMenu></ContextMenu> -->

    </div>
  </div>
</template>
<script setup lang="ts">
import { getSystemConfig } from '@/api/system';
import { observeClassChange } from '@/utils/common'

const isLoaded = ref(false)

// import Music from "./uiComponents/music/Music.vue";
// import { defineAsyncComponent } from 'vue'
// import ContextMenu from './components/ContextMenu.vue';
//懒加载loading
//@ts-ignore
const Loadinge = defineAsyncComponent(() => import('@/uiComponents/loader/loading.vue'))

// 监听body的class，当class为loading的时候，显示loading组件
observeClassChange(document.body, (target) => {
  if (!target.classList.contains('loading')) {
    isLoaded.value = true
  }
})

// import Live2d from '@/uiComponents/live2d/Live2d.vue'
//懒加载看板娘
// const Live2d = defineAsyncComponent(() => import('@/uiComponents/live2d/Live2d.vue'))
const webokeTitle = useTitle('Jz 恰沐春风共同游，终只叹，木已舟')
//获取系统配置
getSystemConfig().then((data: any) => {
  webokeTitle.value = data.filter((item: any) => item.config_key === "weboke_page_title")[0].config_value
})



</script>

<style>
@import url('./assets/css/animation.css');
@import url('./assets/css/animate.min.css');
</style>
