<script setup lang='ts'>
import { getWeather } from "@/utils/common";
import { useStore } from "@/store/index";
import dayjs from "dayjs";
const state = useStore()
if (JSON.stringify(state.weatherData) == '{}') {
  state.setWeather(JSON.parse(localStorage.getItem("weatherInfo")!))
}
const { province, city, ip, temperature, weather, winddirection, windpower, humidity, reporttime } = state.weatherData
const api = '/firstHonoApi/static/img/10.svg'

const formatTime = (time: string) => {
  const date = dayjs(time)
  return date.format('HH:mm')
}

</script>

<template>
  <main class="themeCard stickyTop">
    <section class="cardinter stickers">
      <div class="geoArea">
        <lzyIcon name="ep:location-information"></lzyIcon>
        {{ province + "|" + city }} <span> {{ ip }}</span>
      </div>
    </section>
    <section class="cardinter">

      <div class="gridlist">
        <div :class="{ undef: temperature == '未知', 'div': true }">
          <img :src="(getWeather() as any) || api">
          <span class="temperature">{{ temperature }}°C</span>
        </div>
        <p>
          <span><i class="iconfont icon-icon-taikong4"></i>：{{ weather }}</span>
          <span><i class="iconfont icon-fengsufengxiang"></i>：{{ winddirection }}</span>
          <span><i class="iconfont icon-feng"></i>：{{ windpower }}级</span>
          <span><i class="iconfont icon-shidu"></i>：{{ humidity }}%</span>
          <span class="uptime">更新时间:{{ formatTime(reporttime) }}</span>
        </p>
      </div>
    </section>
  </main>
</template>

<style lang='scss' scoped>
.stickyTop {

  p {
    margin: 0;
  }

  .cardinter {

    .geoArea {
      font-size: 14px;

      span {
        text-decoration: 1px underline #000;
        margin-left: 10px;
        z-index: 99999;

      }
    }

    .gridlist {
      display: grid;
      gap: 0 20px;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      align-items: center;

      .div {
        display: grid;
        width: 85px;
        flex-direction: column;
        grid-template-columns: 1fr;
        grid-template-rows: 2fr auto;
        align-items: self-start;

        &.undef {
          align-items: inherit;
          justify-content: center;

          .temperature {
            display: none;
          }
        }

        .temperature {
          font-size: 30px;
          font-weight: 600;
          color: var(--themeColor);
          text-align: center;
        }
      }

      img {
        border-radius: 50%;
        filter: drop-shadow(1px 2px 2px black);
        width: 100px;
      }

      span {
        display: block;
      }

      .uptime {
        margin-top: 20px;
      }
    }

    .tags {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
      margin-top: 10px;
      text-align: center;
      font-family: 'Red Hat Display';
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
