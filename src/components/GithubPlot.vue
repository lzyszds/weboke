<script setup lang='ts'>

const { data, x: prorsX, y: prorsY } = defineProps<{
  data: any,
  x: number,
  y: number
}>()
//xy,用于解决定位位置不对的问题


const githubData = await data
const month = ref(<any>[])
//svg参数设置
const svgTip = reactive({
  x: 0,  //鼠标x坐标
  y: 0, //鼠标y坐标
  date: '', //当前格子的日期
  count: 0, //当前格子的提交次数
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

const identifyreatColor = (color: string) => {
  if (color == '#ebedf0') {
    return '#fff'
  }
  return color
}

onMounted(() => {
  const rect = document.querySelectorAll('.rectangle') as NodeListOf<SVGRectElement>
  const svgTipDom = document.querySelector('#svgTip') as HTMLDivElement
  rect.forEach((item) => {
    //鼠标移入事件 显示tip
    useEventListener(item, 'mouseenter', (event: any) => {
      svgTipDom.style.opacity = '1'
      const { x, y } = event.target.getBoundingClientRect()
      svgTip.x = x - prorsX
      svgTip.y = y - prorsY
      svgTip.date = event.target.getAttribute('data-date')
      svgTip.count = event.target.getAttribute('data-count')
    })
    useEventListener(item, 'mouseleave', () => {
      svgTipDom.style.opacity = '0'
    })
    item.style.setProperty('--delay', `${Math.random() * 2}s`)
  })

})
</script>

<template>
  <div class="wave">
    <div id="svgTip" class="svg-tip svg-tip-one-line" :style="{ top: svgTip.y + 'px', left: svgTip.x + 'px' }">
      {{ svgTip.date }} <strong>{{ svgTip.count != 0 ? svgTip.count + '条贡献' : '没有贡献' }} </strong>
    </div>
    <svg id="calendar" width="1040px" height="100%" xmlns="http://www.w3.org/2000/svg">
      <g>
        <text v-for="(item, index) in ['日', '一', '二', '三', '四', '五', '六']" :key="index" fill="#000" font-size="12" x="8"
          :y="index * 18 + 32" overflow="scroll">{{ item }}</text>
      </g>
      <g>
        <text v-for="(item, index) in month" :key="index" fill="#000" font-size="12" :x="item.index" y="20"
          v-show="isShow(item.text, index)" overflow="scroll">
          {{ item.text }}
        </text>
      </g>
      <g v-for="(item, indexG) in githubData" :key="indexG">
        <rect class="rectangle" v-for="(res, indexR) in item.contributionDays" :key="indexR" :x="indexG * 19 + 30"
          :y="indexR * 18 + 20" rx="3" ry="3" stroke="#000" :fill="identifyreatColor(res.color)" width="20" height="13"
          :data-date="res.date" :data-count="res.contributionCount" overflow="scroll" />
      </g>
    </svg>
  </div>
</template>

<style lang='scss' scoped>
.wave {
  filter: hue-rotate(120deg);

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

  .rectangle {
    transition: all .3s;
    animation: fadeInUpBig var(--delay) ease-in-out 1;
    // animation-delay: 1s;
    cursor: pointer;
  }
}
</style>
