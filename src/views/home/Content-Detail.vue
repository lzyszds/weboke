<script setup lang='ts'>
import { onMounted, ref, reactive, getCurrentInstance, nextTick } from 'vue'
import { ElNotification } from 'element-plus'
import Maincontent from '../../components/Maincontent.vue';
// import { useEventListener } from '@vueuse/core'
import { useRoute } from 'vue-router';
import icon from '@/components/icon.vue'
import http from '@/http/http';
import ComImg from '@/assets/icon/comments/import'
import { commentsType } from './Detailtype'
import { number } from 'echarts';

const route = useRoute()
const aid = route.path.replace('/home/detail/', '') //获取当前文章id
const { data: dataDet } = await http('get', '/adminApi/admin/articleDetail?aid=' + aid) as any
const affixElm = ref<HTMLElement | null>(null)

const { proxy } = getCurrentInstance() as any
const tocList = ref<any>([]);
const tocACindex = ref<string>('#toc-head-1');
const listComment = ref<any>(await http('get', '/adminApi/admin/getComment?aid=' + aid) as any)

//评论上方的诗句请求
const textbefore = ref<String>('寻找中...')
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

/* 组件内部设定组件加载完成返回
返回后执行此方法来获取当前文章的目录 */
const updateCop = async (val: number) => {

  //获取当前文章的索引目录
  let toc = document.querySelectorAll('h2,h3,h4') as any;
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
  // handleScroll();

  await nextTick();
  if (affixElm.value) {
    affixElm.value!.style.height = document.querySelector('.main')?.getBoundingClientRect().height + 'px';
  }
}
onMounted(async () => {
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
let setTimestamp = (time: string) => {
  //他妈的这里巨奇怪，不知道为什么这个方法会被下面handleScroll方法一直调用真的迷
  return proxy.$common.timeAgo(time)
}

//当前内容的滚动距离，用于判断目录的高亮   但是好像有点问题先不用了
// const scrollTop = ref<number>(0); // 记录当前的滚动距离
// function handleScroll() {
//   useEventListener(window, 'scroll', () => {
//     scrollTop.value = window.scrollY;
//     tocList.value.forEach((element: any) => {
//       if (scrollTop.value - 400 >= element.top) {
//         tocACindex.value = element.id;
//       }
//     })
//   })
// }

//处理目录小火箭点击事件 升到最顶部
const toUp = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

//评论人个人信息
const information = reactive({
  name: '',
  email: '',
  webSite: '',
  comContent: '',
  nameError: false,
  emailError: false,
})

//回复评论初始变量
const replyId = ref<any>([])
listComment.value.data.forEach(() => {
  replyId.value.push(-1)
});
//评论内容
//评论提交
const comSubmit = () => {
  ElNotification.closeAll()
  const cation = proxy.$common.LNotification
  if (information.comContent.length == 0) {
    return cation('评论内容不能为空')
  } else if (information.name == '') {
    information.nameError = true
    setTimeout(() => {
      information.nameError = false
    }, 820);
    return cation('昵称不能为空')

  } else if (information.email == '') {
    information.emailError = true
    setTimeout(() => {
      information.emailError = false
    }, 820);
    return cation('邮箱不能为空')
  }
  //处理回复评论的id 判断其否为二级评论，-1为一级评论，否则为二级评论
  const replyIdval = () => {
    let value = -1
    replyId.value.forEach(element => {
      if (element != -1) return value = element
    });
    return value
  }
  const commentData: commentsType = {
    aid: Number(aid), //文章id
    replyId: replyIdval(), //回复评论的id
    name: information.name, //评论人昵称
    email: information.email, //评论人邮箱
    webSite: information.webSite, //评论人网站
    content: information.comContent, //评论内容
    imgIndex: rangeIndex, //评论人头像
    userIp: '', //用户ip
  }
  http('post', '/adminApi/admin/addComment', commentData).then(async (res: any) => {
    if (res.code == 200) {
      cation(`评论成功,感谢你的评论！`)
      listComment.value = await http('get', '/adminApi/admin/getComment?aid=' + aid) as any
      Object.keys(information).map(key => {
        information[key] = ''
      })
    } else {
      proxy.$message({
        message: '评论失败',
        type: 'error'
      })
    }
  })
}

//回复评论初始变量
const replyName = ref<string>('发表评论')
//回复评论
const replyComment = (item, index) => {
  //每次选择回复都要将其他的回复id置为-1
  Object.keys(replyId.value).forEach((key: any) => {
    replyId.value[key] = -1
  })
  replyId.value[index] = item.comId
  replyName.value = '@' + item.user_name
  //给textarea获取焦点
  const textarea = document.querySelector('#textarea') as any
  textarea?.focus()
}
//取消回复
const remReplyComment = (index) => {
  replyId.value[index] = -1
  replyName.value = '发表评论'
}
// function handleReplyLevel() {

// }

//当前图片的索引
var rangeIndex = 0
//评论头像更换事件
function setRange(direction: string) {
  const defaultval = 60 //每个图片距离的宽度
  const selcetRound = document.querySelector('#selcetRound') as HTMLSpanElement;
  //获取父元素
  const parent = selcetRound.parentElement as HTMLDivElement;

  direction == 'left' ? rangeIndex-- : rangeIndex++;
  if (rangeIndex >= 0 && rangeIndex < 2) {
    selcetRound.style.transform = `translateX(${defaultval * rangeIndex}px)`
  } else if (rangeIndex >= 2 && rangeIndex < 9) {
    selcetRound.style.transform = `translateX(${defaultval * rangeIndex}px)`
    parent.scrollTo(defaultval * (rangeIndex - 2), 0)
  } else if (rangeIndex >= 9 && rangeIndex < 12) {
    selcetRound.style.transform = `translateX(${defaultval * rangeIndex}px)`
  } else {
    if (rangeIndex <= 0) rangeIndex = 0;
    if (rangeIndex >= 11) rangeIndex = 11;
  }
}



</script>

<template>
  <div class="detail">
    <!-- 文章封面 -->
    <div class="imgtop">
      <img :src="'/adminApi' + dataDet.coverImg" alt="">
      <div class="topTitle center">
        <h1>{{ dataDet.title }}</h1>
        <p>{{ dataDet.author }} {{ setTimestamp(dataDet.createTime) }} {{ dataDet.comNumber }}条评论</p>
      </div>
    </div>
    <!-- 文章类型 -->
    <div class="detBreadcrumb center">
      <div class="boxType">
        <el-tag class="ml-1" type="info" v-for="(item, index) in dataDet.wtype ? dataDet.wtype.split(',') : []"
          :key="index">{{ item }}
        </el-tag>
      </div>
    </div>
    <!-- 文章内容 -->
    <Maincontent :main="dataDet.main" @update="updateCop"></Maincontent>
    <!-- 文章目录 -->
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
    <!-- 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 -->
    <footer class="post-footer center ">
      <div class="tool">
        <lzyIcon :name="`icon-icon-taikong20`" :fill="`#000`"></lzyIcon>
        <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0
          国际许可协议</a>
      </div>
    </footer>
    <!-- 评论界面 -->
    <div class="borderw center">
      <div class="before">{{ textbefore }}</div>
      <div class=" comment">
        <h5>
          <icon name="icon-icon-taikong13"></icon>评论
        </h5>
        <div class="comContent">
          <div class="comment-item" v-for="(item, index) in listComment.data" :key="index">
            <div class="comment-item-left">
              <img :src="item.head_img" alt="">
            </div>
            <div class="comment-item-right">
              <div class="comment-item-right-top">
                <span class="comment-item-right-top-name">{{ item.user_name }}</span>
                <span class="comment-item-right-top-time">{{ setTimestamp(item.time) }}</span>
                <button v-if="replyId[index] == -1" class="comment-item-right-top-reply"
                  @click="replyComment(item, index)">回复</button>
                <button v-else class="comment-item-right-top-reply" @click="remReplyComment(index)">取消回复</button>
              </div>
              <div class="comment-item-right-bottom">
                {{ item.content }}
              </div>
            </div>
            <div class="comment-reply">
              <div class="comment-item" v-for="(res, i) in item.reply" :key="i">
                <div class="comment-item-left">
                  <img :src="res.head_img" alt="">
                </div>
                <div class="comment-item-right">
                  <div class="comment-item-right-top">
                    <span class="comment-item-right-top-name">{{ res.user_name }}</span>
                    <span class="comment-item-right-top-time">{{ setTimestamp(res.time) }}</span>
                    <button v-if="replyId[i] == -1" class="comment-item-right-top-reply"
                      @click="replyComment(res, i)">回复</button>
                    <button v-else class="comment-item-right-top-reply" @click="remReplyComment(i)">取消回复</button>
                  </div>
                  <div class="comment-item-right-bottom">
                    <span>{{ res.replyPeople }}</span>
                    {{ res.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 发布评论 -->
    <div class="publish center">
      <div class=" borderw">
        <div class="comment ">
          <span> {{ replyName }} </span>
        </div>
        <div class="comment textareas">
          <textarea id="textarea" v-model="information.comContent"></textarea>
        </div>
      </div>
      <div class="borderw nameqq">
        <div class="comment">
          <div>
            <button @click="setRange('left')"><i class="fa fa-caret-left"></i> </button>
            <p>
              <span id="selcetRound"></span>
              <img v-for="(item, index) in ComImg" :key="index" :src="item" alt="">
            </p>
            <button @click="setRange('right')"><i class="fa fa-caret-right"></i> </button>
          </div>
          <p>昵称：
            <input type="text" :class="{ 'apply-shake': information.nameError }" v-model="information.name"
              placeholder="昵称或者QQ号">
          </p>
          <p>邮箱：
            <input type="text" :class="{ 'apply-shake': information.emailError }" v-model="information.email"
              placeholder="xxx@xxx.xxx">
          </p>
          <p>网站：
            <input type="text" v-model="information.webSite" placeholder="你的网站(选填)">
          </p>
          <p class="btn"><button @click="comSubmit"> 发布评论 </button></p>
          <!-- <p class="btn del"><button> 取消评论 </button></p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import url('@/assets/css/contentDetail.less');


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

