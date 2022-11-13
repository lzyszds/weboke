<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ContentHead from '@/components/Content-head.vue'
import ContentDiv from '@/components/Content-div.vue'
import { useEventListener } from '@vueuse/core'
import http from '@/http/http';
const limit = 5
const indexList = ref(1)
const { total, data } = await http('get', '/admin/articleList?pages=' + indexList.value + '&limit=' + limit) as any
const list: any = ref(data)
const totals = ref(total)
const isload = ref(true)
const currentChange = (e: number) => {
  isload.value = false
  indexList.value = e
  http('get', '/admin/articleList?pages=' + indexList.value + '&limit=' + limit).then((res: any) => {
    list.value = res.data
    isload.value = true
  })
}
onMounted(() => {
  useEventListener(window, 'scroll', () => {
    const listSum = document.querySelector('#listSum') as HTMLElement
    const example = document.querySelector('#example') as HTMLElement
    if (!example) return
    if (window.scrollY >= 820) {
      listSum.style.transform = 'translateY(154px)'
      listSum.style.position = 'fixed'
    } else {
      listSum.style.transform = 'translateY(974px)'
      listSum.style.position = 'absolute'
    }
    if (window.scrollY >= 300) {
      example.style.opacity = '1'
    } else {
      example.style.opacity = '0'
    }
  })
})
onBeforeUnmount(() => {
  const listSum = document.querySelector('#listSum') as HTMLElement
  const example = document.querySelector('#example') as HTMLElement
  if (document.querySelector('.navbarContent')) {
    example.style.opacity = '0'
    listSum.style.transform = 'translateY(1012px)'
    listSum.style.position = 'absolute'
  }
})

</script>

<template>
  <div class="content">
    <div class="home" id="eleme"> </div>
    <ContentHead></ContentHead>
    <div class="listSum">
      <!-- 文章内容 -->
      <div class="listCom">
        <img v-lazy class="listImg" id="listSum" src="http://localhost:1027/public/img/leftbg2.jpg" alt="">
        <div :id="'list' + item.aid" v-for="(item, index) in list" :key="index" v-if="isload">
          <router-link :to="'/home/detail/' + item.aid">
            <ContentDiv :data="item"></ContentDiv>
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

<style scoped>
.dark .home {
  background: url('http://localhost:1027/public/img/12.jpg') no-repeat center center;
  background-size: cover;
}

.home {
  width: 100%;
  height: 100vh;
  background: url('http://localhost:1027/public/img/101608761_p0.png') no-repeat center center;
  background-size: cover;
}

.content {
  width: 100%;
  height: inherit;
  overflow-x: hidden;
}

.conImg {
  width: 100%;
  height: 600px
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
  overflow: hidden scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
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
  transition: .22s;
  opacity: 0;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
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
  box-shadow: 0px 0px 0px 1px #fff;
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

@keyframes lzy {
  0% {
    opacity: 0;
    transform: translateY(100px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
