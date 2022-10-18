<script setup lang='ts'>
import TxtDeformation from '@/uiComponents/txtDeformation/Index.vue'
</script>

<template>
  <div class="about">
    <div class="round"></div>
    <div class="wave"></div>
    <div class="content">
      <TxtDeformation></TxtDeformation>
    </div>
  </div>
</template>

<style scoped>
.about {
  background-color: var(--themeColor);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.round {
  width: 120rem;
  height: 120rem;
  background-color: #f9d6a3;
  box-shadow: 0px 1px 10px #f9d6a3;
  border-radius: 50%;
  transform: translate(-50%, -10%);
  /* background: linear-gradient(90deg, #f9d6a3, rgb(244, 244, 244, .0) 10%, #f9d6a3 70%, #f9d6a3 100%); */
}

.wave1 {
  width: 100vw;
  height: 38rem;
  position: fixed;
  bottom: 0px;
  left: 0;
  background: url(/src/assets/image/wave.svg) repeat-x;
  overflow: hidden;
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

}
</style>
