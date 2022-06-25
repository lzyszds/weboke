<script setup>
// import Navleft from "@/components/Navleft.vue";
import Navtop from "@/components/Navtop.vue";
// import Content from "@/components/Content.vue";
</script>

<template>
  <!-- <Content></Content> -->
  <div id="container" class="absolute w-full h-screen top-28 z-1  ">
    <!-- 中心内容 -->
    <div class=" bg-#F1F3F4 h-full w-full float-left">
      <router-view></router-view>
    </div>
  </div>
  <!-- <Navleft></Navleft> -->
  <Navtop></Navtop>
</template>

<style scoped>
.el-tabs__active-bar {
  background-color: #000
}
</style>
