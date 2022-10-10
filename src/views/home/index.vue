<script setup>
// import Navleft from "@/components/Navleft.vue";
import Navtop from "@/components/Navtop.vue";
import { onMounted } from "vue";
// import Content from "@/components/Content.vue";
</script>

<template>
  <div>
    <!-- <Content></Content> -->
    <div id="container">
      <!-- 中心内容 -->
      <router-view class="router-view" v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
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
  margin-top: 60px;
}

.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
  overflow: hidden;
}

.fade-enter {
  opacity: 0;
  transform: translateY(-200px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-200px);
}
</style>
