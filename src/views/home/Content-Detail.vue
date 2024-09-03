<script setup lang='ts'>
import { ElNotification } from 'element-plus'
import Maincontent from '@/components/Maincontent.vue';
// import { useEventListener } from '@vueuse/core'
import { useRoute } from "vue-router";
import comImg from '@/assets/icon/comments/import'
import { commentsType, Replydata } from './Detailtype'
import Reply from '@/views/home/Reply.vue'
import { allFunction, awaitTime, scrollTo, numFormat } from '@/utils/common'
import LzyIcon from '@/components/LzyIcon.vue';
import { useEventListener } from '@vueuse/core'
import { getPoetry } from '@/api/home/public'
import { getArticleComment, postRemarkList } from '@/api/home/comment';
import { getArticleDetail } from '@/api/home/article';

const overloading = ref(false) //重载评论组件，解决评论后评论组件不刷新的问题

const route = useRoute()
const aid = route.path.replace('/home/detail/', '') //获取当前文章id
const dataDet = await getArticleDetail(Number(aid)) //获取当前文章详情
const affixElm = ref<HTMLElement | null>(null)
dataDet.cover_img = '/firstHonoApi/static' + dataDet.cover_img
const tip = allFunction.LNotification // 右下角提示
const tocList = ref<any>([]);
const tocACindex = ref<string>('#toc-head-1');
const remarkList = ref<Replydata[]>([])//评论列表
const oldRemarkList = ref<Replydata[]>([])//未栅格化的评论列表

const replyArr = reactive({
  replyId: new Map(),//回复评论的id
  replyName: '发表评论',//回复评论初始变量
})

// 获取评论列表
const getRemarkList = async () => {
  const replyId = replyArr.replyId
  //初始的评论列表
  const data = await getArticleComment(aid)
  oldRemarkList.value = data
  remarkList.value = []
  //初始化回复评论的id
  data.forEach(remark => {
    remark.children = []
    replyId.set(remark.comment_id, {
      isReply: false,
      ground_id: remark.comment_id
    })
  })
  // 遍历评论列表，为每个评论添加回复列表
  for (let item of data) {
    if (item.reply_id == 0) {
      remarkList.value.push(item)
    } else {
      for (let remark of data) {
        if (remark.comment_id == item.ground_id) {
          remark.children.push(item)
        }
      }
    }
  }
}
await getRemarkList()
//评论上方的诗句请求
const textbefore = ref<String>('寻找中...')
setTimeout(async () => {
  const { content } = await getPoetry()
  textbefore.value = content
}, 50);

/* 组件内部设定组件加载完成返回
返回后执行此方法来获取当前文章的目录 */
const updateCop = async () => {
  tocList.value = []
  //获取当前文章的索引目录
  let toc = document.querySelectorAll('.main h2,.main h3,.main h4') as any;
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
  // if (affixElm.value) {
  //   affixElm.value!.style.height = document.querySelector('.main')?.getBoundingClientRect().height + 'px';
  // }
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
  setTimeout(() => {
    resizeWidth()
    document.querySelector('body')!.classList.remove('loading')
  }, 500)
})
//处理时间戳转换成距离当前日期的时间（一天前，两天前）
let setTimestamp = (time: string) => {
  //他妈的这里巨奇怪，不知道为什么这个方法会被下面handleScroll方法一直调用真的迷
  return allFunction.timeAgo(time)
}

//当前内容的滚动距离，用于判断目录的高亮   但是好像有点问题先不用了
const scrollTop = ref<number>(0); // 记录当前的滚动距离
useEventListener(window, 'scroll', () => {
  scrollTop.value = window.scrollY;
  if (scrollTop.value < 250) {
    tocACindex.value = '#toc-head-1'
  }
  tocList.value.forEach((element: any, index) => {
    if (scrollTop.value - 400 >= element.top) {
      tocACindex.value = element.id;
    }
  })
})

//计算滚动进度
const handleScroll = computed(() => {
  const docElement = document.documentElement;
  // 封装局部变量
  const scrollTopValue = scrollTop.value;
  const scrollHeight = docElement.scrollHeight - docElement.clientHeight;

  // 类型注解
  if (typeof scrollTopValue !== 'number' || typeof scrollHeight !== 'number') {
    return '0%';
  }

  // 异常处理
  if (isNaN(scrollTopValue) || isNaN(scrollHeight)) {
    return '0%';
  }

  let scrollPercent = scrollTopValue / scrollHeight * 100;

  if (isNaN(scrollPercent) || scrollPercent == 0) {
    return ""
  }

  if (scrollPercent > 100) scrollPercent = 100

  return scrollPercent.toFixed(2) + '%';

});


