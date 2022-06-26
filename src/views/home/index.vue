<script setup>
// import Navleft from "@/components/Navleft.vue";
import Navtop from "@/components/Navtop.vue";
import { onMounted } from "vue-demi";
// import Content from "@/components/Content.vue";
</script>

<template>
  <!-- <Content></Content> -->
  <div id="container" class="absolute w-full h-auto z-1 ">
    <!-- 中心内容 -->
    <router-view></router-view>
  </div>
  <!-- <Navleft></Navleft> -->
  <Navtop></Navtop>
</template>

<style scoped>
.el-tabs__active-bar {
  background-color: #000
}
</style>
