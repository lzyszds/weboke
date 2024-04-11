<script setup lang='ts'>
import { onMounted, ref, reactive, getCurrentInstance, nextTick, watch, defineAsyncComponent, HtmlHTMLAttributes } from 'vue'
import { ElNotification } from 'element-plus'
import Maincontent from '@/components/Maincontent.vue';
// import { useEventListener } from '@vueuse/core'
import { useRoute } from "vue-router";
import request from '@/http/request';
import comImg from '@/assets/icon/comments/import'
import { commentsType } from './Detailtype'
import Reply from '@/views/home/Reply.vue'
import { allFunction, awaitTime, scrollTo } from '@/utils/common'
import LzyIcon from '@/components/LzyIcon.vue';
import { useEventListener } from '@vueuse/core'

const DeskInfo = defineAsyncComponent(() => import("@/components/DeskInfo.vue"))


const overloading = ref(false) //重载评论组件，解决评论后评论组件不刷新的问题

const route = useRoute()
const aid = route.path.replace('/home/detail/', '') //获取当前文章id
const dataDet = await request({
  method: 'get',
  url: '/api/article/getArticleInfo/' + aid
}) as any
const affixElm = ref<HTMLElement | null>(null)
dataDet.cover_img = '/api/public' + dataDet.cover_img
const { proxy } = getCurrentInstance() as any
const tip = allFunction.LNotification // 右下角提示
const tocList = ref<any>([]);
const tocACindex = ref<string>('#toc-head-1');
const listComment = ref<any>()

