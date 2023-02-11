<script setup lang='ts'>
import { onMounted, ref, getCurrentInstance } from 'vue'
import Maincontent from '../../components/Maincontent.vue';
import { useEventListener } from '@vueuse/core'
import { useRoute } from 'vue-router';
import icon from '@/components/icon.vue'
import http from '@/http/http';

const route = useRoute()
const aid = route.path.replace('/home/detail/', '') //获取当前文章id
const dataDet = ref<any>(await http('get', '/adminApi/admin/articleDetail?aid=' + aid))
dataDet.value = dataDet.value.data //获取当前页面的文章内容
const affixElm = ref<HTMLElement | null>(null)


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
// const articleList = await http('get', '/articleList')

const textbefore = ref('寻找中...')
try {
  const result = await http('get', '/getIp/sentence') as any
  textbefore.value = result.data.content
} catch (e) {
  console.log("请求频率上限：" + e + "两秒后重新请求")
  setTimeout(async () => {
    const result = await http('get', '/getIp/sentence') as any
    textbefore.value = result.data.content
  }, 2000)
}


const updateCop = (val: number) => {
  console.log(val);
  //获取当前文章的索引目录
  let toc = document.querySelectorAll('h2,h3,h4') as any;
  console.log(`lzy  toc`, toc)
  toc.forEach((element: any) => {
    tocList.value.push({
      title: element.innerText,
      id: "#" + element.id,
      top: element.offsetTop,
      nodeName: element.nodeName
    })
    // element.setAttribute('tabindex', "-1")
  })

  //监听滚动事件
  handleScroll();
  let timeout = setTimeout(() => {
    console.log(`lzy ~ affixElm.value`, affixElm.value)
    affixElm.value!.style.height = document.querySelector('.main')?.getBoundingClientRect().height + 'px';
    clearTimeout(timeout)
  }, 500);
  //结束定时器

}
onMounted(() => {
  //处理代码高亮行数显示
  let blocks = document.querySelectorAll('pre code');
  blocks.forEach((block: any) => {
    let rowCount = block.querySelectorAll('.hljs-ln-line.hljs-ln-n');
    rowCount.forEach((element: any) => {
      element.innerHTML = element.getAttribute('data-line-number')
    });
  })


})
//处理时间戳转换成距离当前日期的时间（一天前，两天前）
function setTimestamp(time: string) {
  return proxy.$common.timeAgo(time)
}
const scrollTop = ref<number>(0); // 记录当前的滚动距离
function handleScroll() {
  useEventListener(window, 'scroll', () => {
    scrollTop.value = window.scrollY;
    tocList.value.forEach((element: any) => {
      if (scrollTop.value - 400 >= element.top) {
        tocACindex.value = element.id;
        document.querySelector('.affix-list li.H4')
      }
    })
  })
}
//处理目录小火箭点击事件 升到最顶部
const toUp = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

</script>

<template>
  <div class="detail">
    <div class="imgtop">
      <img :src="'/adminApi' + dataDet.coverImg" alt="">
      <div class="topTitle center">
        <h1>{{ dataDet.title }}</h1>
        <p>{{ dataDet.author }} {{ setTimestamp(dataDet.createTime) }} {{ dataDet.comNumber }}条评论</p>
      </div>
    </div>
    <div class="center detBreadcrumb ">
      <div class="boxType">
        <el-tag class="ml-1" type="info" v-for="(item, index) in dataDet.wtype ? dataDet.wtype.split(',') : []"
          :key="index">{{ item }}
        </el-tag>
      </div>
    </div>

    <Maincontent :main="dataDet.main" @update="updateCop"></Maincontent>

    <div class="affix-container" ref="affixElm" v-if="tocList.length != 0">
      <div class="affix">
        <div class="affix_item">
          <div class="affix-title" @click="toUp">
            <lzyIcon :name="`icon-icon-taikong17`"></lzyIcon>
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
    </div>
    <footer class="post-footer center ">
      <div class="tool">
        <lzyIcon :name="`icon-icon-taikong20`" :fill="`#000`"></lzyIcon>
        <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0
          国际许可协议</a>
      </div>
    </footer>
    <div class="borderw center">
      <div class="before">{{ textbefore }}</div>
      <div class=" comment">
        <h5>
          <icon name="icon-icon-taikong13"></icon>评论
        </h5>
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
    <!-- <div class=" center">
      <div class="comment publish">
        <h4>
          <icon name="icon-icon-taikong8"></icon>发表评论
        </h4>
      </div>
    </div> -->
    <div class="center publish">
      <div class=" borderw">
        <div class="comment ">
          <h4>
            <icon name="icon-icon-taikong8"></icon>发表评论
          </h4>
        </div>
        <div class="comment textareas">
          <textarea></textarea>
        </div>
      </div>
      <div class="borderw nameQQ">
        <div class="comment">
          <p>昵称：
            <input type="text" placeholder="昵称或者QQ号">
          </p>
          <p>邮箱：
            <input type="text" placeholder="昵称或者QQ号">
          </p>
          <p>网站：
            <input type="text" placeholder="昵称或者QQ号">
          </p>
          <p class="btn"><button> 发布评论 </button></p>
          <p class="btn del"><button> 取消评论 </button></p>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="less" scoped>
