<script setup lang='ts'>
import { useEventListener } from '@vueuse/core';
const barDet = reactive({
  thumb: {
    y: 0,
    height: 200,
  }
})

const dragEvent = (event) => {
  console.log('拖动中:', event);
}
const dragEndEvent = (event) => {
  console.log('拖动结束:', event);
}
const dragStartEvent = (event) => {
  console.log('拖动开始:', event);
}

//滚动条
useEventListener(window, 'scroll', (event) => {
  console.log(window.scrollY);
})
</script>

<template>
  <div class="scrollbar">
    <div class="force-overflow"></div>
    <div class="scrollbar-track-y">
      <!-- 拖拽事件 -->
      <div class="scrollbar-thumb-y" :style="{ top: barDet.thumb.y + 'px', height: barDet.thumb.height + 'px' }"
        draggable="true" @drag="dragEvent" @dragend="dragEndEvent" @dragstart="dragStartEvent"></div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.scrollbar {
  width: 10px;
  height: 100vh;
  background-color: #1E1E1E;
  position: fixed;
  right: 0;
  top: 0;

  .force-overflow {}

  .scrollbar-track-y {
    width: 100%;
    height: 100%;

    .scrollbar-thumb-y {
      width: 80%;
      height: 50%;
      background: var(--themeColor);
      margin: 0 auto
    }
  }
}
</style>
