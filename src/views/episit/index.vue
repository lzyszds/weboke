<template>
  <div class="contents">
    <div class="back" @click="back">back</div>
    <div class="items">
      <lzyButton v-for="item in reactData.forData" :key="item.index" @click="mapHandle(item.index)"
        :class="reactData.index == item.index ? 'bg-blue-400' : null">{{ item.title }}</lzyButton>
    </div>
    <div>
      <div class="map-container" ref="myEchart"></div>
    </div>
    <p>数据获取来源：<a href="https://c.m.163.com/ug/api/wuhan/app/data/list-total" target="_blank ">网易疫情数据api</a> </p>
  </div>
</template>

<script setup>
import http from "@/http/http";
// import { show, hide } from "@/utils/loading.js";
import lzyButton from "@/uiComponents/Button.vue";
import _ from "lodash";
import * as echarts from "echarts";
import china from "/public/china.json";
import { useRouter } from 'vue-router'
const router = useRouter()
const back = () => {
  router.go(-1)
}
//使用异步组件的方式来加载疫情地图组件
let reactData = reactive({
  title: "现有确证",
  cityData: [],
  index: 1,
  count: 0,
  forData: [
    { title: "现有确诊", index: 1, },
    { title: "累计确诊", index: 2, },
    { title: "新增确诊", index: 3, },
    { title: "累计治疗", index: 4, },
    { title: "累计死亡", index: 5, },
    { title: "疫情趋势", index: 6, },
  ],
});
let myEchart = ref(null);
let MapHandle, chartHandle;
onMounted(() => {
  echarts.registerMap("china", china);
  let myChart;
  //地图数据展示
  MapHandle = (data) => {
    if (myChart) myChart.dispose();
    myChart = echarts.init(myEchart.value);
    let option = {
      backgroundColor: "#555",
      title: {
        text: "全国新冠疫情" + reactData.title,
        subtext: "",
        x: "center",
        y: 30,
        textStyle: {
          color: "#fff",
          fontSize: 25,
        },
      },
      tooltip: {
        trigger: "item",
      },
      //左侧小导航图标
      visualMap: {
        textStyle: {
          color: "#fff",
        },
        show: true,
        x: "left",
        y: "bottom",
        splitList: [
          { start: 10000, end: Infinity },
          { start: 1000, end: 9999 },
          { start: 500, end: 999 },
          { start: 100, end: 499 },
          { start: 10, end: 99 },
          { start: 1, end: 9 },
          { start: 0, end: 0 },
        ],
        color: [
          "#7f1100",
          "#bd1316",
          "#e64b45",
          "#ff8c71",
          "#fdd2a0",
          "#fff2cf",
          "#ffffff",
        ],
      },
      //配置属性
      series: [
        {
          name: "数据",
          type: "map",
          map: "china",
          roam: true,
          zoom: 1.2,
          scaleLimit: {
            min: 1.2,
            max: 5,
          },
          label: {
            normal: {
              show: true, //省份名称
              color: "#fff",
            },
            emphasis: {
              show: false,
            },
          },
          data: data, //数据
        },
      ],
    };
    myChart.setOption(option);
  };
  //疫情趋势 图表展示
  chartHandle = (data) => {
    if (myChart) myChart.dispose();
    myChart = echarts.init(myEchart.value);
    let xData = [...data.map((item) => item.date)];
    let yDataDiagnose, yDataSuspected, option;
    try {
      yDataDiagnose = [...data.map((item) => item.today.confirm)];
      yDataSuspected = [...data.map((item) => item.today.suspect)];
    } catch (error) {
      console.log("数据不对", error, data);
    }
    option = {
      backgroundColor: "#333",
      textStyle: {
        color: "#fff",
      },
      title: {
        text: "全国新冠疫情" + reactData.title,
        textStyle: {
          color: "#fff",
          fontSize: 25,
        },
        x: "center",
        y: 30,
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["确诊", "疑似"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        top: "20%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xData,
      },
      yAxis: {
        type: "value",
      },
      color: ["#CF350B", "#FCEA7A"],
      series: [
        {
          name: "确诊",
          type: "line",
          data: yDataDiagnose,
        },
        {
          name: "疑似",
          type: "line",
          data: yDataSuspected,
        },
      ],
    };
    myChart.setOption(option);
  };
});
//现有确诊数据判断
const mapHandle = (_index) => {
  if (reactData.index == _index && reactData.count != 0) return;
  if (!_index) _index = 1;
  reactData.index = _index;
  reactData.cityData = [];
  // show(".wrapper");
  http('get', "/api").then((res) => {
    const data = res.data;
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
    // hide();
  });
};
mapHandle();
watch(
  () => {
    return reactData.cityData;
  },
  (value) => {
    if (reactData.index <= 5) MapHandle(value);
    else chartHandle(value);
  },
  {
    deep: true,
  }
);
</script>
<style lang="less" scoped>
.map-container {
  width: 100%;
  height: 100vh;
  background-color: #000;
}


.contents {
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-color: var(--themeColor);
  // padding-top: 100px;
  position: relative;

  .back {
    width: auto;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 10px;
    z-index: 1;
    border: 2px solid #fff;
    border-left: none;

    background-color: var(--themeColor);
    padding: 0px 10px;
    border-radius: 0 20px 20px 0;
    box-shadow: 0 2px 5px 1px #222;
  }

  .items {
    position: absolute;
    top: 10px;
    right: 0%;
    transform: translate(0%, 0);
    z-index: 1;
  }

  p {
    position: absolute;
    right: 0;
    bottom: 0;
    color: #fff;

    a {
      color: #fff;

    }
  }
}
</style>