.detail {
  width: 100%;
  overflow-x: hidden;
  height: auto;
  background: rgb(255, 255, 255);
  background-image: linear-gradient(#eee 1px, transparent 0), linear-gradient(90deg, #eee 1px, transparent 0);
  background-size: 28px 28px;
  background-repeat: repeat;

  .detBreadcrumb {
    padding: 10px;
    margin-top: 20px;
    border: none;
    // background: var(--themeColor); 
    overflow: hidden;
    border-radius: 10px;
    // border: 3px solid #000;
    font-family: 'almama';

    & .boxType {
      // flex: 1;
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      overflow-x: auto;
      text-overflow: inherit;
      border: none;
      outline: none;
      font-size: 20px;
      white-space: nowrap;
      margin: 0 30px 0 0;
      line-height: 35px;

      .ml-1 {
        margin-left: 10px;
      }

      &:deep(.el-tag.el-tag--info) {
        background-color: crimson;
        color: #fff;
        border: 2px solid #000;

        &:nth-child(1) {
          margin-left: 0;
        }
      }
    }
  }
}


.center {
  margin: 0 auto;
  width: 980px;
  overflow-x: hidden;

  h5 {
    display: flex;
    font-size: 30px;
    line-height: 50px;

    svg {
      width: 50px !important;
      font-size: 50px;
      fill: #000 !important;
    }
  }
}

.imgtop {
  width: 100%;
  height: 400px;
  /* overflow: hidden; */
  position: relative;
  box-shadow: 1px 1px 10px 2px rgb(115, 115, 115);
}

.imgtop img {
  filter: brightness(.5);
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

.topTitle h1 {
  font-size: 40px;
  margin-bottom: 20px;
  font-family: 'almama';
}

.topTitle p {
  font-size: 20px;
  margin-bottom: 20px;
  text-indent: 0em
}


.post-footer {
  margin-top: 10px;
  padding: 5px;
  border-radius: 15px;
  font-size: 16px;
  background-color: var(--themeColor);
  border: 4px solid #000;
  font-family: 'dindin';

  svg {
    width: 30px !important;
    height: 30px;
    margin-right: 5px;
    display: inline-block;
    vertical-align: bottom;
  }

  .tool {
    border: 3px solid #000;
    padding: 10px;
    text-align: center;
    border-radius: 15px;
    line-height: 30px;
    cursor: var(--linkCup);
    background-color: #fff;

    :hover {
      color: var(--themeColor);
      text-decoration: underline var(--themeColor);

      svg {
        fill: var(--themeColor) !important;
      }
    }
  }
}

.borderw {
  border-radius: 20px;
  border: 4px solid #000;
  margin-top: 20px;
  padding: 10px;
  background-color: var(--themeColor);
  position: relative;

  & .before {
    user-select: none;
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 80px;
    border-radius: 50%;
    border: 4px solid #000;
    z-index: 2;
    background-color: #ffe14d;
    box-shadow: -1px 3px 1px 0px #fff,
      -1px 3px 3px 5px #000;
    color: #000;
    text-align: center;
    line-height: 100px;
    font-size: 15px;
    font-family: 'almama';
    /* 超出部分显示省略号 */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
}

.comment {
  font-size: 18px;
  background: #fff;
  border: 3px solid #000;
  border-radius: 30px;
  padding: 0 20px;
  position: relative;

  h5 {
    margin: 30px 0;
  }

  .comment-item {
    margin: 20px 0;
    display: flex;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
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

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 3px solid #000;
    background-color: #7588ff;
  }

  &::after {
    content: '';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 3px solid #000;
    background-color: #7588ff;
  }
}

.publish {
  height: 300px;
  display: flex;
  justify-content: space-between;

  &>.borderw {
    width: 49%;
    box-sizing: border-box;

    h4 {
      display: flex;
      margin: 5px 10px;
      align-items: center;
      justify-content: center;
    }

    .icon {
      width: 30px !important;
      height: 30px;
    }

    .textareas {
      height: 77%;
      margin-top: 10px;
      padding: 0;
      border-radius: 0;

      &:before,
      &:after {
        display: none;
      }

      &>textarea {
        width: 91% !important;
        height: 154px !important;
        padding: 20px;
        font-family: 'dindin';
        font-size: 18px;
        border: none;
        resize: none;
        // border-radius: 30px;

        &:focus-visible {
          border: none;
          outline: none;
        }
      }

    }
  }

  &>.nameQQ {
    .comment {
      font-family: 'dindin';
      padding: 30px 10px 0px;

      &::before,
      &::after {
        display: none;
      }

      p {
        margin: 10px 15px;
        font-size: 18px;

        input {
          width: 70%;
          font-size: 16px;
          border: 2px solid var(--themeColor);
          border-radius: 10px;
          padding: 5px;

          &:focus-visible {
            outline: none;
          }
        }

        &.btn {
          text-align: center;

          &.del {
            button {
              background-color: var(--delColor);
              color: #fff;

            }
          }

          button {
            background-color: var(--borderColor);
            width: 70%;
            border-radius: 30px;
            margin: 4px;
            font-family: 'dindin';
          }
        }

      }


    }
  }

  &::before {
    display: none;
  }


}


.affix-container {
  position: absolute;
  top: 510px;
  left: calc(50% + 520px);
  background-color: #fff;
  font-size: 16px;
  z-index: 1;
  // width: 200px;
  height: calc(100% - 20px);
  background-color: transparent;
  // padding-top: 10px;
  padding-bottom: 10px;
  transition: 1s;

  .affix {
    position: sticky;
    top: 60px;
    border: 3px solid #000;
    border-radius: 20px;
    background-color: var(--themeColor);
    padding: 6px;
    font-family: 'dindin';

    .affix_item {
      border-radius: 10px;
      background-color: #fff;
      padding: 10px;
      border: 3px solid #000;

      .affix-title {
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 600;
        color: #555;
        display: flex;
        justify-content: center;
        background-color: #ffe14d;
        border-radius: 10px;
        user-select: none;

        svg {
          fill: #000;
          width: 30px !important;
          height: 30px;
        }

        span {
          line-height: 28px;
        }
      }

      .affix-list {
        padding: 0 10px;
        list-style: none;
        margin: 0;

        &>li.active {
          color: var(--themeColor);

          &::before {
            z-index: 10;
          }
        }

        &>li.H2 {
          font-weight: 600;
        }

        &>li.H3 {
          margin-left: 10px;
        }

        &>li.H4 {
          margin-left: 20px;
        }

        &>li:before {
          background-color: transparent;
          content: ' ';
          display: inline-block;
          height: 25px;
          left: 15px;
          margin-top: -1px;
          position: absolute;
          width: 3px;
          border-radius: 30px;
        }

        &>li:hover {
          color: var(--themeColor);

        }

        &>li:hover:before {
          background-color: var(--themeColor);
          z-index: 10;
        }

        &>li.active:before {
          background-color: var(--themeColor);
        }
      }
    }
  }
}

.dark {
  .imgtop {
    box-shadow: none;
  }

  .detail {
    background: var(--darkBgcolor);
    color: #ffff;

  }

  .post-footer {

    .tool {
      background-color: var(--darkBgcolor);

      svg {
        fill: #fff !important;
      }
    }
  }

  .comment-item-right-top-name {
    color: #fff;
  }

  .affix-title {
    color: #fff;

    &>svg {
      fill: #fff !important;
    }
  }

  .comment {
    background: var(--darkBgcolor);
    color: #fff;

    h5 svg {
      fill: #fff !important;
    }
  }
}
</style>

