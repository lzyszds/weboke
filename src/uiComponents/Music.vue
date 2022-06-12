<template>
  <div
    class="h-24 fixed z-50 bottom-0 left-0 flex transition-all duration-300 ease-in-out bg-white border-solid border-t border-gray-200"
    :class="data.width">
    <!-- 图片 -->
    <div class="w-32 h-full bg-yellow-100 relative z-30">
      <img class="w-32 h-32 object-cover" ref="img"
        src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000023rvqc3zCopb.jpg?max_age=2592000" alt="" />
      <img @click="playSvg" class="absolute cursor-pointer transition-all"
        :class="!data.isplaySvg ? data.svg + ' bofang_icon' : data.svg"
        :src="`src/assets/icon/music/${!data.isplaySvg ? '播放' : '暂停'}.svg`" />
      <!-- 这个路径得好好瞧瞧，vite不能用cli的 require。 使用这个src的时候，去F12看看路径是否正确 -->
    </div>
    <el-card class="box-card absolute left-0 w-full h-100 p-0 opacity-1"
      :style="data.index && data.box_card ? null : 'bottom:-300px;z-index0'">
      <div v-for="(item, index) in data.musicList" :key="index"
        class="text h-12 item flex justify-between mb-2 px-4 border-l-4 border-solid border-transparent cursor-pointer"
        :class="{ 'border-gray-400': data.bordermou[index] }" @click="mclistTabFn(item, index)">
        <div class="text-gray-600 leading-10 text-2xl">{{ item.name }}</div>
        <div class="text-gray-600 leading-10 text-2xl">{{ item.artist }}</div>
      </div>
    </el-card>
    <!-- 切歌歌词快进 -->
    <div :style="[data.styleGrid]" style="width: 0" class="pt-3 pl-0 z-30">
      <audio id="player" ref="player" controls="controls" @timeupdate="updata" class="hidden"></audio>
      <!-- <div class="grid grid-cols-3 gap-2"> -->
      <div class="w-128 flex justify-between px-3 bg-white">
        <span class="text-xl truncate mr-3 leading-9 select-none">{{ mcName }}</span>
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
          <button class="w-8 h-8 btnsvg" @click="onListmusic">
            <img class="w-8 h-8" src="@/assets/icon/music/menu.svg" alt="" />
          </button>
        </div>
      </div>
      <div class="w-128 flex justify-start px-3 bg-white">
        <SliderX :width="145" :height="3" :value="data.audioCurrentTimeStr" :sumValue="data.audioCurrentTime"
          :domAudioyl="data.domAudioyl">
        </SliderX>
        <div class="select-none leading-6 mr-10">
          <span style="margin-left: 15px">{{ data.audioCurrentTimeStr }}</span>
          /
          <span>{{ data.audioCurrentTime }}</span>
        </div>
        <div class="flex py-1 relative">
          <div class="volumeclass">
            <button class="w-8 h-8 btnsvg">
              <img class="w-8 h-8" src="@/assets/icon/music/volume.svg" alt="" />
            </button>
            <div class="absolute right-8 w-10 h-0 z-50 justify-center overflow-hidden flex volumemod transition-all"
              style="bottom: 25px">
              <SliderY :width="5" :height="data.volumeHeight" :domAudioyl="data.domAudioyl"></SliderY>
            </div>
          </div>

          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/lyric.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

    <!-- 隐式开关 100  -->
    <div class="w-8 h-full bg-gray-300 flex items-center absolute right-0 cursor-pointer z-40" @click="click"
      @mouseout="mouseout">
      <img width="30" src="../assets/icon/rightmsk.png" style="transition-all"
        :class="{ 'transform rotate-180': data.index }" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted, watch, nextTick } from "vue";
import SliderX from "./SliderX.vue";
import SliderY from "./SliderY.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/index";
import { ElMessage } from "element-plus";
import axios from "axios";
let data = reactive({
  bordermou: [true], //歌单列表鼠标移入样式
  width: "w-8",
  gridwidth: "w-0",
  volumeHeight: 35,
  index: false, // 打开关闭音乐面板
  box_card: false, //歌单列表控制
  isplaySvg: false, // 播放暂停
  playUrl: "",
  svg: "top-4 left-8 w-16 h-16",
  styleGrid: "display:none",
  domAudioyl: null, //音频dom属性
  audioLenght: 0, //音频总时长
  audioCurrentTime: "0:00", //音频当前时长
  audioCurrentTimeStr: "0:00", //音频当前时长字符串
  musicList: [],
  musicId: [],
});
axios.post("/music/playlist/detail?id=7480206477").then((res) => {
  data.musicId.push(...res.data.privileges);
});
let timer;
const store = useStore();
const player = ref(null); //audio标签src地址
const img = ref(null); //歌曲图片地址
const mcName = ref(null); //歌曲名称
data.domAudioyl = player;
// player.value.duration;
const w_425px = "w-425px",
  w_100px = "w-100px";
