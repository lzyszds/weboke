<template>
  <div class="container w-108 h-screen fixed top-28 ">
    <div class="bg-white h-full w-full relative">
      <!-- 头像 -->
      <div class="pb-10">
        <p class="w-full pt-11">
          <img :src="navData.headP" class="w-40 h-40 m-auto rounded-full shadow-image" alt="" />
        </p>
        <p class="w-full h-10 text-center text-2xl hover:text-gray-400 cursor-pointer">
          lzy
        </p>
        <p class="w-full h-10 text-center text-1xl text-gray-700">不知道说什么好！</p>
      </div>
      <!-- 导航 -->
      <div class=" mb-8">
        <div class="text-2xl w-full p-2">导航</div>
        <ul class="text-2xl font-normal ">
          <router-link tag="li" v-for="(item, index) in navData.Navigation" :key="index" :to="item.url" class="flex text-gray-700 hover:bg-gray-200 py-4 transition-all cursor-pointer">
            <img :src="item.src" class="mr-7 ml-10" width="24" />
            <span>{{ item.name }}</span>
          </router-link>
        </ul>
      </div>
      <!-- 组成 -->
      <div class=" mb-8">
        <div class="text-2xl w-full p-2 ">组成</div>
        <ul class="text-2xl font-normal">
          <router-link tag="li" v-for="(item, index) in navData.form" :key="index" :to="item.url" class="flex text-gray-700 hover:bg-gray-200 py-4 transition-all cursor-pointer">
            <img :src="item.src" class="mr-7 ml-10" width="24" />
            <span>{{ item.name }}</span>
          </router-link>
        </ul>
      </div>
      <!-- 底部导航 -->
      <div class="fixed bottom-0 flex flex-nowrap w-108 p-1 text-xs my-2 shadow-top ">
        <el-tooltip class="item p-0 flex-1 text-center cursor-pointer" effect="dark" content="后台管理" placement="top">
          <el-button class=" border-0">
            <img width="15" class="m-auto py-2" src="../assets/icon/setup.png" alt="" />
            <p>管理</p>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item p-0 flex-1 text-center cursor-pointer" effect="dark" content="管理文章" placement="top">
          <el-button class=" border-0">
            <img width="10" class="m-auto py-2" src="../assets/icon/signal.png" alt="" />
            <p>文章</p>
          </el-button>
        </el-tooltip>
        <el-tooltip class="item p-0 flex-1 text-center cursor-pointer" effect="dark" content="管理评论" placement="top">
          <el-button class=" border-0">
            <img width="15" class="m-auto py-2" src="../assets/icon/CommentsY.png" alt="" />
            <p>评论</p>
          </el-button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from "../http/http.js";
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
        navData.headP = res.data.headportrait;
        navData.Navigation = res.data.Navigation;
        navData.form = res.data.form;
      });
    });
    return { navData };
  },
});
</script>