// 获取评论列表
const getComment = async () => {
  listComment.value = await request({
    method: 'get',
    url: '/api/article/getArticleComment',
    params: {
      id: aid
    }
  }) as any
  //浅拷贝一份评论数据
  const oldReplydata = [...listComment.value]
  // 遍历评论列表，为每个评论添加回复列表
  const list = oldReplydata.filter((res: any) => res.reply_id == 0)
  console.log(`lzy  list:`, list)
  list.forEach((element: any) => {
    element.reply = []
    oldReplydata.forEach((res: any, index: number) => {
      // 如果回复的评论id与当前评论的回复id相同，则将该回复添加到当前评论的回复列表中
      if (element.comment_id == res.ground_id) {
        list.splice(index, 1)
        element.reply.push(res)
      }
    });
  })
  listComment.value = list
  // listComment.value.forEach((element: any) => {
  //   element.reply = []
  //   listComment.value.forEach((res: any, index: number) => {
  //     // 如果回复的评论id与当前评论的回复id相同，则将该回复添加到当前评论的回复列表中
  //     if (element. == res.comment_id) {
  //       listComment.value.splice(index, 1)
  //       element.reply.push(res)
  //     }
  //   });
  // })
}
await getComment()
//评论上方的诗句请求
const textbefore = ref<String>('寻找中...')
setTimeout(() => {
  try {
    request({
      method: 'get',
      url: '/getIp/sentence',
    }).then((res: any) => {
      textbefore.value = res.content
    })
  } catch (e) {
    console.log("请求频率上限：" + e + "两秒后重新请求")
    setTimeout(async () => {
      const result = await request({
        method: 'get',
        url: '/getIp/sentence',
        headers: {
          "Cookie": "X-User-Token=6zImt+uqp/1XS0CJBkw25piggo2ysiiu"
        }
      }) as any
      textbefore.value = result.content
    }, 2000)
  }
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
  resizeWidth()
})
//处理时间戳转换成距离当前日期的时间（一天前，两天前）
let setTimestamp = (time: string) => {
  //他妈的这里巨奇怪，不知道为什么这个方法会被下面handleScroll方法一直调用真的迷
  return allFunction.timeAgo(time)
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


const replyArr = reactive({
  replyId: <number[][]>[],//回复评论初始变量
  replyName: '发表评论',//回复评论初始变量
})

// 存储所有评论的状态
function setReplyStatus() {
  if (!listComment.value) return //如果没有评论则不执行
  listComment.value.forEach((res, index) => {
    const replyId = replyArr.replyId
    replyId.push([0])
    res.reply && res.reply.forEach(() => {
      replyId[index].push(0)
    })
  });
  console.log(`lzy  replyId:`, replyArr.replyId)
}
setReplyStatus()

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
  //验证信息
  if (!comInfo()) return
  //处理回复评论的id 判断其否为二级评论，-1为一级评论，否则为二级评论
  const replyIdval = () => {
    let value = 0
    replyArr.replyId.forEach(element => {
      element.forEach((res) => res != 0 && (value = res))
    });
    return value
  }
  //处理一级评论的id
  const groundVal = () => {
    let value = 0
    replyArr.replyId.forEach(element => {
      element.forEach((res) => res != 0 && (value = res))
    });
    listComment.value.forEach((element) => {
      console.log(element);
      element.reply && element.reply.forEach(res => {
        if (res.comment_id == value) value = res.ground_id
      });
    })
    return value
  }

  const commentData: commentsType = {
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
  request({
    method: 'post',
    url: '/api/article/addComment',
    data: commentData
  }).then(async (res: any) => {
    if (res == '评论成功') {
      tip(`评论成功,感谢你的评论！`, 2000)
      overloading.value = true
      await getComment()
      overloading.value = false
      //清空评论内容
      information.comContent = ''
      handleReplyData(replyArr.replyId)//清空回复评论的id
      setReplyStatus() // 重新设置回复评论的状态
    } else {
      proxy.$message({
        message: '评论失败',
        type: 'error'
      })
    }
  })
}


//回复一级评论
const replyComment = (item, index) => {
  const replyId = replyArr.replyId
  //每次选择回复都要将其他的回复id置为0
  handleReplyData(replyId)
  if (item.reply_id == 0) {
    replyId[index][0] = item.comment_id;
  } else {
    const data = listComment.value
    for (let key in data) {
      if (data[key].comment_id == item.ground_id) {
        replyId[key][index + 1] = item.comment_id;
      }
    }
  }
  replyArr.replyName = '@' + item.user_name
  //给textarea获取焦点
  const textarea = document.querySelector('#textarea') as any
  textarea?.focus();
}


//取消回复
const remReplyComment = () => {
  const replyId = replyArr.replyId
  handleReplyData(replyId)
  replyArr.replyName = '发表评论'
}
function handleReplyData(replyId) {
  //每次选择回复都要将其他的回复id置为-1
  Object.keys(replyId).forEach((key: any) => {
    Object.keys(replyId[key]).forEach((keys: any) => {
      replyId[key][keys] = 0
    })
  });
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
  window.scrollTo({ top: top + 200, behavior: 'smooth' })
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
            {{ dataDet.access_count }}
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
        <Maincontent :main="dataDet.main" :content="dataDet.content" @update="updateCop"></Maincontent>
        <!-- 知识共享署名-非商业性使用-相同方式共享 4.0 国际许可协议 -->
        <footer v-transition="'tosiTion'" class="oldtosiTion post-footer center ">
          <div class="tool">
            <i class="iconfont icon-icon-taikong20" fill="#000"></i>
            <a target="_blank" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh">知识共享署名-非商业性使用-相同方式共享 4.0
              国际许可协议</a>
          </div>
        </footer>
        <!-- 发布评论 -->
        <div v-transition="'tosiTion'" class="oldtosiTion publish center">
          <div class="borderw">
            <div class="comment">
              <span> {{ replyArr.replyName }} </span>
            </div>
            <div class="comment textareas">
              <textarea id="textarea" v-model="information.comContent"></textarea>
            </div>
          </div>
          <div class="borderw nameqq">
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
        <div v-transition="'tosiTion'" class="oldtosiTion borderw center">
          <div class="before">{{ textbefore }}</div>
          <div class="comment">
            <h5>
              <i class="iconfont icon-icon-taikong13"></i>评论
            </h5>
            <div class="comContent">
              <Reply v-if="!overloading" :oldReplydata="listComment" :replydata="listComment"
                :replyId="replyArr.replyId" @replycl="replyComment" @replyclLevelTwo="replyComment"
                @remReplycl="remReplyComment" @remReplyclLevelTwo="remReplyComment" />
            </div>
          </div>
        </div>
      </div>



      <!-- 文章目录 -->
      <div class="affix-container" ref="affixElm">
        <DeskInfo></DeskInfo>
        <main class="affix themeCard" v-if="tocList.length">
          <div class="affix_item">
            <div class="affix-title" @click="scrollTo(0, 0)">
              <i class="iconfont icon-icon-taikong17"></i>
              <span>目录</span>
            </div>
            <ul class="affix-list">
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

<style lang="less" scoped>
@import url('@/assets/css/contentDetail.less');

.oldtosiTion {
  opacity: 0;
  transition: .5s ease-in-out;
  transform: translate(0, 20px);
}

.tosiTion {
  opacity: 1 !important;
  transform: translate(0) !important;
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
