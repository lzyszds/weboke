<!-- 文章列表中的长方形组件 -->
<script setup lang="ts">
import dayjs from "dayjs";
import LzyIcon from "./LzyIcon.vue";
import _ from "lodash";
import { gsap } from "gsap";
const list = [
  { name: "typcn:time" },
  { name: "iconoir:stackoverflow" },
  { name: "typcn:eye-outline" },
  { name: "typcn:messages" },
];
interface Data {
  title: string;
  content: string;
  time: string;
  create_date: string;
  uname: string;
  comments_count: string;
  cover_img: string;
  partial_content: string;
  tags: string[];
  access_count: number;
}
interface Props {
  data: Data;
  index: number;
}
// const api = import.meta.env.VITE_BASE_URL

const props = defineProps<Props>();
const tags = props.data.tags;
const data = ref<Data>(props.data);
const selectHandle = (index: number) => {
  let result = "" as string | number;
  const { create_date, comments_count, access_count } = data.value;
  if (index == 0) {
    result = dayjs(create_date).format("YYYY-MM-DD HH:mm:ss");
  } else if (index == 1) {
    if (tags) result = tags.join(", ");
  } else if (index == 2) {
    result = access_count
  } else if (index == 3) {
    result = (comments_count || 0)
  }
  return result
};



// 鼠标划入事件
const mouseenter = _.debounce(function (event) {
  const mask = event.target.querySelector('.maskContent');

  // 如果鼠标划入的是 .maskContent 本身，直接返回
  if (event.target.classList.contains('maskContent')) {
    return;
  }

  // 获取所有的 .maskContent 元素并重置它们的样式
  const allMasks = document.querySelectorAll('.maskContent');
  allMasks.forEach(maskElement => {
    gsap.killTweensOf(maskElement); // 停止正在进行的动画
    gsap.set(maskElement, { clearProps: "all" }); // 清除所有动画的状态和内联样式
  });
  // 创建一个创新的动画效果
  const tl = gsap.timeline();
  // 设置初始状态
  tl.set(mask, {
    opacity: 0,
    scale: 0.5,
    rotation: gsap.utils.random(1, 2) >= 1.5 ? -15 : 15,// 旋转角度
    transformOrigin: "center center"
  })
    .to(mask, {
      opacity: 1,
      scale: 1.1,
      rotation: 0,
      duration: 0.4,
      ease: "back.out(1.7)"
    })
    .to(mask, {
      scale: 1,
      duration: 0.2,
      ease: "power1.inOut"
    })
    .to(mask, {
      y: -5,
      repeat: 1,
      yoyo: true,
      duration: 0.1,
      ease: "power1.inOut"
    })
    .to(mask, {
      boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      duration: 0.3
    });

  // 添加颜色变化效果
  tl.to(mask, {
    duration: 0.5,
    backgroundColor: "rgba(255, 114, 86, 0.2)", // 半透明的亮粉色
    color: "#ffffff",
    ease: "none"
  }, "-=0.7");

  // 最后的强调效果
  tl.to(mask, {
    boxShadow: "0 0 20px rgba(255, 105, 180, 0.7)",
    duration: 0.3
  }, "-=0.3");

}, 100, { leading: true, trailing: false });

const mouseleave = _.debounce(function (event) {
  const mask = event.target.querySelector('.maskContent');
  gsap.to(mask, {
    duration: 0.3,
    opacity: 0,
    scale: 0.5,
    rotation: gsap.utils.random(1, 2) >= 1.5 ? -15 : 15,
    transformOrigin: "center center",
    boxShadow: "0 0 0 rgba(0,0,0,0)"
  });
}, 100, { leading: true, trailing: false });

</script>

<template>
  <div v-transition="'tosiTion'" class="conent_div" @mouseenter="mouseenter" @mouseleave="mouseleave">
    <div class="maskContent"></div>
    <div class="title">{{ data.title }}</div>
    <div class="synopsis" v-text="data.partial_content"></div>
    <div class="time">
      <span v-for="(item, index) in list" :key="index">
        <span v-if="index == 1">#{{ selectHandle(index) }}</span>
        <span v-else>
          <LzyIcon :name="item.name"></LzyIcon>{{ selectHandle(index) }}
        </span>
      </span>
    </div>
  </div>

  <!-- <div v-transition="'tosiTion'" class="conent_div">
    <div class="conent_div_img">
      <img v-lazy="props.index" :src="'/api/public' + data.cover_img" alt="" />
    </div>
    <div class="conent_div_text">
      <div class="title">{{ data.title }}</div>
      <div class="synopsis" v-text="data.partial_content"></div>
      <div class="tags">
        <span class="mr-1 taglzy" v-for="item of tags">{{ item }} </span>
      </div>
      <div class="time">
        <span v-for="(item, index) in list" :key="index">
          <LzyIcon :name="item.name"></LzyIcon>
          {{ selectHandle(index) }}
        </span>
      </div>
    </div>
  </div> -->
</template>

<style scoped lang="less">
.tosiTion {
  opacity: 1 !important;
  transform: translate(0) !important;
}


.conent_div {
  padding: 10px 20px;
  border-radius: 10px;
  transition: .5s;
  position: relative;
  /* 禁止该元素接收鼠标事件 */
  pointer-events: auto;
  overflow: hidden;

  .maskContent {
    width: 100%;
    height: 110px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0;
    background-color: rgba(var(--themeColorRgb), .3);
    border-radius: 10px;
    /* 禁止该元素接收鼠标事件 */
    pointer-events: none;
  }

  .conent_div_text {
    width: 96%;
    height: 20rem;
    padding: 10px;
    display: grid;
    grid-template-rows: 60px 1fr 30px 35px;
    z-index: 0;
    gap: 5px;
    /* 禁止该元素接收鼠标事件 */
    pointer-events: none;
  }

  .title {
    font-size: 22px;
    color: #000;
    font-family: "dindin";
    overflow: hidden;
    /* 禁止该元素接收鼠标事件 */
    pointer-events: none;
  }

  /* 超出数量显示省略号 */
  .synopsis {
    font-size: 14px;
    color: #888;
    height: 40px;
    //超出两行显示省略号
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.5;
    /* 禁止该元素接收鼠标事件 */
    pointer-events: none;
  }

  .time {
    font-size: 12px;
    color: #888;
    /* 禁止该元素接收鼠标事件 */
    pointer-events: none;

    &>span {
      height: 20px;
      line-height: 25px;
      margin-right: 10px;

      svg {
        width: 16px !important;
        height: 16px;
        vertical-align: text-top;
        margin-right: 5px;
      }
    }
  }
}
</style>
