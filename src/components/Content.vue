<template>
  <div id="container" class="container absolute w-full h-screen top-28 z-1  ">
    <div class="bg-white h-screen shadow-xl w-96 float-left "></div>
    <!-- 中心内容 -->
    <div class=" bg-#F1F3F4 h-screen w-content float-left">
        <router-view />
    </div>
    <!-- 右边内容 -->
    <div class=" bg-white h-screen p-6  w-96 float-left">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane>
          <template #label class="flex-1">
            <div class="w-16 mt-2">
                <img src="../assets/icon/fabulous.png" width="23" class="m-auto" alt="">
            </div>
          </template>
          <h4 class="text-2xl">热门文章</h4>
          
        </el-tab-pane>
        <el-tab-pane>
          <template #label class="flex-1">
            <div class="w-16  mt-3">
                <img src="../assets/icon/comments.png" width="20" class="m-auto" alt="">
            </div>
          </template>
          <h4 class="text-2xl">最新评论</h4>
        </el-tab-pane>
        <el-tab-pane>
          <template #label class="flex-1">
            <div class="w-16  mt-2">
                <img src="../assets/icon/album.png" width="23" class="m-auto" alt="">
            </div>
          </template>
          <h4 class="text-2xl">随机文章</h4>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
<style>
.el-tabs__active-bar{
    background-color: #000
}
</style>
