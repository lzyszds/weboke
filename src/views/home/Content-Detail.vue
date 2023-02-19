<script setup lang='ts'>
import { onMounted, ref, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import Maincontent from '../../components/Maincontent.vue';
import { useEventListener } from '@vueuse/core'
import { useRoute } from 'vue-router';
import icon from '@/components/icon.vue'
import http from '@/http/http';
import { commentsType } from './Detailtype'

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
const updateCop = (val: number) => {

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
  handleScroll();
  let timeout = setTimeout(() => {
    if (affixElm.value) {
      affixElm.value!.style.height = document.querySelector('.main')?.getBoundingClientRect().height + 'px';
    }
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
//评论内容
const comContent = ref<string>('')
//评论提交
const comSubmit = () => {
  ElNotification.closeAll()
  if (comContent.value == '') {
    return proxy.$common.LNotification('评论内容不能为空')
  }
  const commentData: commentsType = {
    aid: Number(aid),
    replayId: 1,
    name: '嘤嘤嘤',
    email: '1024327189@qq.com',
    webSite: '',
    content: comContent.value,
    userIp: ''
  }
  http('post', '/adminApi/admin/addComment', commentData).then((res: any) => {
    if (res.data.code == 200) {

      ElNotification({
        dangerouslyUseHTMLString: true,
        message: `<i class="fa fa-copy"></i> 复制成功,转载请声明来源！`,
        position: 'bottom-right',
        duration: 2000,
        customClass: 'copy-success',
      })
      comContent.value = ''
      listComment.value.push({
        name: '我',
        time: new Date().toLocaleString(),
        content: comContent.value
      })
    } else {
      proxy.$message({
        message: '评论失败',
        type: 'error'
      })
    }
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
    <div class="detBreadcrumb center">
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
    <div class="publish center">
      <div class=" borderw">
        <div class="comment ">
          <span> 发表评论 </span>
        </div>
        <div class="comment textareas">
          <textarea v-model="comContent"></textarea>
        </div>
      </div>
      <div class="borderw nameQQ">
        <div class="comment">
          <p>昵称：
            <input type="text" placeholder="昵称或者QQ号">
          </p>
          <p>邮箱：
            <input type="text" placeholder="xxx@xxx.xxx">
          </p>
          <p>网站：
            <input type="text" placeholder="你的网站(选填)">
          </p>
          <p class="btn"><button @click="comSubmit"> 发布评论 </button></p>
          <p class="btn del"><button> 取消评论 </button></p>
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

