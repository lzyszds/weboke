<template>
  <div class="home">
    <div class="content w-screen">
      <div class="titlePage ">
        <div>HEY,KINOKO!</div>
      </div>
      <div class="bg-white"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {

})
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  background: url('@/assets/images/bg.jpg') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

.titlePage {
  @apply flex w-screen h-screen justify-center items-center;
  color: aqua;
  font-size: 12rem;
}
</style>