//评论人个人信息
const information = reactive({
  name: '',
  email: '',
  webSite: '',
  comContent: '',
  nameError: false,
  emailError: false,
  rangeIndex: 0,//头像的索引
})
//获取本地存储的评论人信息 如果有则赋值
if (localStorage.getItem('information')) {
  const data = JSON.parse(localStorage.getItem('information') as string) as []
  Object.keys(data).forEach((key) => {
    information[key] = data[key]
  })
}

//监听评论人信息的变化，如果有变化则存储到本地
watch(information, () => {
  localStorage.setItem('information', JSON.stringify(information))
}, { deep: true })




//评论人个人信息验证
const comInfo = () => {
  ElNotification.closeAll()
  if (information.comContent.length == 0) {
    return tip('评论内容不能为空')
  } else if (information.name == '') {
    information.nameError = true
    setTimeout(() => {
      information.nameError = false
    }, 820);
    return tip('昵称不能为空')

  } else if (information.email == '') {
    information.emailError = true
    setTimeout(() => {
      information.emailError = false
    }, 820);
    return tip('邮箱不能为空')
  }
  return true
}
//评论提交
const comSubmit = () => {
  const replyId = replyArr.replyId
  //验证信息
  if (!comInfo()) return
  //处理回复评论的id 判断其否为二级评论，-1为一级评论，否则为二级评论
  const replyIdval = () => {
    for (let [key, item] of replyId) {
      if (item.isReply) return key
    }
    return 0
  }
  //处理一级评论的id
  const groundVal = () => {
    for (let [key, item] of replyId) {
      if (item.isReply) return item.ground_id
    }
    return 0
  }

  const remarkData: commentsType = {
    aid: Number(aid), //文章id
    replyId: replyIdval(), //回复评论的id
    groundId: groundVal(), //一级评论的id
    name: information.name, //评论人昵称
    email: information.email, //评论人邮箱
    webSite: information.webSite, //评论人网站
    content: information.comContent, //评论内容
    imgIndex: information.rangeIndex, //评论人头像
    userIp: '', //用户ip
  }
  //发送请求,提交评论
  postRemarkList(remarkData).then(async (res: any) => {
    if (res == '评论成功') {
      tip(`评论成功,感谢你的评论！`)
      overloading.value = true
      await getRemarkList()
      overloading.value = false
      //清空评论内容
      information.comContent = ''
      remReplyComment()
    } else {
      tip(`评论失败,请稍后再试！`)
    }
  })
}


//回复一级评论
const replyComment = (item, index) => {
  const replyId = replyArr.replyId
  //每次选择回复都要将其他的回复id置为0
  handleReplyData()
  //将当前回复的id置为当前评论的id
  replyId.set(item.comment_id, {
    isReply: true,
    ground_id: index
  })
  replyArr.replyName = '@' + item.user_name
  //给textarea获取焦点
  const textarea = document.querySelector('#textarea') as any
  textarea?.focus();
}


//取消回复
const remReplyComment = () => {
  handleReplyData()
  replyArr.replyName = '发表评论'
}
function handleReplyData() {
  const replyId = replyArr.replyId
  //每次选择回复都要将其他的回复id置为-1
  for (let [key, item] of replyId) {
    replyId.set(key, {
      isReply: false,
      ground_id: item.ground_id
    })
  }
}

//选择头像时候的移动哐哐的事件
const moveTo = () => {
  const defaultval = 60 //每个图片距离的宽度
  //获取父元素
  const selcetRound = document.querySelector('#selcetRound') as HTMLSpanElement;
  selcetRound.style.transform = `translateX(${defaultval * information.rangeIndex}px)`

}
//评论头像更换事件
function setRange(clickIndex: number) {
  information.rangeIndex = clickIndex
  const index = information.rangeIndex
  if (index >= 0 && index <= 11) {
    moveTo()
  } else {
    if (index <= 0) information.rangeIndex = 0;
    if (index >= 11) information.rangeIndex = 11;
  }
}

//滚轮事件 用于选择头像
const wheel = ref<HTMLDivElement>()
let scrollx = 0
const onWheelfn = (e) => {
  window.screen.width > 768 && e.preventDefault()
  if (e.deltaY < 0 && scrollx > 0) scrollx -= 60
  if (e.deltaY > 0 && scrollx < 360) scrollx += 60
  wheel.value!.scrollTo(scrollx, 0)
}

//点击目录跳转到对应的位置，并且抖动
const toScrollY = async (id: string) => {
  const el = document.querySelector(id) as HTMLElement
  const top = el.offsetTop
  window.scrollTo({ top: top + 400, behavior: 'smooth' })
  el.classList.add('animate__shakeX')
  await awaitTime(() => {
    el.classList.remove('animate__shakeX')
  }, 1000)
}

