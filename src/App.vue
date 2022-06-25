<template >
  <div class="w-screen h-screen relative bg-white overflow-x-hidden">
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
