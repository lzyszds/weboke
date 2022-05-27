<template >
  <div class="container w-10/12 relative bg-gray-200 m-auto shadow-xl">
    <Content></Content>
    <Navleft></Navleft>
    <Navtop></Navtop>
  </div>
</template>
<script setup>
import Navleft from "./components/Navleft.vue";
import Navtop from "./components/Navtop.vue";
import Content from "./components/Content.vue";
</script>