const mouseout = (e) => {
  if (data.width != "w-8") return;
  data.width = w_100px;
  data.styleWidth = 'width: "0px"';
};
//isElMessage需要控制提示是否为试听歌曲，防止反复触发提醒
let isElMessage = true;
/* 公用方法 */
//播放进度数值修订，0：00/0:00
function eventList() {
  let min = 0;
  let second = parseInt(player.value.currentTime);
  if (second > 59) {
    min = parseInt(second / 60);
    second -= 60 * min;
  }
  //isElMessage需要控制提示是否为试听歌曲，防止反复触发提醒
  if (isElMessage && parseInt(player.value.duration) === 30) {
    ElMessage({
      message: "此歌曲需要会员，仅有试听版！",
      type: "warning",
    });
    isElMessage = false;
  }
  min = min < 10 ? "0" + min : min;
  second = second < 10 ? "0" + second : second;
  data.audioCurrentTimeStr = min + ":" + second; //音频当前时长字符串
  //播放结束 后要执行的事件
  if (min * 60 + Number(second) >= parseInt(player.value.duration)) {
    min = 0;
    // data.isplaySvg = false;
    // data.svg = "top-4 left-8 w-16 h-16"
    const index = data.bordermou.indexOf(true); //获取当前播放的歌单列表索引
    console.log(index);
    player.value.src = data.musicList[index + 1].url;
    img.value.src = data.musicList[index + 1].picUrl;
    mcName.value = data.musicList[index + 1].name;
  }
  data.audioCurrentTime = timeToMinute(parseInt(player.value.duration));
}

const timeToMinute = (times) => {
  var t;
  if (times > -1) {
    var hour = Math.floor(times / 3600);
    var min = Math.floor(times / 60) % 60;
    var sec = times % 60;
    if (hour < 10) {
      t = "0" + hour + ":";
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
    t = t.substring(4, t.length);
  } else {
    t = t.substring(3, t.length);
  }
  return t;
};

//弹出或关闭 音乐播放器
const click = (e) => {
  data.index = !data.index;
  if (!data.index) data.box_card = false;
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
    isElMessage = true;
    player.value.play();
  } else player.value.pause();
  if (!data.isplaySvg) data.svg = "top-4 left-8 w-16 h-16";
  else data.svg = "top-12 left-18 w-12 h-12";
};
//打开歌单列表
const onListmusic = () => {
  data.box_card = !data.box_card;
};
//获取歌单列表，实现渲染
const onListmc = () => {
  let urls = [];
  data.musicId.forEach((item, index) => {
    urls.push(item.id);
  });
  store.getMusicDetails(urls, false).then((_data) => {
    console.log(_data);
    _data.res.forEach((res, index) => {
      data.musicList.push({
        id: res.id,
        url: res.url,
        name: _data.item[index].name,
        artist: _data.item[index].ar[0].name, //作者
        picUrl: _data.item[index].al.picUrl, //封面图片
      });
    });
  });
};
//歌单点击播放歌曲事件
const mclistTabFn = (e, i) => {
  console.log(e);
  data.bordermou.forEach((item, index) => {
    data.bordermou[index] = false;
  });
  data.bordermou[i] = true;
  getMusicPlay(e);
};

const getMusicPlay = (value) => {
  player.value.src = value.url;
  img.value.src = value.picUrl;
  data.isplaySvg = true;
  data.svg = "top-12 left-18 w-12 h-12";
  player.value.play();
  //需要控制提示是否为试听歌曲，防止反复触发提醒
  isElMessage = true;
};
const updata = () => {
  //音乐每播放一帧执行一次以下方法
  eventList();
};
onMounted(() => {
  //默认音量设置
  player.value.volume = data.volumeHeight / 100;
});
watch(
  () => store.musicPlayData,
  (newVal) => {
    if (timer) clearInterval(timer);
    getMusicPlay(newVal);
  }
);
watch(data.musicId, (newVal) => {
  onListmc();
  //页面初始的时候播放器默认加入歌单第一首歌曲的数据进入播放器
  setTimeout(() => {
    player.value.src = data.musicList[0].url;
    img.value.src = data.musicList[0].picUrl;
    mcName.value = data.musicList[0].name;
  }, 50);
});
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

.box-card {
  bottom: 6.5rem;
}
</style>
