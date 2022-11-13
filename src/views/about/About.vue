<script setup lang='ts'>
import TxtDeformation from '@/uiComponents/txtDeformation/Index.vue'
</script>

<template>
  <div class="about">
    <div class="wave"></div>
    <div class="content">
      <TxtDeformation></TxtDeformation>
      <div class="formInfo">
        <div>lzyszds</div>
        <div>lzyszds</div>
        <div>lzyszds</div>
        <div>lzyszds</div>
      </div>

    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  background-color: var(--themeColor);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.content {
  width: 70rem;
  height: 70rem;
  background-color: rgb(255, 255, 255, .7);
  position: absolute;
  top: 50%;
  right: 0%;
  transform: translate(-30%, -50%);
  backdrop-filter: blur(8px);

  .formInfo>div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 600;
    color: var(--themeColor);
  }
}
</style>
