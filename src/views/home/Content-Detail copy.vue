<script setup lang='ts'>
import { onMounted, ref, getCurrentInstance } from 'vue'
import Icon from '@/components/icon.vue';
import Maincontent from '../../components/Maincontent.vue';
import { useEventListener } from '@vueuse/core'

const { proxy } = getCurrentInstance() as any
const tocList = ref<any>([]);
const tocACindex = ref<string>('#toc-head-1');
const listComment = ref([
  {
    name: '小红',
    time: '2022-10-03 12:00:00',
    content: '我入职时做过性格测试，我属于蓝色的！'
  },
  {
    name: '小明',
    time: '2022-10-01 12:00:00',
    content: '这是一条评论'
  },
])



onMounted(() => {
  //处理代码高亮行数显示
  let blocks = document.querySelectorAll('pre code');
  blocks.forEach((block: any) => {
    let rowCount = block.querySelectorAll('.hljs-ln-line.hljs-ln-n');
    rowCount.forEach((element: any) => {
      element.innerHTML = element.getAttribute('data-line-number')
    });
  })
  //获取当前文章的索引目录
  let toc = document.querySelectorAll('h3,h4') as any;
  toc.forEach((element: any) => {
    tocList.value.push({
      title: element.innerText,
      id: "#" + element.id,
      top: element.offsetTop,
      nodeName: element.nodeName
    })
  })
  //监听滚动事件
  handleScroll();
  setTimeout(() => {
    affixElm.value!.style.height = document.querySelector('.main')?.getBoundingClientRect().height + 'px';
  }, 500);
  proxy.$fancyapps.Fancybox.bind('[data-fancybox="gallery"]', {
    caption: function (fancybox: any, carousel: any, slide: any) {
      return (
        `${slide.index + 1} / ${carousel.slides.length} <br />` + slide.caption
      );
    },
  })
})
function setTimestamp(time: string) {
  return proxy.$common.timeAgo(time)
}
const affixElm = ref<HTMLElement | null>(null)
const scrollTop = ref<number>(0); // 记录当前的滚动距离
function handleScroll() {
  useEventListener(window, 'scroll', () => {
    scrollTop.value = window.scrollY;
    tocList.value.forEach((element: any) => {
      if (scrollTop.value >= element.top - 100) {
        tocACindex.value = element.id;
        document.querySelector('.affix-list li.H4')
      }
    })

  })
}


</script>

