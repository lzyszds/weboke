<script setup lang='ts'>
import TxtDeformation from '@/uiComponents/txtDeformation/Index.vue'
import http from '@/http/http'
import { parps, headers } from './config_Github'
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useEventListener } from '@vueuse/core';
const router = useRouter();
//实现github贡献图参考
//https://stackoverflow.com/questions/18262288/finding-total-contributions-of-a-user-from-github-api

//svg参数设置
const svgTip = reactive({
  x: 0,  //鼠标x坐标
  y: 0, //鼠标y坐标
  date: '', //当前格子的日期
  count: 0, //当前格子的提交次数
})

//相关经历的初始动画
const toTion = ref<boolean[]>([false, false, false, false])
toTion.value.forEach((_item, index) => {
  setTimeout(() => {
    toTion.value[index] = true
  }, index * 500 + 500)
})

//github贡献图 获取逻辑、数据处理，具体实现svg绘制在template中循环绘制
const data = ref(<any>[])
const month = ref(<any>[])
onMounted(() => {
  http('post', '/github', parps, headers).then((res: any) => {
    const { contributionsCollection } = res.data.user
    const { weeks } = contributionsCollection.contributionCalendar
    // handleData(weeks)
    data.value = weeks
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ]
    const now = <any>[]
    weeks.forEach((item, index) => {
      const date = dayjs(item.firstDay).format('MM')
      if (!now.includes(months[parseInt(date) - 1])) {
        now.push({ text: months[parseInt(date) - 1], index: index * 17 + 30 })
      }
    });
    month.value = now
    nextTick(() => {
      const rect = document.querySelectorAll('.rectangle')
      const svgTipDom = document.querySelector('#svgTip') as HTMLDivElement
      rect.forEach((item) => {
        //鼠标移入事件 显示tip
        useEventListener(item, 'mouseenter', (event: any) => {
          svgTipDom.style.opacity = '1'
          const { x, y } = event.target.getBoundingClientRect()
          svgTip.x = x - 70
          svgTip.y = y - 40
          svgTip.date = event.target.getAttribute('data-date')
          svgTip.count = event.target.getAttribute('data-count')
        })
        useEventListener(item, 'mouseleave', () => {
          svgTipDom.style.opacity = '0'
        })
      })

    })
  })
})
//判断当前日期标题是否显示
const isShow = (value, index) => {
  const value2 = month.value[index - 1] ? month.value[index - 1].text : null
  if (value2 != null) {
    if (value == value2) return false
  } else if (index == 0) {
    return false
  }
  return true
}

const onBack = () => {
  router.back()
}
onBeforeUnmount(() => {
  data.value = []
})
</script>

