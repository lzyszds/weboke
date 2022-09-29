<template >
  <div class="srcoll_five w-screen h-screen relative bg-white overflow-x-hidden">
    <router-view></router-view>
    <div class="w-full relative">
      <Music></Music>
    </div>
    <div class="w-full absolute bottom-20">
      <Live2d></Live2d>
    </div>
  </div>
</template>
<script setup>
import Music from "./uiComponents/music/Music.vue";
import Live2d from "./uiComponents/live2d/Live2d.vue"; 
</script>
<style>
.srcoll_five::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #F5F5F5;
}

.srcoll_five::-webkit-scrollbar {
  width: 6px;
  background-color: rgba(0, 0, 0, 0);
}

.srcoll_five::-webkit-scrollbar-thumb {
  background-color: #999;
  border-radius: 10px;
}

#nprogress .bar {
  background: rgb(255, 0, 119) !important;
}
</style>
