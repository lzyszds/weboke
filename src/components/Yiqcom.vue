<template>
  <div class="map-container" ref="myEchart"></div>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
  watch,
} from "vue";
import * as echarts from "echarts";
import china from "/public/china.json";
export default defineComponent({
  name: "Home",
  props: {
    reactData: Object,
  },

  setup(props) {
    const { reactData } = props;
    let currentInstance = null;
    let situationData = ref([]);
    let MapHandle, chartHandle;
    onMounted(() => {
      currentInstance = getCurrentInstance();
      echarts.registerMap("china", china);
      let myChart;
      //地图数据展示
      MapHandle = (data) => {
        if (myChart) myChart.dispose();
        myChart = echarts.init(currentInstance.ctx.$refs.myEchart);
        let option = {
          backgroundColor: "#eee",
          title: {
            text: "全国新冠疫情" + reactData.title,
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
      //疫情趋势 图表展示
      chartHandle = (data) => {
        if (myChart) myChart.dispose();
        myChart = echarts.init(currentInstance.ctx.$refs.myEchart);
        let xData = [...data.map((item) => item.date)];
        let yDataDiagnose, yDataSuspected, option;
        try {
          yDataDiagnose = [...data.map((item) => item.today.confirm)];
          yDataSuspected = [...data.map((item) => item.today.suspect)];
        } catch (error) {
          console.log("数据不对", error, data);
        }
        option = {
          title: {
            text: "全国新冠疫情" + reactData.title,
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
            bottom: "3%",
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
    return {
      situationData,
      props,
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
