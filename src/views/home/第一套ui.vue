<script setup lang="ts">
import { ElPagination } from "element-plus";
import ContentHead from "@/components/Content-head.vue";
import ContentDiv from "@/components/Content-div.vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ResultDataTotal } from '@/types/Result'
const { $axios } = window;

gsap.registerPlugin(ScrollTrigger);

const mytext = "编程是一场艺术，逻辑是它的画笔，创新是它的灵魂".split("");

const limit = 5;
const indexList = ref(1);
// const itemData = (await http(
//   "get",
//   "/api/article/getArticleList?pages=" + indexList.value + "&limit=" + limit
// )) as any;

function getArticleList(pages: number, limit: number) {
  return $axios<ResultDataTotal<any>>({
    url: "/api/article/getArticleList",
    method: "get",
    params: {
      pages: pages,
      limit: limit,
    },
  })
}

const itemData = await getArticleList(indexList.value, limit);
const { data, total } = itemData;
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
const homecoverLoad = (e) => {
  // 往后的1.5秒内，让图片模糊的从10 到 0
  gsap.to(e.target, {
    duration: 1.5,
    filter: "blur(0px)",
    display: "block",
  });
  gsap.to(".placeholder", {
    duration: 0.2,
    filter: "blur(2px)",
    display: "none",
  });
}

</script>

<template>
  <div class="content">
    <!-- <div class="home" :style="'background-image:url(' + URL + '/public/img/101608761_p0.jpg) '" id="eleme">
      //遮罩
      <transition name="mask">
        <div v-if="!store.dark" class="mask"></div>
      </transition>
    </div> -->
    <div class="home">
      <div class="conImg">
        <div class="navbar-logo" :class="isloaded ? 'loaded' : ''">
          <p>
            <span>
              <span>Ji</span>
            </span>
            <span>
              <span>n</span>
            </span>
            <span>
              <span>gz</span>
            </span>
            <span>
              <span>y</span>
            </span>
          </p>
          <span class="myText" v-for="(item, index) in mytext" :key="index" :class="isloaded ? 'loaded' : ''">
            {{ item }}
          </span>
        </div>
        <img class="actual-image" :src="'/firstHonoApi/static/img/bg.png'" @load="homecoverLoad" alt="" />
        <img class="placeholder" :src="'/firstHonoApi/static/img/bgExcess.png'" alt="" />
      </div>
    </div>
    <ContentHead></ContentHead>
    <div class="listSum">
      <!-- 文章内容 -->
      <div class="list_content">
        <img class="listImg" id="listSum" :src="'/firstHonoApi/static/img/reduce.jpg'" alt="" />
        <div :id="'list' + item.aid" v-for="(item, index) in list" :key="index" v-if="isload">
          <router-link :to="'/home/detail/' + item.aid">
            <ContentDiv :data="item" :index="index"></ContentDiv>
          </router-link>
        </div>
      </div>
      <!-- 文章分页 -->
      <div class="example-pagination-block lzy-center" id="example">
        <div class="example-demonstration">
          When the content ends, turn the page to see the new content
        </div>
        <el-pagination :page-size="limit" layout="prev, pager, next" :total="totals" @current-change="currentChange" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100vh;
  background: no-repeat center center;
  backdrop-filter: blur(50px);
  background-size: cover;
  position: relative;

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%),
      radial-gradient(rgba(255, 255, 255, 0) 33%, rgba(0, 0, 0, 0.3) 166%),
      linear-gradient(0,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 0% 80%,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.4) 100%);
    animation: slide-out-fwd-bl_lzy 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .mask-enter-active,
  .mask-leave-active {
    transition: 1s;
  }

  .mask-leave-to,
  .mask-enter-from {
    background: rgba(0, 0, 0, 0);
  }
}

.content {
  width: 100%;
  height: inherit;
  overflow-x: hidden;
}

.conImg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;

    &.placeholder {
      position: absolute;
      inset: 0;
      filter: blur(10px);
      transform: scale(1.03);
      // display: none;
    }

    &.actual-image {
      display: none;
    }
  }


  .navbar-logo {
    height: auto;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    /* 计算最大值与最小值，跟随页面大小变化 */
    color: #fff;
    font-family: "Slackey";
    user-select: none;
    cursor: pointer;
    z-index: 2;

    p {
      margin: 0;
      height: clamp(10px, 10vw, 20vw);
      overflow: hidden;
      transition: 0.3s;

      span {
        font-size: clamp(30px, 7vw, 20vw);
        filter: drop-shadow(1px 0 2px #f6569d);
        display: inline-block;
        overflow: hidden;
        transition-duration: 0.2s;
        transition-property: transform;
        text-align: center;

        span {
          display: inline-block;
          transition-duration: 1s;
          transition-property: transform;
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        &:nth-child(odd) {
          transform: translateY(50%) rotateZ(180deg);

          span {
            transform: translateY(-100%);
          }
        }

        &:nth-child(even) {
          transform: translateY(-50%) rotateZ(-180deg);

          span {
            transform: translateY(100%);
          }
        }
      }
    }

    &.loaded p>span {
      transform: translateY(0);
    }

    &.loaded p>span span {
      transform: translateY(0);
    }

    .myText {
      display: inline-block;
      transition: 0.22s;
      font-size: clamp(1px, 1vw, 14vw);
      font-family: "dindin";
      transform: translateY(0);
      opacity: 0;
      filter: drop-shadow(1px 0 4px #4e4e4e);
    }
  }
}

.ContentHead {
  width: 100%;
  height: 100%;
  text-align: center;
}

.listSum {
  /* transition: .1s; */
  padding: 40px;
  padding-top: 0;
  height: calc(100% - 808px);
  margin: 0 auto;
}

.listImg {
  width: 100%;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  transform: translateY(300px) scale(2);
  z-index: -1;
  filter: blur(5px);
}

.list_content {
  margin: 0 auto;
  padding: 40px;
  width: 960px;
  height: 100%;
  overflow: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &>div {
    margin-bottom: 30px;
  }
}

.list_content::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.lzy-center {
  padding-top: 6px;
  border-top: 1px solid #ebeef5;
}

.lzy-center :deep(.el-pagination) {
  justify-content: center;
}

.lzy-center :deep(.el-pager) li.active {
  color: var(--themeColor);
}

.lzy-center:deep(.el-pager) li:hover {
  color: var(--themeColor);
}

.listSum :deep(.example-pagination-block) {
  transition: bottom 0.22s cubic-bezier(0.645, 0.045, 0.355, 1);
  opacity: 1;
  height: 53px;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: -100px;
  /* transform: translateX(-50%); */
  background-color: #fff;
}

.example-demonstration {
  padding: 4px !important;
}
</style>
<style scoped>
.dark .conent_div {
  background: var(--darkBgcolor);
  box-shadow: 0px 0px 0px 1px #ffffff6a;
}

.dark .conent_div :deep(.conent_div_text) div,
.dark .lzy-center,
.dark .conent_div :deep(.conent_div_text) .title,
.dark .content,
.dark .magics,
.dark .lzy-center :deep(.el-pagination) button,
.dark .lzy-center :deep(.el-pagination) li,
.dark .listSum {
  background: var(--darkBgcolor) !important;
  color: var(--bgcolor);
}
</style>
<style lang="less">
@import url("@/assets/css/mobile/homeMobile.scss");
</style>
