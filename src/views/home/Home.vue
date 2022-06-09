<template>
  <div class="home">
    <ContentHead></ContentHead>
    <div class="p-9">
      <div class="mb-12">
        <lzyButton
          v-for="item in reactData.forData"
          :key="item.index"
          @click="mapHandle(item.index)"
          :class="reactData.index == item.index ? 'bg-blue-400' : null"
          >{{ item.title }}</lzyButton
        >
      </div>
      <div class="wrapper">
        <!-- <Yiqcom :reactData="reactData"></Yiqcom> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, reactive } from "vue";
import ContentHead from "../../components/Content-head.vue";
// import Yiqcom from "./Yiqcom.vue";
import { get } from "@/http/http";
import { show, hide } from "@/untils/loading.js";
import lzyButton from "@/uiComponents/Button.vue";
import _ from "lodash";
//使用异步组件的方式来加载疫情地图组件
// const Yiqcom = defineAsyncComponent(() =>
//   import("../../components/Yiqcom.vue")
// );
let reactData = reactive({
  title: "现有确证",
  cityData: [],
  index: 1,
  count: 0,
  forData: [
    {
      title: "现有确诊",
      index: 1,
    },
    {
      title: "累计确诊",
      index: 2,
    },
    {
      title: "新增确诊",
      index: 3,
    },
    {
      title: "累计治疗",
      index: 4,
    },
    {
      title: "累计死亡",
      index: 5,
    },
    {
      title: "疫情趋势",
      index: 6,
    },
  ],
});

//现有确诊数据判断
const mapHandle = (_index) => {
  if (reactData.index == _index && reactData.count != 0) return;
  if (!_index) _index = 1;
  reactData.index = _index;
  reactData.cityData = [];
  show(".wrapper");
  get("/api").then((res) => {
    const data = res.data.data;
    let arr = [];
    let situationData = null;
    data.areaTree.forEach((item) => {
      if (item.name == "中国") {
        situationData = item;
      }
    });
    situationData.children.forEach((res) => {
      let existing;
      switch (_index) {
        case 1:
          reactData.title = "现有确诊";
          // 总数减死亡与治疗
          existing = res.total.confirm - res.total.dead - res.total.heal;
          break;
        case 2:
          reactData.title = "累计确诊";
          existing = res.total.confirm;
          break;
        case 3:
          reactData.title = "新增确诊";
          existing = res.today.confirm;
          break;
        case 4:
          reactData.title = "累计治疗";
          existing = res.total.heal;
          break;
        case 5:
          reactData.title = "累计死亡";
          existing = res.total.dead;
          break;
        case 6:
          reactData.title = "疫情趋势";
          existing = data.chinaDayList;
          if (reactData.cityData.length == 0) {
            reactData.cityData.push(...existing);
          }
          return;
      }
      arr.push({ name: res.name, value: existing });
    });
    reactData.cityData.push(...arr);
    hide();
  });
};
mapHandle();
</script>
<style scoped>
.map-container {
  width: 100%;
  height: 700px;
}
</style>
