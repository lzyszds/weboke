<script setup lang='ts'>
import { getWeather } from "@/utils/common";
import { useStore } from "@/store/index";
import dayjs from "dayjs";
const state = useStore()
if (JSON.stringify(state.weatherData) == '{}') {
  state.setWeather(JSON.parse(localStorage.getItem("weatherInfo")!))
}
const weatherInfo = state.weatherData
const api = '/api/public/img/10.svg'

const formatTime = (time: string) => {
  const date = dayjs(time)
  return date.format('HH:mm')
}


</script>

<template>
  <main class="themeCard deskInfo ">
    <section class="cardinter">
      <div class="geoArea">
        <lzyIcon name="ep:location-information"></lzyIcon>
        {{ weatherInfo.province + "|" + weatherInfo.city }} <span> {{ weatherInfo.ip }}</span>
      </div>
    </section>
    <section class="cardinter">

      <div class="gridlist">
        <h2 style="margin:15px 0px 0 20px">
          <img :src="getWeather() || api" alt="">
          <span class="temperature">{{ weatherInfo.temperature }}°C</span>
        </h2>
        <p>
          <span><i class="iconfont icon-icon-taikong4"></i>：{{ weatherInfo.weather }}</span>
          <span><i class="iconfont icon-fengsufengxiang"></i>：{{ weatherInfo.winddirection }}</span>
          <span><i class="iconfont icon-feng"></i>：{{ weatherInfo.windpower }}级</span>
          <span><i class="iconfont icon-shidu"></i>：{{ weatherInfo.humidity }}%</span>
          <span class="uptime">更新时间:{{ formatTime(weatherInfo.reporttime) }}</span>
        </p>
      </div>
    </section>
  </main>
</template>

<style lang='less' scoped>
.deskInfo {
  position: sticky;
  top: 60px;
  margin-bottom: 10px;
  user-select: none;
  cursor: pointer;

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
      gap: 0 30px;
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
      .uptime{
        margin-top: 20px;
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
