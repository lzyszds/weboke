<script setup lang='ts'>
import { getWeather } from "@/utils/common";
import { useStore } from "@/store/index";
const state = useStore()
if (JSON.stringify(state.weatherData) == '{}') {
  state.setWeather(JSON.parse(localStorage.getItem("weatherData")!))
}
const { weatherData, tags, ip, region } = state.weatherData
const convertPM25 = (pm25: number) => {
  if (pm25 <= 35) {
    return "优";
  } else if (pm25 <= 75) {
    return "良";
  } else if (pm25 <= 115) {
    return "轻度污染";
  } else if (pm25 <= 150) {
    return "中度污染";
  } else if (pm25 <= 250) {
    return "重度污染";
  } else {
    return "严重污染";
  }
};
const api = import.meta.env.VITE_BASE_URL + '/public/img/10.svg'
</script>

<template>
  <main class="themeCard deskInfo ">
    <section class="cardinter">
      <div class="geoArea">
        <lzyIcon name="ep:location-information"></lzyIcon>
        {{ region == '0|0' ? '中国以外' : region }} <span> {{ ip }}</span>
      </div>
    </section>
    <section class="cardinter">

      <div class="gridlist">
        <h2 :style="weatherData.temperature !== 0 ? '' : 'margin:15px 0px 0 20px'">
          <img :src="getWeather() || api" alt="">
          <span v-if="weatherData.temperature !== 0" class="temperature">{{
            weatherData.temperature }}°C</span>
        </h2>
        <p>
          <span><i class="iconfont icon-icon-taikong4"></i>：{{ weatherData.weather }}</span>
          <span><i class="iconfont icon-fengsufengxiang"></i>：{{ weatherData.windDirection }}</span>
          <span><i class="iconfont icon-feng"></i>：{{ weatherData.windPower }}级</span>
        </p>
        <p>
          <span><i class="iconfont icon-dinengjian"></i>：{{ weatherData.visibility }}</span>
          <!-- <span><i class="iconfont icon-jiangyuliang"></i>：{{ weatherData.rainfall }}</span> -->
          <span><i class="iconfont icon-kongqizhiliang"></i>：{{ convertPM25(weatherData.pm25) }}</span>
        </p>
        <p class="barload">
          <span><i class="iconfont icon-shidu"></i>：{{ weatherData.humidity }}%</span>
          <span class="uptime">更新时:{{ weatherData.updateTime }}</span>
        </p>
      </div>
      <div class="tags">
        <span class="tag" v-for="item of tags">{{ item }}</span>
      </div>
    </section>
  </main>
</template>

<style lang='less' scoped>
.deskInfo {
  position: sticky;
  top: 60px;
  margin-bottom: 10px;

  p {
    margin: 0;
  }

  .cardinter {
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    border: 3px solid #000;
    position: relative;

    img {
      height: 50px;
      border-radius: 50%;
      filter: drop-shadow(1px 2px 2px black);
      transform: scale(2);
    }

    .geoArea {
      span {
        text-decoration: 1px underline #000;
        margin-left: 10px;
      }
    }



    .gridlist {
      display: grid;
      gap: 0 20px;
      grid-template-columns: 1fr 1fr;

      h2 {
        display: flex;
        width: 85px;
        flex-direction: column;
        grid-column: 1/2;
        grid-row: 1/3;
        margin: 0 0 0 10px;
        align-items: self-start;

        .temperature {
          // position: absolute;
          font-size: 40px;
          color: var(--themeColor);
        }
      }

      span {
        display: block;
      }

      .barload {
        grid-column: 1/3;
        display: flex;
        margin-top: 10px;

        span {
          flex: 1;
        }
      }
    }

    .tags {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
      margin-top: 10px;
      text-align: center;
      font-family: '微软雅黑';
      text-shadow: 1px 1px 1px #000;

      span.tag {
        padding: 3px 10px;
        border-radius: 8px;
        background-color: var(--themeColor);
        color: #fff;
        font-size: 12px;
      }
    }
  }

}
</style>
