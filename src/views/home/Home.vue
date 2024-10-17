<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ElPagination } from 'element-plus'
import SkillSwiper from "@/components/SkillSwiper.vue";
import ContentDiv from "@/components/ContentDiv.vue";
import NewComment from "@/components/NewComment.vue";
import Footer from '@/components/Footer.vue'

import { getArticleList } from '@/api/home/article';

const DeskInfo = defineAsyncComponent(() => import("@/components/DeskInfo.vue"))


gsap.registerPlugin(ScrollTrigger);

const mytext = "编程是一场艺术，逻辑是它的画笔，创新是它的灵魂".split("");

const limit = 10;
const indexList = ref(1);


const { data, total } = await getArticleList(indexList.value, limit);
const list: any = ref(data);
const totals = ref(total);
const isload = ref(true);
const isloaded = ref(false);
//此处为分页器的回调函数
const currentChange = (e: number) => {
  /*
    这三行代码解决了分页器,每次执行时会让dom抖动的问题 
    具体逻辑是，每次切换有页数时页数内容变化，会导致页面高度变化，从而导致页面抖动
    所以在切换页数时，先把页面高度固定，然后再去请求数据，请求完数据后再把页面高度变回来
  */
  const list_content = document.querySelector(".list_content") as HTMLDivElement;
  const listComHeight = list_content.offsetTop;
  list_content.style.height = listComHeight + "px";
  //将当前页重新渲染，vue才能监听到数据的变化
  isload.value = false;
  //当前页数
  indexList.value = e;
  getArticleList(e, limit).then((res) => {
    list.value = res.data;
    totals.value = res.total;
    isload.value = true;
    list_content.style.height = "auto";
  });
};
onMounted(() => {
  setTimeout(() => {
    const example = document.querySelector("#example") as HTMLElement;
    if (window.innerWidth < 600) {
      example.style.bottom = "0";
    }
    gsap.to(".noticeMain span", {
      duration: 1.5, // 动画持续时间
      opacity: 1,    // 初始透明度为0
      y: 50,         // 初始Y轴位置，向下偏移50px
      stagger: 0.2,  // 每个元素的动画间隔时间
      ease: "power3.out", // 缓动效果
    });

    //控制滚动到底部时，分页器的显示与隐藏
    useEventListener(window, "scroll", () => {
      const y = window.scrollY;
      if (!example) return;
      if (y >= 300 || innerWidth < 600) {
        example.style.bottom = "0";
      } else {
        example.style.bottom = "-100px";
      }
    });
    isloaded.value = true;
    ScrollTrigger.create({
      trigger: ".conImg",
      start: "bottom bottom",
      endTrigger: ".listSum",
      end: "top top",
      scrub: true,
      animation: gsap.to("#listSum", {
        scale: 1,
        position: "fixed",
        y: 200,
        duration: 1,
        filter: "blur(0px)",
        ease: "none",
      }),
    });
    toGaspText(".myText");
    resizeWidth()
  }, 1000);
});

function toGaspText(target: string) {
  return gsap.to(target, {
    duration: 0.01,
    y: "+=10",
    opacity: 1,
    ease: "power1.inOut",
    stagger: 0.05, // 延迟每个元素动画开始的时间
  });
}

useEventListener('resize', () => {
  resizeWidth()
})
function resizeWidth() {
  const detail = document.querySelector(".content") as HTMLDivElement;
  detail.style.setProperty('--maxWidth', String(window.innerWidth - 130) + 'px')
}

</script>

<template>
  <div class="content" style="--maxWidth:1380px">
    <div class="notice themeCard">
      <div class="noticeMain ">
        <span v-for="item in mytext">{{ item }}</span>
      </div>
    </div>
    <div class="swiper_container_card themeCard">
      <div class="swiperitem leftCard">
        <div class="swiperCard">
          <p class="slogan">
            过去无法挽留
          <p>未来仍可改变</p>
          </p>
          <p class="small">
            <span>编程</span>、
            <span>逻辑</span>、
            <span>创新</span>、
            <span>灵魂</span>
          </p>
          <SkillSwiper></SkillSwiper>
        </div>
      </div>
      <div class="swiperitem rightCard">
        <div class="swiperCard">
          <img v-lazy="5" :src="'/firstHonoApi/static/img/homeItem.png'" alt="">
          <!-- <GithubPlot :data="getGithubData()" :x="836" :y="204"></GithubPlot> -->
        </div>
      </div>
    </div>
    <div class="main_home">
      <!-- 文章内容 -->
      <div class="list_main">
        <div class="list_content ">
          <div :id="'list' + item.aid" v-for="(item, index) in list" :key="index" v-if="isload"
            v-transition="'animate__fadeInUp'">
            <RouterLink :to="'/home/detail/' + item.aid">
              <ContentDiv :data="item" :index="index"></ContentDiv>
            </RouterLink>
          </div>
        </div>
        <!-- 文章分页 -->
        <div class="example-pagination-block lzy-center" id="example">
          <ElPagination :page-size="limit" layout="prev, pager, next" background :total="totals"
            @current-change="currentChange" />
        </div>
      </div>
      <div class="systemInfo">
        <DeskInfo></DeskInfo>
        <NewComment></NewComment>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<style lang="scss" scoped>
@import url("@/assets/css/home.scss");
</style>
