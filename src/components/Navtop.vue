<script setup lang="ts">
import { reactive, onMounted, nextTick } from "vue";
import setThemes from "@/uiComponents/setupThemes/Setthemes.vue";
import { useRouter } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { scrollTo } from "@/utils/common";

const router = useRouter();

const data = reactive({
  activeIndex: 0,
  items: [
    { name: "首页", path: '/home/index' },
    { name: "关于", path: '/about' },
    { name: "相册", path: '/photo' },
    { name: "疫情", path: '/episit' },
    { name: "登陆", path: '/login' },
  ],
  //选择器位置
  selectorpos: {
    left: '0px',
    top: '0px'
  },
  //是否打开
  hasopen: false,
  //获取网页标题
  webHeadTitle: ''
});

//获取网页标题 
data.webHeadTitle = document.title

data.items.forEach((item, index) => {
  const location = router.options.history.location
  if (item.path == router.options.history.location) {
    data.activeIndex = index
  }
  if (location.includes('detail')) {
    data.activeIndex = 1
  }
})
const bgBoxfun = () => {
  const navitem = document.querySelector(".nav-item.active") as HTMLElement;
  data.selectorpos = {
    left: navitem.offsetLeft + 'px',
    top: navitem.offsetTop + 'px'
  }
}

const menuMethod = (index) => {
  data.activeIndex = index
  nextTick(() => {
    bgBoxfun();
    router.push(data.items[index].path)
  })
}
const openfun = () => {
  data.hasopen = !data.hasopen
  const line = document.querySelectorAll(".lines") as NodeListOf<HTMLElement>;
  //按钮动画
  if (data.hasopen) {
    line[0].style.transform = 'rotate(45deg) translate3d(0,0,0)'
    line[1].style.transform = 'scaleX(0)'
    line[2].style.transform = 'rotate(-45deg) translate3d(0,0,0)'
  } else {
    line[0].style.transform = 'rotate(0) translate3d(0, -8px, 0)'
    line[1].style.transform = 'scaleX(1)'
    line[2].style.transform = 'rotate(0) translate3d(0, 8px, 0)'
  }

}

onMounted(() => {
  bgBoxfun()
  window.addEventListener("resize", bgBoxfun);
  useEventListener(window, 'scroll', () => {
    if (window.scrollY >= 100) {
      document.querySelector('.navbarContent')?.classList.add('navbarContent100')
    } else {
      document.querySelector('.navbarContent')?.classList.remove('navbarContent100')
    }
  })
})

//鼠标进入顶部中心标题 事件返回顶部
const tipBackfn = (val) => {
  if (val == 0) {
    data.webHeadTitle = document.title
  } else {
    data.webHeadTitle = '返回顶部'
  }
}
</script>
<!-- 顶部导航栏 -->
<template>
  <div class="navbarContent">
    <div class="navConChild">
      <div class="navbar-brand navbar-logo">
        <a href="#">
          <img width="80" src="http://localhost:8089/public/img/lzjyWhite.png" alt="" />
          <svg class="logoSvg" viewBox="0 0 400 200">
            <text x="0" y="70%" id="timelinetext"> Jz </text>
          </svg>
        </a>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav">
          <li class="nav-item" :class="{ active: data.activeIndex == index }" v-for="(item, index) in data.items"
            :key="index" @click="menuMethod(index)">
            <a class="nav-link decoration" href="javascript:void(0);">{{ item.name }}</a>
          </li>
        </ul>
        <div class="navbar-navTitle" @mouseover="tipBackfn(1)" @mouseout="tipBackfn(0)">
          <h4 :class="data.webHeadTitle == '返回顶部' ? 'tipBackclass animate__jackInTheBox' : ''" @click="scrollTo(0, 0)">{{
            data.webHeadTitle }}
          </h4>
        </div>
      </div>
      <div class="topRight">
        <setThemes :ons="'navbarContent'"></setThemes>
      </div>
      <div class="navbar-toggler">
        <label class="menu-open-button" @click="openfun">
          <span class="lines line-1"></span>
          <span class="lines line-2"></span>
          <span class="lines line-3"></span>
        </label>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
body {
  font-family: 'Roboto', sans-serif;
}

@keyframes stroke {
  0% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(255, 255, 255, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 10;
  }

  70% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(255, 255, 255, 1);
    stroke-width: 2;
  }

  85% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(255, 255, 255, 1);
    stroke-width: 1;
  }

  95%,
  100% {
    fill: rgba(255, 255, 255, 1);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 30% 0;
    stroke-width: 50;
  }
}



.navbarContent {
  position: fixed;
  top: -60px;
  transform: translateY(60px);
  transition: .5s;
  width: 100%;
  height: 60px;
  z-index: 99;
  backdrop-filter: blur(0);
  overflow: hidden;

  .navConChild {
    margin: 0 auto;
    width: 1280px;
    height: 60px;
    display: grid;
    grid-template-columns: 2fr 3fr 2fr;
    grid-template-rows: 1fr;

    .navbar-logo {
      height: 60px;

      svg.logoSvg {
        display: inline-block;
        width: 100px;
        height: 60px;
      }


      svg.logoSvg text {
        // text-transform: uppercase;
        letter-spacing: 10px;
        font-size: 150px;
        animation: stroke 5s infinite alternate;
        line-height: 60px;
      }
    }

    .collapse {
      position: relative;

      .navbar-nav {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0;
        gap: 30px;
        position: absolute;
        top: 0;
        transition: .3s;
        padding: 0;

        &>li {
          display: block;
          transition-duration: 0.6s;
          transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
          position: relative;
          text-align: center;
        }

        &>li.active {
          color: #fff;
          font-weight: 600;
          /* text-shadow: 1px 1px 5px #fff; */
          background-color: transparent;
          transition: all 0.7s;
        }

        &>li>a {
          font-size: 16px;
          color: #fff;
          text-shadow: 1px 2px 1px #000;
          font-weight: 600;
          text-decoration: none;
          padding-bottom: 10px;

        }
      }
    }

    h4 {
      margin: 0;
    }

    .navbar-navTitle {
      width: 100%;
      height: 100%;
      position: absolute;
      text-align: center;
      top: 60px;
      transition: .3s;
      font-size: 16px;
      font-family: "dindin";
      color: #fff;
      user-select: none;
      -webkit-user-select: none;
      -webkit-user-drag: none;
      cursor: pointer;
      display: flex;
      place-content: center;
      place-items: center;

      .tipBackclass {
        height: 25px;
        padding: 0 20px;
        border-radius: 20px;
        background-color: #fff;
        color: #000;
        line-height: 25px;
        animation-duration: .5s;
        animation-fill-mode: both;
      }
    }

    .topRight {
      display: flex;
      justify-content: flex-end;
      align-self: center;
    }
  }

  &.navbarContent100 {
    background-color: #5161ce;
    // backdrop-filter: blur(20px);

    .navbar-nav {
      top: -60px !important;
    }

    .navbar-navTitle {
      top: 0 !important;

    }
  }
}



#timelinetext {
  font-family: 'firaCode';
}

.dark .navbarContent.navbarContent100 {
  background-color: var(--darkBgcolor);
}

//响应式css
@import url('@/assets/css/mobile/navtopMobile.less');
</style>
