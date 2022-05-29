<template>
  <div
    class="h-24 bg-pink-400 fixed z-50 bottom-0 left-0 flex transition-all"
    :class="data.width"
  >
    <!-- 图片 -->
    <div class="w-32 h-full bg-yellow-100"></div>
    <!-- 切歌歌词快进 -->
    <div class=""></div>

    <!-- 隐式开关 100  -->
    <div
      class="w-8 h-full bg-gray-300 flex items-center absolute right-0"
      @click="click"
      @mouseout="mouseout"
    >
      <img
        width="30"
        src="../assets/icon/rightmsk.png"
        style="transition-all"
        :class="{ 'transform rotate-180': data.index }"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
export default defineComponent({
  name: "music",
  setup() {
    let data = reactive({
      width: "w-8",
      index: false,
    });
    const w_425px = "w-425px",
      w_100px = "w-100px",
      w_8 = "w-8";
    const mouseout = (e) => {
      if (data.width != "w-8") return;
      data.width = w_100px;
    };
    const mouseleave = (e) => {
      data.width = w_8;
    };
    const click = (e) => {
      data.index = !data.index;
      data.width = data.index ? w_425px : w_100px;
    };
    return {
      mouseout,
      mouseleave,
      click,
      data,
    };
  },
});
</script>

<style>
</style>