useEventListener('resize', () => {
  resizeWidth()
})
function resizeWidth() {
  const detail = document.querySelector(".detail") as HTMLDivElement;
  detail.style.setProperty('--centerWidth', String(window.innerWidth - 25) + 'px')
}

</script>

<template>
  <div class="detail">
    <!-- 文章封面 -->
    <div class="imgtop">
      <img :src="dataDet.cover_img" alt="">
      <div class="topTitle">
        <h1>{{ dataDet.title }}</h1>
        <p style="font-size: 15px;">
          <!-- {{ dataDet.uname }} -->
          <span>
            <LzyIcon name="ic:baseline-access-time"></LzyIcon>
            发表时间
            {{ setTimestamp(dataDet.create_date) }}
          </span>
          <span>
            <LzyIcon name="iconoir:chat-lines"></LzyIcon>
            评论数
            {{ dataDet.comments_count }}
          </span>
          <span>
            <LzyIcon name="iconoir:fire-flame"></LzyIcon>
            浏览量
            {{ numFormat(dataDet.access_count) }}
          </span>
        </p>
        <!-- 文章类型 -->
        <div class="tags">
          文章分类：
          <span class="mr-1 taglzy" v-for="(item, index) in dataDet.tags " :key="index">
            {{ item }}
          </span>
        </div>
      </div>

    </div>
    <div class="bodyMain">
      <div class="mainLeft">
        <!-- 文章内容 -->
        <Maincontent :main="dataDet.main" :aid="dataDet.aid" @update="updateCop"></Maincontent>
        <!-- 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 -->
        <footer v-transition="'tosiTion'" class="oldtosiTion post-footer center ">
          <div class="tool">
            <i class="iconfont icon-icon-taikong20"></i>
            <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0
              国际许可协议</a>
          </div>
        </footer>
        <!-- 发布评论 -->
        <div v-transition="'tosiTion'" class="oldtosiTion publish center">
          <div class="borderw themeCard">
            <div class="comment">
              <span> {{ replyArr.replyName }} </span>
            </div>
            <div class="comment textareas">
              <textarea id="textarea" v-model="information.comContent"></textarea>
            </div>
          </div>
          <div class="borderw nameqq themeCard">
            <div class="comment">
              <div>
                <button>
                  <lzy-icon name="gg:chevron-left" animation="animate__heartBeat"></lzy-icon>
                </button>
                <div @wheel="onWheelfn" ref="wheel">
                  <p>
                    <span id="selcetRound"></span>
                    <img v-for="(item, index) in comImg" :key="index" :src="item" @click="setRange(index)"
                      :class="{ animate__headShake: information.rangeIndex == index }">
                  </p>
                </div>
                <button>
                  <lzy-icon name="gg:chevron-right" animation="animate__heartBeat"></lzy-icon>
                </button>
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
        <!-- 评论界面 -->
        <div v-transition="'tosiTion'" class="oldtosiTion commentui center">
          <div class="before">{{ textbefore }}</div>
          <div class="comment">
            <h5>
              <!-- <i class="iconfont icon-icon-taikong13"></i>评论 -->
            </h5>
            <div class="comContent">
              <h3 style="text-align: center;" v-if="remarkList.length == 0">
                <p>
                  <LzyIcon height="100px" name="icon-park-outline:baby-taste"></LzyIcon>
                </p>
                暂无评论，快来试试评论吧！
              </h3>
              <Reply v-if="!overloading || remarkList.length != 0" :oldReplicate="remarkList" :replydata="remarkList"
                :replyId="replyArr.replyId" @replying="replyComment" @remReply="remReplyComment" />
            </div>
          </div>
        </div>
      </div>

      <!-- 文章目录 -->
      <div class="affix-container">
        <main class="affix themeCard stickyTop" ref="affixElm">
          <div class="affix_item" @click="scrollTo(0, 0)">
            <div class="affix-title">
              <i class="iconfont icon-icon-taikong17"></i>
              <span>目录</span>
              <b v-html="handleScroll"></b>
            </div>
            <ul class=" affix-list">
              <li :class="tocACindex == '#toc-head-1' ? 'active H2' : 'H2'">
                <a @click="toScrollY('#abstract')">摘要</a>
              </li>
              <li v-for="item in tocList"
                :class="tocACindex == item.id ? 'active ' + item.nodeName : '' + item.nodeName" :key="item.id">
                <a @click="toScrollY(item.id)">{{ item.title }}</a>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import url(@/assets/css/contentDetail.scss);
</style>
