<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ResultDataTotal } from '@/types/Result'
import { ElPagination } from 'element-plus'
import SkillSwiper from "@/components/SkillSwiper.vue";
import ContentDiv from "@/components/ContentDiv.vue";
import NewComment from "@/components/NewComment.vue";
const DeskInfo = defineAsyncComponent(() => import("@/components/DeskInfo.vue"))

const { $axios } = window;

gsap.registerPlugin(ScrollTrigger);

const mytext = "编程是一场艺术，逻辑是它的画笔，创新是它的灵魂".split("");

const limit = 10;
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

    //删除加载loading
    document.querySelector('body')!.classList.remove('loading')
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
          <img v-lazy="5" :src="'/api/public/img/homeItem.png'" alt="">
          <!-- <GithubPlot :data="getGithubData()" :x="836" :y="204"></GithubPlot> -->
        </div>
      </div>
    </div>
    <div class="main_home">
      <!-- 文章内容 -->
      <div class="list_main">
        <div class="list_content ">
          <div :id="'list' + item.aid" v-for="(item, index) in list" :key="index" v-if="isload">
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
  </div>
</template>
<style lang="scss">
.themeCard {
  background-color: var(--themeColor);
  border-radius: 20px;
  border: 4px solid #000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.notice {
  margin: 70px auto 10px;
  height: 40px;
  width: 1280px;
  max-width: var(--maxWidth);
  border-radius: 15px;
  background-color: var(--themeColor);
  padding: 5px 10px;

  .noticeMain {
    background-color: #fff;
    border: 4px solid #000;
    width: calc(100% - 5px);
    height: calc(100% - 8px);
    padding: 0;
    border-radius: 10px;
  }
}

.swiper_container_card {
  display: grid;
  grid-template-columns: 49.5% 49.5%;
  gap: 10px;
  width: 1280px;
  max-width: var(--maxWidth);
  justify-content: space-between;
  margin: 0 auto 0;

  .swiperitem {
    width: 100%;
    height: 330px;
  }

  .swiperCard {
    background-color: #fff;
    height: calc(100% - 5px);
    border-radius: 15px;
    border: 4px solid #000;
    overflow: hidden;
    position: relative;

    .slogan {
      font-size: 5rem;
      margin-left: 30px;
      font-weight: 600;
      margin-bottom: 0;

      p {
        margin: 0;
      }
    }

    .small {
      margin-left: 40px;
      font-size: 1.2rem;
      top: 0;
    }
  }

  .leftCard {}

  .rightCard {
    .swiperCard {
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.main_home {
  margin: 0 auto;
  margin-top: 20px;
  width: 1310px;
  max-width: calc(var(--maxWidth) + 20px);
  display: grid;
  grid-template-columns: auto 305px;
  gap: 20px;

  .list_main {
    width: 100%;

    .list_content {
      display: grid;
      gap: 10px;
      margin-top: 20px;
      position: relative;

      &>div {
        width: 100%;
        height: 120px;
        z-index: 2;
      }
    }
  }

  #example.example-pagination-block {
    margin: 20px 0;
    margin-bottom: 200px;
    z-index: 1;
    position: relative;

    .el-pagination {
      justify-content: center;
    }

    li,
    button {
      background-color: #fff;
      border: 1px solid #eee;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      cursor: pointer;
      transition: .24s;
      width: 40px;
      height: 40px;

      &:hover {
        border: 1px solid var(--themeColor);
        box-shadow: 0 0 10px #5161ce30;
      }
    }

    .is-active {
      background-color: var(--themeColor);
      color: #fff !important;
    }
  }
}

@media (max-width: 1450px) {
  .content {
    .swiper_container_card {
      .swiperCard {
        .slogan {
          font-size: 3rem;
        }
      }
    }
  }
}

@media (max-width: 1250px) {
  .content {
    --maxWidth: 100%;

    .swiper_container_card {
      .swiperCard {
        .slogan {
          font-size: 3rem;
        }
      }
    }

    .main_home {
      .list_main {
        .list_content {
          grid-template-columns: 1fr;
        }
      }
    }
  }
}

@media (max-width: 1080px) {
  .content {
    .swiper_container_card {
      grid-template-columns: 1fr;

      .rightCard {
        display: none;
      }
    }
  }
}

@media (max-width: 991px) {
  .content {}
}

@media (max-width: 832px) {
  .content {
    --maxWidth: 96% !important;
    margin: 20px;

    .main_home {
      grid-template-columns: 1fr;
    }

    .systemInfo {
      display: none;
    }
  }
}

@media (max-width: 768px) {
  .content {}
}

@media (max-width: 575px) {
  .content {
    margin: 0;

    .notice {
      width: auto;
    }

    .swiper_container_card {
      width: auto;

      .swiperCard {
        p {
          text-align: center;
          margin: 10px 0;

          &.slogan {
            font-size: 4rem;
          }
        }

        .skillMain {
          transform: rotate(0);
          bottom: 0;
          top: auto;

          .skillCard {
            &>div {
              width: 4rem;
              height: 4rem;
            }
          }
        }
      }
    }

    .main_home {
      width: auto;
    }
  }
}
</style>
