<script setup>
// import Navleft from "@/components/Navleft.vue";
import Navtop from "@/components/Navtop.vue";
import { onMounted } from "vue-demi";
// import Content from "@/components/Content.vue";
</script>

<template>
  <div>
    <!-- <Content></Content> -->
    <div id="container" class="absolute w-full z-1 ">
      <!-- 中心内容 -->
      <router-view></router-view>
    </div>
    <!-- <Navleft></Navleft> -->
    <Navtop></Navtop>
  </div>
</template>

<style scoped>
.el-tabs__active-bar {
  background-color: #000
}

#container {
  height: calc(100vh - 60px);
  margin-top: 60px;
}
</style>
