<template>
  <div class="container w-96 h-screen fixed top-28">
    <div class="bg-white h-full w-full relative">
      <!-- 头像 -->
      <div class="pb-10 headIcon">
        <p class="w-full pt-11">
          <img :src="navData.headP" class="w-40 h-40 m-auto rounded-full shadow-image" alt="" />
        </p>
        <p class="
            w-full
            h-10
            text-center text-2xl
            hover:text-gray-400
            cursor-pointer
          ">
          lzy
        </p>
        <p class="w-full h-10 text-center text-1xl text-gray-400">
          不知道说什么好！
        </p>
      </div>
      <!-- 导航 -->
      <div class="mb-8">
        <div class="text-xl w-full p-2 text-theme font-semibold">导航</div>
        <ul class="text-xl font-normal">
          <router-link tag="li" v-for="(item, index) in navData.Navigation" :key="index" :to="item.url" class="
              flex
              items-center
              text-theme
              hover:bg-gray-200
              transition-all
              cursor-pointer
              h-16
            ">
            <div class="mr-7 ml-10 w-8 h-8 images" :style="{ 'background-position': `${item.x}px ${item.y}px` }"></div>
            <span>{{ item.name }}</span>
          </router-link>
        </ul>
      </div>
      <!-- 组成 -->
      <div class="mb-8">
        <div class="text-xl w-full p-2 text-theme font-semibold">组成</div>
        <ul class="text-xl font-normal">
          <router-link tag="li" v-for="(item, index) in navData.form" :key="index" :to="item.url" class="
              flex
              items-center
              text-theme
              hover:bg-gray-200
              transition-all
              cursor-pointer
              h-16
            ">
            <div class="mr-7 ml-10 w-8 h-8 images" :style="{ 'background-position': `${item.x}px ${item.y}px` }"></div>
            <span>{{ item.name }}</span>
          </router-link>
        </ul>
      </div>
      <!-- 底部导航 -->
      <div class="fixed bottom-0 flex flex-nowrap w-96 p-1 text-xs my-2 shadow-top">
        <el-tooltip class="item p-0 flex-1 text-center cursor-pointer" effect="dark" content="后台管理" placement="top">
          <div class="border-0">
            <div class="m-auto my-2 w-8 h-8 py-2 images" style="background-position: -25px 0"></div>
            <p>管理</p>
          </div>
        </el-tooltip>
        <el-tooltip class="item p-0 flex-1 text-center cursor-pointer" effect="dark" content="管理文章" placement="top">
          <div class="border-0">
            <div class="m-auto my-2 w-8 h-8 py-2 images" style="background-position: -0 0"></div>
            <p>文章</p>
          </div>
        </el-tooltip>
        <el-tooltip class="item p-0 flex-1 text-center cursor-pointer" effect="dark" content="管理评论" placement="top">
          <div class="border-0">
            <div class="m-auto my-2 w-8 h-8 py-2 images" style="background-position: -0 -50px"></div>

            <p>评论</p>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from "@/http/http";
import { defineComponent, reactive, onMounted } from "vue";
export default defineComponent({
  setup() {
    const navData = reactive({
      headP: null, //头像
      Navigation: [], //导航
      form: [], //组成
    });
    onMounted(() => {
      get("./data/navData.json").then((res) => {
        navData.headP = res.headportrait;
        navData.Navigation = res.Navigation;
        navData.form = res.form;
      });
    });
    return { navData };
  },
});
</script>
<style scoped>
.headIcon {
  font-family: "douyu";
}

.images {
  background: url(@/assets/icon/css_sprites.png) no-repeat center;
  background-size: 350%;
}
</style>