<template>
  <div class="about">
    <div id="svgTip" class="svg-tip svg-tip-one-line" :style="{ top: svgTip.y + 'px', left: svgTip.x + 'px' }">
      {{ svgTip.date }} <strong>{{ svgTip.count != 0 ? svgTip.count + '条贡献' : '没有贡献' }} </strong>
    </div>
    <div class="content">
      <TxtDeformation></TxtDeformation>
      <div class="formInfo">
        <div aria-label="A complete example of page header">
          <el-page-header @back="onBack">
            <template #extra>
              <div class="flex items-center">
                <a href="https://github.com/lzyszds" target="_blank">
                  <el-button type="primary" class="purple">
                    <lzyIcon width="30" font-size="20" name="icon-github" fill="#fff"></lzyIcon>
                  </el-button>
                </a>
                <a href="https://github.com/lzyszds" target="_blank">
                  <el-button type="primary" class="purple">
                    <lzyIcon width="30" font-size="23" name="icon-youxiang" fill="#fff"></lzyIcon>
                  </el-button>
                </a>
                <a href="https://github.com/lzyszds" target="_blank">
                  <el-button type="primary" class="purple">
                    <lzyIcon width="30" font-size="20" name="icon-qq" fill="#fff"></lzyIcon>
                  </el-button>
                </a>
              </div>
            </template>

            <el-descriptions :column="2" class="mt-4">
              <el-descriptions-item label="Username">lzyszds</el-descriptions-item>
              <el-descriptions-item label="Place">南宁</el-descriptions-item>
              <el-descriptions-item label="Occupation"> 学生 </el-descriptions-item>
              <el-descriptions-item label="Education"> 本科 </el-descriptions-item>
              <el-descriptions-item label="Technology"> Javascript、Node、Vue、Ts、React？ </el-descriptions-item>
            </el-descriptions>
            <p class="describe"><i class="fa fa-bookmark-o"></i> 相关经历：</p>
            <ul>
              <transition name="toTion">
                <li v-if="toTion[0]">2019.9 - 2022.7 广西职业技术学院 专科 计算机应用技术专业</li>
              </transition>
              <transition name="toTion">
                <li v-if="toTion[1]">2021.7 - 2022.8 成都云天为民(小公司主要负责气象数据) 实习</li>
              </transition>
              <transition name="toTion">
                <li v-if="toTion[2]">2022.9 - 至今 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;南宁学院 本科 计算机科学与技术专业</li>
              </transition>
              <transition name="toTion">
                <li v-if="toTion[3]">至今还在努力学习中哦...</li>
              </transition>
            </ul>
          </el-page-header>
        </div>


      </div>
      <div class="wave">
        <text>104 contributions in the last year</text>
        <svg id="calendar" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <g>
            <text v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']" :key="index" fill="#000" font-size="13"
              x="8" :y="index * 16.5 + 40">{{ item }}</text>
          </g>
          <g>
            <text v-for="(item, index) in month" :key="index" fill="#000" font-size="13" :x="item.index" y="20"
              v-show="isShow(item.text, index)">
              {{ item.text }}
            </text>
          </g>
          <g v-for="(item, indexG) in data" :key="indexG">
            <rect class="rectangle" v-for="(res, indexR) in item.contributionDays" :key="indexR" :x="indexG * 17 + 30"
              :y="indexR * 16 + 30" rx="3" ry="3" stroke="#999" :fill="res.color" width="12" height="12"
              :data-date="res.date" :data-count="res.contributionCount" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  background-color: var(--themeColor);
  width: calc(100vw - 10px);
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 80%;
  height: 70rem;
  background-color: rgb(255, 255, 255, .7);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
  backdrop-filter: blur(8px);

  .formInfo {
    width: 61%;
    margin: 0 auto;
    padding: 0 30px;
    height: 320px;
    font-size: 2rem;
    font-weight: 600;
    color: var(--themeColor);

    .items-center {
      .purple:hover {
        animation: wobble-ver-right 0.8s both;
      }

      a {
        margin-left: 10px;
      }
    }

    .mt-4 {
      margin-top: 20px;
      font-family: 'almama';
    }

    .describe {
      font-size: 1.7rem;
      font-weight: 600;
      color: #000;
      margin: 0;
    }

    ul {
      padding-left: 25px;
      color: #000;
      font-size: clamp(0.5rem, 1vw, 1.9rem)
    }
  }

  .wave {
    width: 61%;
    height: 141px;
    background-color: #fff;
    padding: 30px;
    // box-shadow: 0px 0px 4px #000;
    border-radius: 5px;
    z-index: 99;
    margin: 0 auto;
    user-select: none;


  }
}

.svg-tip {
  opacity: 0;
  transition: .1s;
  position: absolute;
  z-index: 99999;
  padding: 8px 16px;
  font-size: 12px;
  color: #ffffff;
  text-align: center;
  background: #24292f;
  border-radius: 6px;
  pointer-events: none;

  &.svg-tip-one-line {
    white-space: nowrap;
  }

  &::after {
    position: absolute;
    bottom: -10px;
    left: 50%;
    width: 5px;
    height: 5px;
    box-sizing: border-box;
    margin: 0 0 0 -4px;
    content: " ";
    border: 5px solid transparent;
    border-top-color: #24292f;
  }
}


@keyframes wobble-ver-right {

  0% {
    -webkit-transform: translateY(0) rotate(0);
    transform: translateY(0) rotate(0);
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
  }

  15% {
    -webkit-transform: translateY(-5px) rotate(6deg);
    transform: translateY(-5px) rotate(6deg);
    border-radius: 6px 6px 15px 25px;
  }

  30% {
    -webkit-transform: translateY(2px) rotate(-6deg);
    transform: translateY(2px) rotate(-6deg);
  }

  45% {
    -webkit-transform: translateY(-2px) rotate(3.6deg);
    transform: translateY(-2px) rotate(3.6deg);
  }

  60% {
    -webkit-transform: translateY(1px) rotate(-2.4deg);
    transform: translateY(1px) rotate(-2.4deg);
  }

  75% {
    -webkit-transform: translateY(-1px) rotate(1.2deg);
    transform: translateY(-1px) rotate(1.2deg);
  }

  100% {
    -webkit-transform: translateY(0) rotate(2.4deg);
    transform: translateY(0) rotate(2.4deg);
  }
}

.toTion-enter-active,
.toTion-leave-active {
  transition: all 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.toTion-enter-from,
.toTion-leave-to {
  opacity: 0;
  transform: translateX(-30px);

}

@media screen and (max-width: 768px) {
  .about {
    .content {
      height: 95%;
      width: 95%;
    }

    .formInfo {
      height: auto;
    }

    .purple {
      padding: 5px;
    }
  }
}

@media screen and (max-width:1280px) {
  .about {
    .content {
      height: 90%;
      width: 90%;
    }

    .formInfo {
      width: 80%;
      height: auto;
    }

    .wave {
      width: 80%;
    }

    .purple {
      padding: 5px;
    }
  }
}
</style>