<template>
  <div class="detail">
    <div class="imgtop">
      <img src="http://localhost:1027/public/img/bg.jpg" alt="">
      <div class="topTitle center">
        <h2>中秋前后 II</h2>
        <p>lzy 2021-09-19 0条评论 中秋前后 II</p>
      </div>
    </div>
    <Maincontent></Maincontent>
    <div class="affix-container" ref="affixElm">
      <div class="affix">
        <div class="affix-title">
          <Icon :name="`icon-icon-taikong17`"></Icon>
          <span>目录</span>
        </div>
        <ul class="affix-list">
          <li v-for="item in tocList" :class="tocACindex == item.id ? 'active ' + item.nodeName : '' + item.nodeName"
            :key="item.id">
            <a :href="item.id">{{ item.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <footer class="post-footer center ">
      <div class="tool">
        <Icon :name="`icon-icon-taikong20`" :fill="`#000`"></Icon>
        <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0
          国际许可协议</a>
      </div>
      <div class="footer-flex">
        <div class="footer-sort">
          <a href="https://wp.gxnas.com/11358.html" rel="nofollow">NAS</a>
          <a href="https://wp.gxnas.com/11358.html#comments" rel="nofollow">折腾</a>
          <a href="https://wp.gxnas.com/11358.html#respond" rel="nofollow">日常</a>
        </div>
        <div class="footer-share">
          <Icon :name="`icon-icon-taikong1`" :fill="`#000`"></Icon>
          <span>分享</span>
        </div>
      </div>
    </footer>
    <div class="post-footer center turn">
      <div class="turnItem">
        <p>◀️上一篇</p>
        <p>欢迎访问！！！</p>
      </div>
      <div class="turnItem">
        <p>下一篇▶️</p>
        <p>国庆5日游</p>
      </div>
    </div>
    <div class="center comment">
      <h5>Comments | 3 条评论</h5>
      <div class="comContent">
        <div class="comment-item" v-for="(item, index) in listComment" :key="index">
          <div class="comment-item-left">
            <img src="http://localhost:1027/public/img/lzy.jpg" alt="">
          </div>
          <div class="comment-item-right">
            <div class="comment-item-right-top">
              <span class="comment-item-right-top-name">{{ item.name }}</span>
              <span class="comment-item-right-top-time">{{ setTimestamp(item.time) }}</span>
            </div>
            <div class="comment-item-right-bottom">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.detail {
  width: 100%;
  overflow-x: hidden;
  height: auto;
  background: rgb(255, 255, 255);
  background-image: linear-gradient(#eee 1px, transparent 0), linear-gradient(90deg, #eee 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;
}

.center {
  margin: 0 auto;
  width: 980px;
  overflow-x: hidden;
}

.imgtop {
  width: 100%;
  height: 400px;
  /* overflow: hidden; */
  position: relative;
  box-shadow: 1px 1px 10px 2px rgb(115, 115, 115);
}

.imgtop img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.topTitle {
  z-index: 2;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-shadow: 1px 2px 4px #000;
}

.topTitle h2 {
  font-size: 40px;
  margin-bottom: 20px;
  font-family: 'douyu';
}

.topTitle p {
  font-size: 20px;
  margin-bottom: 20px;
  text-indent: 0em
}


.post-footer {
  margin-top: 10px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, .2);
  border-radius: 10px;
  font-size: 16px;
}

.post-footer .tool {
  padding: 10px 0 0;
  text-align: center;
  line-height: 30px;
  cursor: var(--linkCup);
}

.post-footer .tool:hover {
  color: var(--themeColor);
  text-decoration: underline var(--themeColor);
}

.post-footer .tool:hover svg {
  fill: var(--themeColor) !important;
}

.post-footer svg {
  width: 26px !important;
  margin-right: 5px;
  display: inline-block;
  vertical-align: bottom;
}

.post-footer .footer-sort a {
  margin-right: 5px;
  font-size: 15px;
}

.footer-sort::before {
  content: '📒';
  margin-right: 10px
}

.footer-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5161ce;
  line-height: 30px;
  cursor: var(--linkCup);
  padding: 0 10px
}

.footer-flex svg {
  fill: #5161ce !important;
  vertical-align: bottom;
}

.footer-share {
  user-select: none;
}

.turn {
  padding: 0 !important;
  /* overflow: hidden; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, .2);
  border-radius: 10px;
  font-size: 16px;

}

.turnItem {
  flex: 1;
  cursor: var(--linkCup);
  padding: 10px 0;
  line-height: 30px;
  transition: .3s;
}

.turnItem:hover {
  background-color: rgb(115, 115, 115, .3);
}

.turnItem p {
  margin: 0;
}



.turnItem:nth-child(2) p {
  text-align: right;
  padding-right: 30px
}

.turnItem:nth-child(1) p {
  text-align: left;
  padding-left: 30px
}

.comment {
  font-size: 18px;
}

.comment h5 {
  margin: 30px 0;
}

.comment .comment-item {
  margin: 20px 0;
  display: flex;
}

.comment .comment-item img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
}

.comment-item-right-top {
  margin-bottom: 7px;
  letter-spacing: 3px;
}

.comment-item-right-top-name {
  font-size: 18px;
  font-weight: 600;
  color: #555;
}

.comment-item-right-top-time {
  font-size: 17px;
  color: #999;
  margin: 0 10px;
}

.affix-container {
  position: absolute;
  top: 480px;
  right: 30px;
  background-color: #fff;
  font-size: 16px;
  z-index: 1;
  width: 200px;
  height: 100%;
  background-color: transparent;
  right: calc(40% - 520px);
  padding-top: 10px;
  padding-bottom: 10px;
  transition: 1s;
}

.affix {
  position: sticky;
  top: 60px;
}

.affix-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #555;
  display: flex;
}

.affix-title svg {
  width: 30px !important;
  fill: #000 !important;
}

.affix-title span {
  line-height: 28px;
}

.affix-list .active {
  color: var(--themeColor);
}

.affix-list li.H3 {
  margin-left: 10px;
}

.affix-list li.H4 {
  margin-left: 20px;
}

.affix-list li:before {
  background-color: #ddd;
  content: ' ';
  display: inline-block;
  height: 25px;
  left: 0;
  margin-top: -1px;
  position: absolute;
  width: 2px;
}

.affix-list li:hover {
  color: var(--themeColor);
}

.affix-list li:hover:before {
  background-color: var(--themeColor);
}

.affix-list li.active:before {
  background-color: var(--themeColor);
}

.dark .detail {
  background: var(--darkBgcolor);
  color: #ffff;
}

.dark .detail .main {
  background: var(--darkBgcolor);
  box-shadow: 0px 0px 8px4px rgba(255, 255, 255, 0.2);
}

.dark .post-footer {
  background-color: var(--darkBgcolor);
}

.dark .post-footer .tool svg {
  fill: #fff !important;
}

.dark .comment-item-right-top-name {
  color: #fff;
}

.dark .affix-list .active {
  color: var(--textcolor);
}

.dark .affix-list li.active:before {
  background-color: var(--textcolor);
}

.dark .affix-title {
  color: #fff;
}

.dark .affix-title svg {
  fill: #fff !important;
}
</style>

