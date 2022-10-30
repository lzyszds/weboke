<script setup lang='ts'>
import TxtDeformation from '@/uiComponents/txtDeformation/Index.vue'
import { ref } from 'vue'
const antion = ref(false)
setTimeout(() => {
  antion.value = true
}, 2000)
</script>

<template>
  <div class="about">
    <div class="round" :class="{ antion: 'antion' }">
      <img class="round-texture" src="@/assets/image/the-blowup-r5xQXs5a7Tk-unsplash.jpg" />
    </div>
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
  position: relative;
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

.round-texture {
  width: 120rem;
  height: 120rem;
  border-radius: 50%;
  position: absolute;
  top: 0;
  mix-blend-mode: difference;
}

.antion {
  animation: round 3s 1 linear;
}

@keyframes round {
  0% {
    transform: translate(-50%, 100%) scale(.3);
  }

  100% {
    transform: translate(-50%, -10%) scale(1);
  }
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
