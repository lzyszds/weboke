<template>
  <div
    class="
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
    "
    :class="data.width"
  >
    <!-- 图片 -->
    <div class="w-32 h-full bg-yellow-100 relative">
      <img
        class="w-32 h-32 object-cover"
        src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000023rvqc3zCopb.jpg?max_age=2592000"
        alt=""
      />
      <img
        @click="playSvg"
        class="absolute cursor-pointer transition-all"
        :class="!data.isplaySvg ? data.svg + ' bofang_icon' : data.svg"
        :src="`src/assets/icon/music/${!data.isplaySvg ? '播放' : '暂停'}.svg`"
      />
      <!-- 这个路径得好好瞧瞧，vite不能用cli的 require。 使用这个src的时候，去F12看看路径是否正确 -->
    </div>
    <!-- 切歌歌词快进 -->
    <div :style="[data.styleGrid]" style="width: 0" class="pt-3 pl-0">
      <!-- <div class="grid grid-cols-3 gap-2"> -->
      <div class="w-128 flex justify-between px-3">
        <span class="text-xl truncate mr-3 leading-9 select-none"
          >静寂の森 - Dropの小屋p。</span
        >
        <div class="flex py-1">
          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/top.svg" alt="" />
          </button>
          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/play.svg" alt="" />
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
        <audio id="player" ref="player" controls="controls" class="hidden">
          <source
            src="https://webfs.ali.kugou.com/202206052042/b11d3544ac726e922fccbac1f92601c3/part/0/960121/KGTX/CLTX001/5cd03a78a74761494a39cadfaa832550.mp3"
          />
        </audio>
        <SliderX
          :width="145"
          :height="3"
          :domAudioyl="data.domAudioyl"
        ></SliderX>
        <div class="select-none">
          <span style="margin-left: 15px">02:57</span>
          &nbsp;/&nbsp;
          <span>02:57</span>
        </div>
        <div class="flex py-1 relative">
          <div class="volumeclass">
            <button class="w-8 h-8 btnsvg">
              <img
                class="w-8 h-8"
                src="@/assets/icon/music/volume.svg"
                alt=""
              />
            </button>
            <div
              class="
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
              "
              style="bottom: 25px"
            >
              <SliderY
                :width="5"
                :height="34"
                :domAudioyl="data.domAudioyl"
              ></SliderY>
            </div>
          </div>

          <button class="w-8 h-8 btnsvg">
            <img class="w-8 h-8" src="@/assets/icon/music/lyric.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

    <!-- 隐式开关 100  -->
    <div
      class="
        w-8
        h-full
        bg-gray-300
        flex
        items-center
        absolute
        right-0
        cursor-pointer
      "
      @click="click"
      @mouseout="mouseout"
    >
      <img
        width="30"
        src="../assets/icon/rightmsk.png"
        style="transition-all"
        :class="{ 'transform rotate-180': data.index }"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import SliderX from "./SliderX.vue";
import SliderY from "./SliderY.vue";
let data = reactive({
  width: "w-8",
  gridwidth: "w-0",
  index: false,
  isplaySvg: false, // 播放暂停
  svg: "top-4 left-8 w-16 h-16",
  styleGrid: "display:none",
  domAudioyl: null, //音频dom属性
  audioLenght: 0, //音频总时长
  audioCurrentTime: 0, //音频当前时长
  audioCurrentTimeStr: "00:00", //音频当前时长字符串
});
const player = ref(null);
data.domAudioyl = player;
// player.value.duration;
onMounted(() => {
  console.log(player.value.duration);
});
const w_425px = "w-425px",
  w_100px = "w-100px";
const mouseout = (e) => {
  if (data.width != "w-8") return;
  data.width = w_100px;
  data.styleWidth = 'width: "0px"';
};
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
const playSvg = (e) => {
  data.isplaySvg = !data.isplaySvg;
  if (data.isplaySvg) player.value.play();
  else player.value.pause();
  if (!data.isplaySvg) data.svg = "top-4 left-8 w-16 h-16";
  else data.svg = "top-12 left-18 w-12 h-12";
};
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
