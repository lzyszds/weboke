<template>
  <div>
    <Suspense>
      <Loadinge></Loadinge>
    </Suspense>
    <router-view> </router-view>
    <div class=" w-full relative">
      <!-- <Music ></Music> -->
    </div>
    <div class="w-full absolute bottom-20">
      <!-- <Live2d></Live2d> -->
    </div>
    <!-- <ContextMenu></ContextMenu> -->
  </div>
</template>
<script setup lang="ts">
// import Music from "./uiComponents/music/Music.vue";
// import { defineAsyncComponent } from 'vue'
// import ContextMenu from './components/ContextMenu.vue';
//懒加载loading
//@ts-ignore
const Loadinge = defineAsyncComponent(() => import('@/uiComponents/loader/loading.vue'))
// import Live2d from '@/uiComponents/live2d/Live2d.vue'
//懒加载看板娘
// const Live2d = defineAsyncComponent(() => import('@/uiComponents/live2d/Live2d.vue'))

</script>
