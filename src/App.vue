<template >
  <router-view> </router-view>
  <div class="w-full relative">
    <!-- <Music></Music> -->
  </div>
  <div class="w-full absolute bottom-20">
    <!-- <Live2d></Live2d> -->
  </div>
  <Suspense>
    <Loadinge></Loadinge>
  </Suspense>
</template>
<script setup lang="ts">
// import Music from "./uiComponents/music/Music.vue";
import { defineAsyncComponent } from 'vue'
// const Live2d = defineAsyncComponent(() => import('@/uiComponents/live2d/Live2d.vue'))
const Loadinge = defineAsyncComponent(() => import('@/uiComponents/loader/loading.vue'))
</script>
<style>
.compensate-for-scrollbar {
  padding: 0 !important;
}

#app {
  cursor: var(--normalCup)
}

#app a {
  cursor: var(--linkCup)
}

#app input {
  cursor: var(--verticalCup)
}

html,
body {
  scroll-behavior: smooth;
}

html.dark {
  background-color: var(--darkBgcolor)
}

body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgb(245, 245, 245);
  background-color: #F5F5F5;
}

body::-webkit-scrollbar {
  width: 7px;
  background-color: var(--themeColor);
}

body::-webkit-scrollbar-thumb {
  background-color: var(--themeColor);
  border-radius: 20px;
  border: 1px solid rgb(245, 245, 245);
  transition: 1s all;
}

body::-webkit-scrollbar-thumb:hover {
  background-color: rgb(253, 112, 112);
}

#nprogress .bar {
  background: rgb(255, 0, 119) !important;
}

/* 
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .4S;
}

.fade-transform-leave-to,
.fade-transform-enter-from {
  opacity: 0;
  margin-top: -100px;
} */
</style>
