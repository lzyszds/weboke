<script setup lang='ts'>
import TxtDeformation from '@/uiComponents/txtDeformation/index.vue'
import { onMounted, ref, nextTick, reactive, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { useEventListener } from '@vueuse/core';
import LzyIcon from '@/components/LzyIcon.vue';
import { ElPageHeader, ElDescriptions, ElDescriptionsItem, ElTooltip, ElButton } from 'element-plus'
import ColorRoulette from '@/uiComponents/ColorRoulette.vue';
const router = useRouter();
const api = import.meta.env.VITE_BASE_URL

//实现github贡献图参考
//https://stackoverflow.com/questions/18262288/finding-total-contributions-of-a-user-from-github-api
const totalCont = ref(0)
//svg参数设置
const svgTip = reactive({
  x: 0,  //鼠标x坐标
  y: 0, //鼠标y坐标
  date: '', //当前格子的日期
  count: 0, //当前格子的提交次数
})

//技能图标
const skills = {
  front: ['logos:typescript-icon', 'logos:vue', 'logos:vueuse', 'logos:vitejs', 'logos:webpack', 'logos:react',
    'logos:electron', 'logos:tauri', 'logos:jquery', 'fa-brands:weixin', 'logos:leaflet', 'logos:greensock-icon', 'logos:element', 'logos:pinia', 'logos:bootstrap', 'logos:bun', 'logos:css-3'],
  rear: ['logos:nodejs-icon', 'logos:spring-icon', 'logos:java', 'logos:mysql', 'logos:postman-icon',
    'logos:apache',],
  other: ['logos:git-icon', 'logos:github-icon', 'logos:github-copilot', 'logos:visual-studio-code', 'logos:webstorm', 'logos:intellij-idea',
    'logos:adobe-photoshop', 'logos:linux-tux', 'logos:markdown', 'logos:openai-icon', 'logos:wordpress-icon',
    'logos:typeform-icon'
  ]
}
const showTip = (val) => {
  return val.split(':')[1].replace('-icon', '')
}

//相关经历的初始动画
const toTion = ref<boolean[]>([false, false, false, false])
toTion.value.forEach((_item, index) => {
  setTimeout(() => {
    toTion.value[index] = true
  }, index * 500 + 1000)
})

//github贡献图 获取逻辑、数据处理，具体实现svg绘制在template中循环绘制
const data = ref(<any>[])
const month = ref(<any>[])
onMounted(() => {
  window.$axios({
    method: 'get',
    url: api + '/common/getGithubInfo'
  }).then((res: any) => {
    const { contributionsCollection } = res.user
    const { weeks, totalContributions } = contributionsCollection.contributionCalendar
    // handleData(weeks)
    totalCont.value = totalContributions
    data.value = weeks
    const months = [
      "一月", "二月", "三月", "四月", "五月", "六月",
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ]
    const now = <any>[]
    weeks.forEach((item, index) => {
      const date = dayjs(item.firstDay).format('MM')
      if (!now.includes(months[parseInt(date) - 1])) {
        now.push({ text: months[parseInt(date) - 1], index: index * 19 + 30 })
      }
    });
    month.value = now
    nextTick(() => {
      const rect = document.querySelectorAll('.rectangle') as NodeListOf<SVGRectElement>
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
        item.style.setProperty('--delay', `${Math.random() * 2}s`)
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

const identifyreatColor = (color: string) => {
  if (color == '#ebedf0') {
    return '#fff'
  }
  return color
}

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
          <ElPageHeader @back="onBack">
            <template #extra>
              <div class="flex items-center">
                <a href="https://github.com/lzyszds" target="_blank">
                  <ElButton type="primary" class="purple">
                    <i class="iconfont icon-github" font-size="25"></i>
                  </ElButton>
                </a>
                <a href="https://github.com/lzyszds" target="_blank">
                  <ElButton type="primary" class="purple">
                    <i class="iconfont icon-youxiang" font-size="25"></i>
                  </ElButton>
                </a>
                <a href="https://github.com/lzyszds" target="_blank">
                  <ElButton type="primary" class="purple">
                    <i class="iconfont icon-qq" font-size="25"></i>
                  </ElButton>
                </a>
              </div>
            </template>

            <ElDescriptions :column="2" class="mt-4">
              <ElDescriptionsItem label="姓名">lzyszds</ElDescriptionsItem>
              <!-- <ElDescriptionsItem label="所在地">南宁</ElDescriptionsItem> -->
              <!-- <ElDescriptionsItem label="职业"> 学生 </ElDescriptionsItem> -->
              <ElDescriptionsItem label="学历"> 本科 </ElDescriptionsItem>
              <ElDescriptionsItem label="前端技术" class-name="skills">
                <ElTooltip v-for="item of skills.front" class="box-item" effect="dark" :content="showTip(item)"
                  placement="top">
                  <LzyIcon :name="item" />
                </ElTooltip>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="后端技术" class-name="skills">
                <ElTooltip v-for="item of skills.rear" class="box-item" effect="dark" :content="showTip(item)"
                  placement="top">
                  <LzyIcon :name="item" />
                </ElTooltip>
              </ElDescriptionsItem>
              <ElDescriptionsItem label="其他" class-name="skills">
                <ElTooltip v-for="item of skills.other" class="box-item" effect="dark" :content="showTip(item)"
                  placement="top">
                  <LzyIcon :name="item" />
                </ElTooltip>
              </ElDescriptionsItem>
            </ElDescriptions>
            <p class="describe"><i class="fa fa-bookmark-o"></i> 相关经历：</p>
            <ul>
              <Transition name="toTion">
                <li v-if="toTion[0]">2019.9 - 2022.7 广西职业技术学院 专科 计算机应用技术专业</li>
              </Transition>
              <Transition name="toTion">
                <li v-if="toTion[1]">2021.7 - 2022.8 成都云天为民(小公司主要负责气象数据) 实习</li>
              </Transition>
              <Transition name="toTion">
                <li v-if="toTion[2]">2022.9 - 至今 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;南宁学院 本科 计算机科学与技术专业</li>
              </Transition>
              <Transition name="toTion">
                <li v-if="toTion[3]">至今还在努力学习中哦...</li>
              </Transition>
            </ul>
          </ElPageHeader>
        </div>
      </div>
      <div class="waveMain">
        <text class="text">{{ totalCont }} contributions in the last year</text>
        <!-- <ColorRoulette /> -->
        <div class="wave">
          <svg id="calendar" width="1040px" height="100%" xmlns="http://www.w3.org/2000/svg">
            <g>
              <text v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']" :key="index" fill="#000" font-size="12"
                x="8" :y="index * 18 + 42" overflow="scroll">{{ item }}</text>
            </g>
            <g>
              <text v-for="(item, index) in month" :key="index" fill="#000" font-size="12" :x="item.index" y="20"
                v-show="isShow(item.text, index)" overflow="scroll">
                {{ item.text }}
              </text>
            </g>
            <g v-for="(item, indexG) in data" :key="indexG">
              <rect class="rectangle" v-for="(res, indexR) in item.contributionDays" :key="indexR" :x="indexG * 19 + 30"
                :y="indexR * 18 + 30" rx="3" ry="3" stroke="#000" :fill="identifyreatColor(res.color)" width="13"
                height="13" :data-date="res.date" :data-count="res.contributionCount" overflow="scroll" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  background-color: var(--themeColor);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 85%;
  height: 90%;
  background-color: rgb(255, 255, 255, .7);
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 1);
  backdrop-filter: blur(8px);
  overflow: auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 300px 1fr;
  align-items: center;

  .formInfo {
    width: 65%;
    margin: 0 auto;
    height: 300px;
    padding: 0 30px;
    font-size: 2rem;
    font-weight: 600;
    color: var(--themeColor);

    .items-center {
      animation: flipInY 1s ease-in-out 1;
      animation-delay: 1s;

      a {
        margin-left: 10px;
      }
    }

    .mt-4 {
      margin-top: 10px;
      font-family: 'dindin';
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
      margin-top: 5px;
      font-size: clamp(0.5rem, 1vw, 1.9rem);

      li {
        list-style: circle;
      }
    }

    :deep(.el-descriptions__cell) {
      padding: 0;
      font-size: 16px;
      height: 35px;
    }

    :deep(.skills) {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--themeColor);

      svg {
        margin-right: 5px;
      }
    }
  }

  .waveMain {
    display: grid;
    grid-template-rows: 20px 1fr;
    position: relative;
  }

  .text {
    width: 65%;
    display: block;
    text-align: left;
    margin: 0 auto;
  }

  .wave {
    height: 100%;
    background-color: #fff;
    padding: 0 10px;
    border-radius: 5px;
    z-index: 99;
    margin: 10px auto;
    user-select: none;
    overflow-y: hidden;
    overflow-x: auto;
    border: 1px solid #999;
    filter: hue-rotate(120deg);
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




.toTion-enter-active,
.toTion-leave-active {
  transition: all 1s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.toTion-enter-from,
.toTion-leave-to {
  opacity: 0;
  transform: translateX(-30px);


}

.rectangle {
  transition: all .3s;
  animation: fadeInUpBig var(--delay) ease-in-out 1;
  // animation-delay: 1s;
  cursor: pointer;
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

    .text {
      width: 80%;
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
