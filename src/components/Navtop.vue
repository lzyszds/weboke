<template>
  <div class="navbarContent">
    <div class="">
      <a class="navbar-brand navbar-logo" href="#"><img width="80" src="http://localhost:1027/public/img/lzjy.png"
          alt="" />J/Z</a>
      <div class="navbar-toggler">
        <label class="menu-open-button" @click="openfun">
          <span class="lines line-1"></span>
          <span class="lines line-2"></span>
          <span class="lines line-3"></span>
        </label>
      </div>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto" ref="ul">
          <li class="nav-item" :class="{ active: data.activeIndex == index }" v-for="(item, index) in data.items"
            :key="index" @click="menuMethod(index)">
            <a class="nav-link" href="javascript:void(0);">{{ item.name }}</a>
          </li>
          <setThemes :ons="'navbarContent'"></setThemes>
        </ul>
      </div>
    </div>
  </div>
  <nav class="navbar">
    <a class="navbar-brand navbar-logo" href="#"><img width="80" src="http://localhost:1027/public/img/lzjy.png"
        alt="" />J/Z</a>
    <div class="navbar-toggler">
      <label class="menu-open-button" @click="openfun">
        <span class="lines line-1"></span>
        <span class="lines line-2"></span>
        <span class="lines line-3"></span>
      </label>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto" ref="ul">
        <li class="nav-item" :class="{ active: data.activeIndex == index }" v-for="(item, index) in data.items"
          :key="index" @click="menuMethod(index)">
          <a class="nav-link" href="javascript:void(0);">{{ item.name }}</a>
        </li>
        <!-- <setThemes :ons="'navbar'"></setThemes> -->
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { reactive, onMounted, nextTick, ref } from "vue";
import setThemes from "@/uiComponents/setupThemes/Setthemes.vue";
import { useRouter } from 'vue-router'
import { useEventListener } from '@vueuse/core'

const router = useRouter()
const data = reactive({
  activeIndex: 0,
  items: [
    { name: "首页", path: '/home/index' },
    { name: "关于", path: '/about' },
    { name: "相册", path: '/photo' },
    { name: "疫情", path: '/home/episit' },
    { name: "登陆", path: '/login' },
  ],
  opencount: 0,
  selectorpos: 0
});
data.items.forEach((item, index) => {
  const location = router.options.history.location
  if (item.path == router.options.history.location) {
    data.activeIndex = index
  }
  if (location.includes('detail')) {
    data.activeIndex = 1
  }
})
const ul = ref(null);
const bgBoxfun = () => {
  const navitem = document.querySelector(".nav-item.active");
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
  if (data.hasopen) ul.value.style.height = (data.items.length * 40) + 'px'
  else ul.value.style.height = 0
  const line = document.querySelectorAll(".lines")
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
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

body {
  font-family: 'Roboto', sans-serif;
}

.navbar {
  /* background-color: #5161ce; */
  padding: 0;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1280px;
  height: 60px;
  z-index: 99;
  display: flex;
  line-height: 60px;
  justify-content: space-between;
}

.navbar-logo {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  margin-left: 40px;
  display: flex
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.hori-selector {
  display: flex;
  align-items: center;
  width: 130px;
  height: calc(100% - 10px);
  background-color: #fff;
  position: absolute;
  left: 0;
  display: inline-block;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  background-color: #fff;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  margin-top: 10px;
}

.hori-selector .left,
.hori-selector .right {
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: #fff;
  bottom: 0;
}

.hori-selector .left,
.hori-selector .left::before {
  left: -25px;
}

.hori-selector .right,
.hori-selector .right::before {
  right: -25px;
}

.hori-selector .left::before,
.hori-selector .right::before {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #5161ce;
  bottom: 0;
}


.navbar-nav>li {
  padding: 0 20px;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  display: block;
  transition-duration: 0.6s;
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: relative;
  width: 130px;
  text-align: center;
}

.navbar-nav>li.active {
  color: #fff;
  font-weight: 600;
  /* text-shadow: 1px 1px 5px #fff; */
  background-color: transparent;
  transition: all 0.7s;
}

.navbar-toggler {
  color: #fff;
  width: 60px;
  height: 60px;
}

@media(min-width: 992px) {
  .navbar-toggler {
    display: none;
  }
}


@media (max-width: 991px) {
  .navbar-logo {
    margin-left: 20px;
    font-size: 16px;
  }

  .navbar-nav {
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: #5161ce;
    overflow: hidden;
    height: 0;
    transition: .3s;
  }

  .navbar-nav>li {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: left;
    padding-left: 40px;
  }

  .navbar-toggler {
    width: 100%;
    height: 60px;
    text-align: right;
    padding-right: 30px;
  }

  .navbar-toggler button {
    width: 60px;
    height: 60px;
  }

  .hori-selector {
    margin-top: 0px;
    margin-left: 10px;
    border-radius: 0;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    width: calc(100% - 10px);
    height: 40px;
  }

  .hori-selector .left,
  .hori-selector .right {
    right: 0;
  }


  .hori-selector .left {
    top: -25px;
    left: auto;
  }

  .hori-selector .right {
    bottom: -25px;
    left: auto;
  }

  .hori-selector .left::before {
    left: -25px;
    top: -25px;
  }

  .hori-selector .right::before {
    left: -25px;
    bottom: -25px;
  }

  .menu-open-button {
    border-radius: 100%;
    width: 60px;
    height: 60px;
    margin-left: -40px;
    position: absolute;
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform ease-out 200ms;
    transition: -webkit-transform ease-out 200ms;
    transition: transform ease-out 200ms;
    transition: transform ease-out 200ms, -webkit-transform ease-out 200ms;
  }

  .lines {
    width: 25px;
    height: 3px;
    background: #fff;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scaleX(1);
    margin-left: -12.5px;
    margin-top: -1.5px;
    -webkit-transition: -webkit-transform 200ms;
    transition: -webkit-transform 200ms;
    transition: transform 200ms;
    transition: transform 200ms, -webkit-transform 200ms;
  }

  .line-1 {
    -webkit-transform: translate3d(0, -8px, 0);
    transform: translate3d(0, -8px, 0);
  }

  .line-2 {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .line-3 {
    -webkit-transform: translate3d(0, 8px, 0);
    transform: translate3d(0, 8px, 0);
  }
}


.navbarContent {
  transition: .2s;
  width: 100%;
  height: 60px;
  background-color: var(--themeColor);
  position: fixed;
  top: -60px;
  transform: translateY(-60px);
  z-index: 99;
}

.navbarContent :deep(div):nth-child(1) {
  margin: 0 auto;
  width: 1280px;
  display: flex;
  line-height: 60px;
  justify-content: space-between;
}

.navbarContent100 {
  position: fixed;
  top: -60px;
  transform: translateY(60px);
}
</style>
<style scoped>
/* .dark .navbar {
  background: var(--darkBgcolor) !important;
} */
</style>
