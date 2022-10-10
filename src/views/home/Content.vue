<script setup lang='ts'>
import { ref, reactive, onMounted, getCurrentInstance, nextTick } from 'vue'
import ContentHead from '@/components/Content-head.vue'
import ContentDiv from '@/components/Content-div.vue'
import anime from 'animejs';
const list = reactive([{ information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } }, { information: { taikong13: 'lzy', taikong9: '2021-09-19', taikong17: '0', }, content: { title: '中秋前后 II', text: `上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇 是2019年了，那是我刚上研究生的时候，时隔三年。今年生日的时候本来是想写一篇博文，但是写了一上一篇`, image: 'http://localhost:1024/img/bg.jpg' } },])
const { proxy } = getCurrentInstance() as any
const listNew = ref(proxy.$common.splitArray(list, 5))
const indexList = ref(0)
const isload = ref(true)
// onMounted(() => {
//   anmieFn()
// })
const currentChange = (e: number) => {
  isload.value = false
  indexList.value = e - 1
  nextTick(() => {
    isload.value = true
    // nextTick(() => {
    //   anmieFn('1%', 500)
    // })
  })
}
// function anmieFn(x = '1%', time = 100) {
//   anime({
//     targets: '.listSum .conDiv',
//     translateX: x,
//     opacity: 1,
//     delay: anime.stagger(time, { start: 100 })
//   });
// }
</script>

<template>
  <div class="content">
    <ContentHead></ContentHead>
    <div class="listSum">
      <!-- 文章内容 -->
      <div class="listCom" v-if="isload">
        <router-link v-for="(item,index) in listNew[indexList]" :key="index" :to="`/home/detail/`+index">
          <ContentDiv :data="item">
          </ContentDiv>
        </router-link>
      </div>
      <!-- 文章分页 -->
      <div class="example-pagination-block lzy-center">
        <div class="example-demonstration">When the content ends, turn the page to see the new content</div>
        <el-pagination layout="prev, pager, next" :total="listNew.length*10" @current-change="currentChange" />
      </div>
    </div>

  </div>
</template>

<style scoped>
.content {
  width: 100%;
  height: inherit;
  background: url('http://localhost:1024/img/leftbg.jpg') no-repeat fixed;
  background-size: 100%;
  background-position-y: -30px;
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
  padding: 40px;
  padding-top: 0;
  height: calc(100% - 48px);
  width: 960px;
  margin: 0 auto;
}

.listCom {
  padding: 40px;
  width: 100%;
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

.lzy-center>>>.el-pagination {
  justify-content: center;
}

.lzy-center>>>.el-pager li.active {
  color: var(--themeColor);
}

.lzy-center>>>.el-pager li:hover {
  color: var(--themeColor);
}

.listSum>>>.example-pagination-block {
  width: 50%;
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  background-color: #fff;
}

.example-demonstration {
  padding: 2px !important;
}
</style>
<style scoped>
.dark .magics {
  background: var(--darkBgcolor) !important;
}

.dark .conDiv {
  background: var(--darkBgcolor);
  box-shadow: 0px 0px 0px 1px #fff;
  ;
}

.dark .conDiv>>>.conDiv_text div {
  color: var(--darkColor);
}

.dark .conDiv>>>.conDiv_text .title {
  color: var(--bgcolor);
}

.dark .content {
  background: var(--darkBgcolor) !important;
}

.dark .lzy-center {
  background: var(--darkBgcolor) !important;
  color: var(--bgcolor);
}

.dark .lzy-center>>>.el-pagination button,
.dark .lzy-center>>>.el-pagination li {
  background: var(--darkBgcolor) !important;
  color: var(--bgcolor);
}
</style>
