<template>
  <div class="
      h-24
      fixed
      z-50
      bottom-0
      left-0
      flex
      transition-all
      duration-300
      ease-in-out
      bg-white
      border-solid border-t border-gray-200
    " :class="data.width">
    <!-- 图片 -->
    <div class="w-32 h-full bg-yellow-100 relative">
      <img class="w-32 h-32 object-cover" ref="img"
        src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000023rvqc3zCopb.jpg?max_age=2592000" alt="" />
      <img @click="playSvg" class="absolute cursor-pointer transition-all"
        :class="!data.isplaySvg ? data.svg + ' bofang_icon' : data.svg"
        :src="`src/assets/icon/music/${!data.isplaySvg ? '播放' : '暂停'}.svg`" />
      <!-- 这个路径得好好瞧瞧，vite不能用cli的 require。 使用这个src的时候，去F12看看路径是否正确 -->
    </div>

    <!-- 切歌歌词快进 -->
    <div :style="[data.styleGrid]" style="width: 0" class="pt-3 pl-0">
      <audio id="player" ref="player" controls="controls" class=" hidden">
        <source
          src="http://m701.music.126.net/20220609232139/01e051a3cc144c047e88b0bbe4dcb4e5/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/8680756992/2725/ac6b/711a/11d3650af35dc16b75f738f53ed9abd5.mp3" />
      </audio>
      <!-- <div class="grid grid-cols-3 gap-2"> -->
      <div class="w-128 flex justify-between px-3">
        <span class="text-xl truncate mr-3 leading-9 select-none">静寂の森 - Dropの小屋p。</span>
        <div class="flex py-1">
          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/top.svg" alt="" />
          </button>
          <button class="w-8 h-8 btnsvg" @click="playSvg" v-if="!data.isplaySvg">
            <img class="w-8 h-8" src="@/assets/icon/music/play.svg" alt="" />
          </button>
          <button class="w-8 h-8 btnsvg" @click="playSvg" v-else>
            <img class="w-8 h-8" src="@/assets/icon/music/stop.svg" alt="" />
          </button>
          <button class="w-8 h-8 transform rotate-180 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/bottom.svg" alt="" />
          </button>
          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/menu.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="w-128 flex justify-start px-3">

        <SliderX :width="145" :height="3" :value="data.audioCurrentTimeStr" :sumValue="data.audioCurrentTime"
          :domAudioyl="data.domAudioyl">
        </SliderX>
        <div class="select-none">
          <span style="margin-left: 15px">{{ data.audioCurrentTimeStr }}</span>
          &nbsp;/&nbsp;
          <span>{{ data.audioCurrentTime }}</span>
        </div>
        <div class="flex py-1 relative">
          <div class="volumeclass">
            <button class="w-8 h-8 btnsvg">
              <img class="w-8 h-8" src="@/assets/icon/music/volume.svg" alt="" />
            </button>
            <div class="
                absolute
                right-8
                w-10
                h-0
                z-50
                justify-center
                overflow-hidden
                flex
                volumemod
                transition-all
              " style="bottom: 25px">
              <SliderY :width="5" :height="34" :domAudioyl="data.domAudioyl"></SliderY>
            </div>
          </div>

          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/lyric.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

    <!-- 隐式开关 100  -->
    <div class="
        w-8
        h-full
        bg-gray-300
        flex
        items-center
        absolute
        right-0
        cursor-pointer
      " @click="click" @mouseout="mouseout">
      <img width="30" src="../assets/icon/rightmsk.png" style="transition-all"
        :class="{ 'transform rotate-180': data.index }" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import SliderX from "./SliderX.vue";
