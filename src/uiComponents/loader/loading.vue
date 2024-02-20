<script setup lang="ts" >
import { getWeather } from "@/utils/common";
// 高德地图api
watch(() => getWeather(), (newVal, oldVal) => {
  console.log(newVal, oldVal);
})
const img = getWeather()
</script>
<template>
  <div class="loaderbody">
    <img :src="img" alt="">
  </div>
</template>

<style>
body.loading .loaderbody::before {
  transform: translate(-50%, -50%) scale(1.5);
}

.loaderbody::before,
.dark .loaderbody::before {
  top: 50%;
  left: 50%;
  z-index: 100;
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
  background: var(--darkBgcolor);
}

body.loading .loaderbody img {
  opacity: 1;
  visibility: visible;
  z-index: 101;
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
