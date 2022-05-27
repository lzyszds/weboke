<template>
  <div class="map-container" ref="myEchart"></div>
</template>

<script>
import { defineComponent, getCurrentInstance, onMounted, ref } from "vue";
import * as echarts from "echarts";
import { get } from "@/http/http";
import china from "@/../public/china.json";
import { show, hide } from "@/utils/loading.js";
export default defineComponent({
  name: "Home",
  setup() {
    let currentInstance = null;
    let situationData = ref([]);
    onMounted(() => {
      currentInstance = getCurrentInstance();
      echarts.registerMap("china", china);
      const myChart = echarts.init(currentInstance.ctx.$refs.myEchart);
      const myChartHandle = (data) => {
        let option = {
          backgroundColor: "#eee",
          title: {
            text: "全国新冠疫情现有确诊",
            subtext: "",
            x: "center",
            y: 30,
            textStyle: {
              color: "#333",
              fontSize: 25,
            },
          },
          tooltip: {
            trigger: "item",
          },

          //左侧小导航图标
          visualMap: {
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
              mapType: "china",
              roam: true,
              zoom: 1.2,
              scaleLimit: {
                min: 1.2,
                max: 5,
              },
              label: {
                normal: {
                  show: true, //省份名称
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
      show();
      get("/api").then((res) => {
        const data = res.data.data;
        data.areaTree.forEach((item) => {
          if (item.name == "中国") {
            situationData = item;
          }
        });
        let cityData = [];

        situationData.children.forEach((res) => {
          //现有确诊
          const existing = res.total.confirm - res.total.dead - res.total.heal;
          // 总数减死亡与治疗
          cityData.push({ name: res.name, value: existing });
        });
        hide();
        myChartHandle(cityData);
      });
    });
    // echarts.registerMap("china", china);
    return {
      situationData,
    };
  },
});
</script>
<style scoped>
.map-container {
  width: 100%;
  height: 700px;
}
</style>