import SliderY from "./SliderY.vue";
import { storeToRefs } from "pinia";
import { useStore } from '@/store/index'
import { ElMessage } from 'element-plus'
import axios from "axios";
let data = reactive({
  width: "w-8",
  gridwidth: "w-0",
  index: false,
  isplaySvg: false, // 播放暂停
  playUrl: '',
  svg: "top-4 left-8 w-16 h-16",
  styleGrid: "display:none",
  domAudioyl: null, //音频dom属性
  audioLenght: 0, //音频总时长
  audioCurrentTime: '0:00', //音频当前时长
  audioCurrentTimeStr: "0:00", //音频当前时长字符串
  musicList: []
});
axios.post('/music/playlist/detail?id=7480206477').then(res => {
  data.musicList.push(...res.data.privileges)
})
let timer
const store = useStore()
// const { musicPlayData } = storeToRefs(useStores)
// console.log(musicPlayData);
const player = ref(null);
const img = ref(null);
data.domAudioyl = player;
// player.value.duration;
const w_425px = "w-425px",
  w_100px = "w-100px";
const mouseout = (e) => {
  if (data.width != "w-8") return;
  data.width = w_100px;
  data.styleWidth = 'width: "0px"';
};
/* 公用方法 */
//播放进度数值修订，0：00/0:00
function eventList() {
  let second = 0, min = 0
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    second++
    if (second > 59) {
      min++
      second = 0
    }
    if (second < 10) {
      second = "0" + second
    }
    data.audioCurrentTimeStr = min + ':' + second
    if ((min * 60) + Number(second) >= parseInt(player.value.duration)) {
      min = 0
      clearInterval(timer)
      data.isplaySvg = false;
      data.svg = "top-4 left-8 w-16 h-16"
    }
  }, 1000)
  if (parseInt(player.value.duration) === 30) {
    ElMessage({
      message: '此歌曲需要会员，仅有试听版！',
      type: 'warning',
    })
  }
  data.audioCurrentTime = timeToMinute(parseInt(player.value.duration))
}



//弹出或关闭 音乐播放器
const click = (e) => {
  data.index = !data.index;
  data.width = data.index ? w_425px : w_100px;
  let times = data.index ? 0 : 100;
  let cloes = setInterval(() => {
    data.index ? times++ : times--;
    data.styleGrid =
      times >= 90 || data.index
        ? "display:block;transform: scaleX(" + times / 100 + ")"
        : "display:none;transform: scaleX(" + times / 100 + ")";
    if (times == 0 || times == 100) {
      clearInterval(cloes);
    }
  }, 1);
};
//播放||暂停音乐 以及按钮的位置动画
const playSvg = (e) => {

  data.isplaySvg = !data.isplaySvg;
  if (data.isplaySvg) {
    player.value.play()
    eventList()
  }
  else player.value.pause();
  if (!data.isplaySvg) data.svg = "top-4 left-8 w-16 h-16";
  else data.svg = "top-12 left-18 w-12 h-12";
};

const timeToMinute = (times) => {
  var t;
  if (times > -1) {
    var hour = Math.floor(times / 3600);
    var min = Math.floor(times / 60) % 60;
    var sec = times % 60;
    if (hour < 10) {
      t = '0' + hour + ":";
    } else {
      t = hour + ":";
    }
    if (min < 10) {
      t += "0";
    }
    t += min + ":";
    if (sec < 10) {
      t += "0";
    }
    t += sec.toFixed(2);
  }
  t = t.substring(0, t.length - 3);
  if (min == 0) {
    t = t.substring(4, t.length)
  } else {
    t = t.substring(3, t.length)
  }
  return t;
}
const getMusicPlay = (value) => {
  player.value.src = value.mp3
  img.value.src = value.img
  data.isplaySvg = true;
  data.svg = "top-12 left-18 w-12 h-12";
  player.value.play();
  eventList()
}
watch(
  () => store.musicPlayData,
  (newVal) => {
    if (timer) clearInterval(timer)
    getMusicPlay(newVal)
  }
);
</script>

<style scoped>
.btnsvg {
  filter: invert(0.5);
  vertical-align: auto;
}

.btnsvg:hover {
  filter: invert(0);
}

.volumeclass:hover .volumemod {
  height: 35px;
}
</style>
