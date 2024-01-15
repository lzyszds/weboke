<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElPagination } from 'element-plus'
import ContentHead from '@/components/Content-head.vue'
import ContentDiv from '@/components/Content-div.vue'
import { useEventListener } from '@vueuse/core'
import http from '@/http/http';
const api = import.meta.env.VITE_BASE_URL


const limit = 5
const indexList = ref(1)
const { total, data } = await http('get', api + '/overtApis/articleList?pages=' + indexList.value + '&limit=' + limit) as any
const list: any = ref(data)
const totals = ref(total)
const isload = ref(true)
const isloaded = ref(false)
//此处为分页器的回调函数 
const currentChange = (e: number) => {
  /*
    这三行代码解决了分页器,每次执行时会让dom抖动的问题 
    具体逻辑是，每次切换有页数时页数内容变化，会导致页面高度变化，从而导致页面抖动
    所以在切换页数时，先把页面高度固定，然后再去请求数据，请求完数据后再把页面高度变回来
  */
  const listCom = document.querySelector('.listCom') as HTMLDivElement
  const listComHeight = listCom.offsetTop
  listCom.style.height = listComHeight + 'px'
  //将当前页重新渲染，vue才能监听到数据的变化
  isload.value = false
  //当前页数
  indexList.value = e
  http('get', api + '/overtApis/articleList?pages=' + indexList.value + '&limit=' + limit).then((res: any) => {
    //跳转路径
    list.value = res.data
    isload.value = true
    //将页面高度变回来
    listCom.style.height = 'auto'
  })
}
onMounted(() => {
  // setTimeout(() => {
  //   maskShow.value = false
  // }, 1000)
  //控制滚动到指定位置，固定背景人物
  useEventListener(window, 'scroll', () => {
    const y = window.scrollY
    if (y >= 200) {
      isloaded.value = false
    } else {
      isloaded.value = true
    }
    const listSum = document.querySelector('#listSum') as HTMLElement
    const example = document.querySelector('#example') as HTMLElement
    if (!example) return
    if (y >= 820) {
      listSum.style.transform = 'translateY(154px)'
      listSum.style.position = 'fixed'
    } else {
      listSum.style.transform = 'translateY(974px)'
      listSum.style.position = 'absolute'
    }
    if (y >= 300) {
      example.style.bottom = '0'
    } else {
      example.style.bottom = '-100px'
    }
  })

  setTimeout(() => {
    isloaded.value = true
  }, 1000)
})
onBeforeUnmount(() => {
  list.value = []
  const listSum = document.querySelector('#listSum') as HTMLElement
  const example = document.querySelector('#example') as HTMLElement
  if (document.querySelector('.navbarContent')) {
    example.style.opacity = '1'
    listSum.style.transform = 'translateY(1012px)'
    listSum.style.position = 'absolute'
  }
})
const URL = import.meta.env.VITE_BASE_HTTP
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
      <!-- 遮罩 -->
      <!-- <transition name="mask">
        <div v-if="!store.dark" class="mask"></div>
      </transition> -->
      <div class="conImg">
        <div class="navbar-logo" @click="() => isloaded = !isloaded" :class="isloaded ? 'loaded' : ''">
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
        </div>
        <img :src="URL + '/public/img/101608761_p0.jpg'" alt="">
      </div>
    </div>
    <ContentHead></ContentHead>
    <div class="listSum">
      <!-- 文章内容 -->
      <div class="listCom">
        <img class="listImg" id="listSum" :src="URL + '/public/img/reduce.jpg'" alt="">
        <div :id="'list' + item.aid" v-for="(item, index) in list" :key="index" v-if="isload">
          <router-link :to="'/home/detail/' + item.aid">
            <ContentDiv :data="item" :index="index"></ContentDiv>
          </router-link>
        </div>

      </div>
      <!-- 文章分页 -->
      <div class="example-pagination-block lzy-center" id="example">
        <div class="example-demonstration">When the content ends, turn the page to see the new content</div>
        <el-pagination :page-size="limit" layout="prev, pager, next" :total="totals" @current-change="currentChange" />
      </div>
    </div>

  </div>
</template>

<style  lang="less" scoped>
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
    background-image: radial-gradient(rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(255, 255, 255, 0) 33%, rgba(0, 0, 0, .3) 166%), linear-gradient(0, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 0% 80%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, .4) 100%);
    animation: slide-out-fwd-bl_lzy 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
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

  .navbar-logo {
    position: absolute;
    left: 10%;
    top: 30%;
    /* 计算最大值与最小值，跟随页面大小变化 */
    font-size: clamp(30px, 7vw, 20vw);
    color: #fff;
    font-family: 'Slackey';
    user-select: none;
    cursor: pointer;

    &>span {
      display: inline-block;
      overflow: hidden;
      transition-duration: 0.2s;
      transition-property: transform;
      text-align: center;

      span {
        display: inline-block;
        transition-duration: 0.5s;
        transition-property: transform;
        transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      &:nth-child(odd) {
        transform: translateY(50%);

        span {
          transform: translateY(-100%);
        }
      }

      &:nth-child(even) {
        transform: translateY(-50%);

        span {
          transform: translateY(100%);
        }
      }
    }

    &.loaded>span {
      transform: translateY(0);
    }

    &.loaded>span span {
      transform: translateY(0);
    }

  }
}

.conImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  transform: translateY(300px);
  z-index: -1;
}

.listCom {
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

.listCom::-webkit-scrollbar {
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
  transition: bottom .22s cubic-bezier(0.645, 0.045, 0.355, 1);
  opacity: 1;
  height: 50px;
  width: 100vw;
  position: fixed;
  left: 0;
  bottom: -100px;
  /* transform: translateX(-50%); */
  background-color: #fff;
}

.example-demonstration {
  padding: 2px !important;
}
</style>
<style scoped>
.dark .conDiv {
  background: var(--darkBgcolor);
  box-shadow: 0px 0px 0px 1px #ffffff6a;
}

.dark .conDiv :deep(.conDiv_text) div,
.dark .lzy-center,
.dark .conDiv :deep(.conDiv_text) .title,
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
@import url('@/assets/css/mobile/homeMobile.less');
</style>
