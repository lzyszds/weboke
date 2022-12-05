<template>
  <div class="musicContent" @mouseleave="mouseleave" @mouseenter="mouseenter" :style="data.index?'width:415px':null">
    <audio id="player" ref="player" controls="controls" @timeupdate="update" class="hidden"></audio>
    <!-- 图片 -->
    <div class="musiclogo">
      <img class="logo" ref="img"
        src="https://y.gtimg.cn/music/photo_new/T002R300x300M0000023rvqc3zCopb.jpg?max_age=2592000" alt />
      <img @click="playSvg" class="playlogo" :class="data.svg" alt="" ref="bofang_icon"
        :src="`/src/assets/icon/music/${!data.isplaySvg ? '播放' : '暂停'}.svg`" />
      <!-- 这个路径得好好瞧瞧，vite不能用cli的 require。 使用这个src的时候，去F12看看路径是否正确 -->
    </div>
    <!-- 歌单列表 -->
    <el-card class="box-card" :style="data.index && data.box_card ? null : 'bottom:-300px;z-index0'">
      <div v-for="(item, index) in data.musicList" :key="index" class="musiclist"
        :class="{ 'borderleft': data.bordermou[index] }" @click="mclistTabFn(item, index)">
        <div class="titlet ">{{ item.name }}</div>
        <div class="titlet ">{{ item.artist }}</div>
      </div>
    </el-card>
    <!-- 切歌歌词快进 -->
    <!-- <div :style="[data.styleGrid]" class="tools"> -->
    <div class="tools" :style="data.index ? 'display:flex' : null">
      <!-- <div class="grid grid-cols-3 gap-2"> -->
      <div class="toolsItem">
        <!-- 当前播放的歌名 -->
        <span> {{ mcName }} </span>
        <div class="flex py-1">
          <button class="btnsvg" @click="prev">
            <img src="@/assets/icon/music/top.svg" alt />
          </button>
          <button class="btnsvg" @click="playSvg" v-if="!data.isplaySvg">
            <img src="@/assets/icon/music/play.svg" alt />
          </button>
          <button class="btnsvg" @click="playSvg" v-else>
            <img src="@/assets/icon/music/stop.svg" alt />
          </button>
          <button class="transform btnsvg" @click="next">
            <img src="@/assets/icon/music/bottom.svg" alt />
          </button>
          <button class="btnsvg" @click="onListmusic">
            <img src="@/assets/icon/music/menu.svg" alt />
          </button>
        </div>
      </div>
      <div class="slider">
        <SliderX :width="'145'" :height="'3'" :value="data.audioCurrentTimeStr" :sumValue="data.audioCurrentTime"
          :domAudioyl="data.domAudioyl"></SliderX>
        <div class="select-none leading-6 mr-10">
          <span style="margin-left: 15px">{{ data.audioCurrentTimeStr }}</span>
          /
          <span>{{ data.audioCurrentTime }}</span>
        </div>
        <div class="flex py-1 relative">
          <div class="volumeclass">
            <button class="btnsvg">
              <img src="@/assets/icon/music/volume.svg" alt />
            </button>
            <div class="volumItem " style="bottom: 25px">
              <SliderY :width="'5'" :height="`${data.volumeHeight}`" :domAudioyl="data.domAudioyl"></SliderY>
            </div>
          </div>
          <!-- 歌词开关 -->
          <button class="btnsvg" @click="lyrichandle">
            <img src="@/assets/icon/music/lyric.svg" alt />
          </button>
        </div>
      </div>
    </div>

    <!-- 隐式开关 100  -->
    <div class="rightBtn" @click="click">
      <img width="20" src="@/assets/icon/rightmsk.png" alt=""
        :style="data.index ? 'transform: rotate(180deg)' : null" />
    </div>
    <!-- 歌词content -->
    <div class="lyricDiv" v-if="data.islyric">
      <!-- <textarea name="lyric" id="" cols="30" rows="10" v-model="data.lyric.content"></textarea> -->
      <p class="lyric">{{ data.lyric.content[0] }}</p>
      <p class="lyric">{{ data.lyric.content[1] }}</p>
    </div>
  </div>
</template>

<script setup >
import { reactive, ref, onMounted, watch, nextTick, getCurrentInstance } from "vue";
import SliderX from "./SliderX.vue";
import SliderY from "./SliderY.vue";
import { storeToRefs } from "pinia";
import { useStore } from "@/store/index";
import { ElMessage, ElNotification, ElCard } from "element-plus";
import http from "@/http/http";
import { useRoute } from "vue-router";

const route = useRoute();
let data = reactive({
  bordermou: [true], //歌单列表鼠标移入样式
  volumeHeight: 35,
  lyric: {
    //歌词
    content: ["暂无歌词", null],
    state: 2, //1: 有歌词 2:无歌词 3:歌词加载中
    data: [],
    minutes: [],
    index: 0,
  },
  islyric: false, // 歌词开关
  index: false, // 打开关闭音乐面板
  box_card: false, //歌单列表控制
  isplaySvg: false, // 播放暂停
  playUrl: "",
  svg: "",
  styleGrid: "display:none",
  domAudioyl: null, //音频dom属性
  audioLenght: 0, //音频总时长
  audioCurrentTime: "0:00", //音频当前时长
  audioCurrentTimeStr: "0:00", //音频当前时长字符串
  musicList: [],
  musicId: [],
  hasClick: false, //是否点击过歌单列表
});

http('get', "/music/register/anonimous").then((res) => {
  // console.log(`lzy ~ res`, res)
});
http('get', "/music/login/refresh").then((res) => {
  // console.log(`lzy ~ res`, res)
});

http('get', "/music/login/status").then((res) => {
  // console.log(`lzy ~ res`, res)
}).catch(err => {
  if (err.response.status == '400') {
    http('get', "/music/login/cellphone?phone=15077415810&password=a395878870").then((res) => {
      console.log(`lzy ~ res`, res)
    });
  }
})
// http('get', "/music/logout").then((res) => {
//   console.log(`lzy ~ res`, res)
// })
// http('get', "/adminApi/admin/musicLogin").then((res) => {
//   console.log(`lzy ~ res`, res)
// })
http('get', "/music/playlist/detail?id=7480206477").then((res) => {
  data.musicId.push(...res.privileges);
});
let timer;
const store = useStore();
const bofang_icon = ref(null); //audio标签src地址
const player = ref(null); //audio标签src地址
const img = ref(null); //歌曲图片地址
const mcName = ref("Deyang Gatal Gatal Sa (Remix)"); //歌曲名称
data.domAudioyl = player;
// player.value.duration;
const mouseenter = (e) => {
  document.querySelector(".musicContent").classList.add("onMright");
};
const mouseleave = (e) => {
  if (!data.index) {
    document.querySelector(".musicContent").classList.remove("onMright");
  }
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
    player.value.src = data.musicList[index + 1].url;
    img.value.src = data.musicList[index + 1].picUrl;
    mcName.value = data.musicList[index + 1].name;
  }
  //判断当前歌曲是否存在（网易云有些歌曲会莫名其妙被删除）
  const getDge = player.value.src.indexOf("/null") != -1;
  if (getDge) {
    ElNotification({
      title: "提示",
      message: "歌曲时长获取失败,歌曲不存在,即将播放下一首",
      type: "warning",
    });
  } else {
    data.audioCurrentTime = timeToMinute(parseInt(player.value.duration));
  }
}

const timeToMinute = (times) => {
  var timeFormat;
  if (times > -1) {
    var hour = Math.floor(times / 3600);
    var min = Math.floor(times / 60) % 60;
    var sec = times % 60;
    if (hour < 10) {
      timeFormat = "0" + hour + ":";
    } else {
      timeFormat = hour + ":";
    }
    if (min < 10) {
      timeFormat += "0";
    }
    timeFormat += min + ":";
    if (sec < 10) {
      timeFormat += "0";
    }
    timeFormat += sec.toFixed(2);
  }
  if (!timeFormat) return timeFormat = '00:00'
  timeFormat = timeFormat.substring(0, timeFormat.length - 3);
  if (min == 0) {
    timeFormat = timeFormat.substring(4, timeFormat.length);
  } else {
    timeFormat = timeFormat.substring(3, timeFormat.length);
  }
  return timeFormat;
};

//弹出或关闭 音乐播放器
const click = (e) => {
  data.index = !data.index;
  data.hasClick = data.index;
  if (!data.index) data.box_card = false;
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
    getMusicPlay();
  } else player.value.pause();
  if (!data.isplaySvg) data.svg = "top-4 left-8 w-16 h-16";
  else data.svg = "top-12 left-18 w-12 h-12";
};
//上一首
const prev = (e) => {
  const index = data.bordermou.indexOf(true); //获取当前播放的歌单列表索引
  console.log(`lzy  index`, data.musicList.length - 1)
  const key = index - 1 == 0 ? data.musicList.length - 1 : index - 1; //判断是否为最后一首
  player.value.src = data.musicList[key].url;
  img.value.src = data.musicList[key].picUrl;
  mcName.value = data.musicList[key].name;
  data.bordermou[key] = true;
  data.bordermou[index] = false;
  getMusicPlay();
};
//下一首
const next = (e) => {
  const index = data.bordermou.indexOf(true); //获取当前播放的歌单列表索引
  const key = index + 1 == data.musicList.length ? 0 : index + 1; //判断是否为最后一首
  player.value.src = data.musicList[key].url;
  img.value.src = data.musicList[key].picUrl;
  mcName.value = data.musicList[key].name;
  data.bordermou[key] = true;
  data.bordermou[index] = false;
  getMusicPlay();
};

//打开歌单列表
const onListmusic = () => {
  data.box_card = !data.box_card;
};
//获取歌单列表，实现渲染
const onListmc = async () => {
  let urls = [];
  data.musicId.forEach((item, index) => {
    urls.push(item.id);
  });
  const _data = await store.getMusicDetails(urls, false)
  _data.res.forEach((res, index) => {
    data.musicList.push({
      id: res.id,
      url: res.url,
      name: _data.item[index].name,
      artist: _data.item[index].ar[0].name, //作者
      picUrl: _data.item[index].al.picUrl, //封面图片
    });
  });
};
//歌单点击播放歌曲事件
const mclistTabFn = (e, i) => {
  data.bordermou.forEach((item, index) => {
    data.bordermou[index] = false;
  });
  data.bordermou[i] = true;
  getMusicPlay(e);
};

const getMusicPlay = (value) => {
  if (value) {
    player.value.src = value.url;
    img.value.src = value.picUrl;
    // mcName.value = data.musicList[index + 1].name;
  }
  data.isplaySvg = true;
  data.svg = "top-12 left-18 w-12 h-12";
  player.value.play();
  theLyricsLogic();
  //需要控制提示是否为试听歌曲，防止反复触发提醒
  isElMessage = true;
};
const update = () => {
  //音乐每播放一帧执行一次以下方法
  eventList();
  data.lyric.minutes.forEach((res, index) => {
    if (res < player.value.currentTime) {
      data.lyric.index = index;
    }
  });
  const lyricconten = data.lyric.data[data.lyric.index];
  const lyricconten1 = data.lyric.data[data.lyric.index + 1];
  if (!lyricconten || !lyricconten1) return
  data.lyric.content[0] = lyricconten.substring(lyricconten.indexOf("]") + 1); //当前歌词
  data.lyric.content[1] = lyricconten1.substring(lyricconten1.indexOf("]") + 1); //下一句歌词
  // console.log(lyricconten.indexOf("]") + 1);
};
//歌词开关
const lyrichandle = () => {
  data.islyric = !data.islyric;
  const example = document.querySelector("#example>.example-demonstration")
  if (data.islyric) {
    if (example)
      example.innerHTML = '&nbsp;'
    theLyricsLogic();
  } else {
    example.innerHTML = 'When the content ends, turn the page to see the new content'
  }
};
//歌词逻辑
const theLyricsLogic = () => {
  data.lyric.minutes = [];
  let id = null;
  data.musicList.forEach((item, index) => {
    if (item.picUrl == img.value.src) id = item.id;
  });
  http('get', "/music/lyric?id=" + id, null).then((res) => {
    // data.lyric.content = res.lrc.lyric
    data.lyric.state = 1;
    data.lyric.data = res.lrc.lyric.split("\n");
    data.lyric.data.forEach((item, index) => {
      const posTime = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
      data.lyric.minutes.push(
        Number(posTime.split(":")[0] * 60 + Math.floor(posTime.split(":")[1]))
      );
    });
  });
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
  onListmc().then(() => {
    //页面初始的时候播放器默认加入歌单第一首歌曲的数据进入播放器
    player.value.src = data.musicList[0].url;
    img.value.src = data.musicList[0].picUrl
    mcName.value = data.musicList[0].name;
  });
});
const routerPath = route.path;
watch(route, (newVal) => {
  if (newVal.path != routerPath) {
    data.index = false;
    document.querySelector('.musicContent').classList.remove('onMright')
  }
});
</script>

<style lang="less" scoped>
.musicContent {
  width: 100px;
  height: 6rem;
  position: fixed;
  bottom: 0;
  left: -80px;
  display: flex;
  transition: all 0.3s ease-in-out;
  background-color: #fff;
  // border: 1px solid #e2e8f0;
  /* display: ; */
  z-index: 9999999;
  border-radius: 0 6px 6px 0;

  /* 默认播放器隐藏 */
  #player {
    display: none;
  }

  &.onMright {
    left: 0;
  }

  &.toright {
    width: 415px;
  }

  .musiclogo {
    width: 8rem;
    height: 100%;
    background: rgba(254, 243, 199, 1);
    position: relative;
    z-index: 30;


    img {
      &.logo {
        width: 80px;
        height: 100%;
        object-fit: cover;
      }

      &.playlogo {
        position: absolute;
        cursor: var(---linkCup);
        transition: all 0.3s ease-in-out;
        top: 12px;
        left: 22px;
        width: 36px;
        height: 36px;
      }
    }
  }



  /* 歌单列表 */
  &:deep(.el-card) {
    border: none;

    .el-card__body {
      padding: 0;
    }

    &.box-card {
      position: absolute;
      left: 0;
      width: 100%;
      height: 258px;
      padding: 0;
      opacity: 1;
      bottom: 6.5rem;
      z-index: -1;

      .musiclist {
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
        border-left: .4rem solid transparent;
        cursor: var(--linkCup);
        border-bottom: 1px solid #e2e8f0;

        &.borderleft {
          border-left: .4rem solid var(--themeColor);
        }

        .titlet {
          height: 3rem;
          color: #4b5563;
          line-height: 3rem;
          font-size: 1.4rem;
          padding: 5px 5px;
          overflow: hidden;
          font-family: 'almama';

          &:nth-child(1) {
            width: 70%;
          }

          &:nth-child(2) {
            width: 30%;
            text-align: center;
          }


        }

        &:hover {
          background-color: #eee;
        }
      }
    }

  }


  .tools {
    width: 30rem;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    padding: 0 0.75rem;
    background-color: #fff;
    flex-wrap: wrap;
    display: none;

    .toolsItem {
      width: 32rem;
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      background-color: #fff;
      padding-top: 5px;

      &>span {
        font-size: 1.25rem;
        margin-right: 0.75rem;
        width: 200px;
        //文本超出两行显示省略号
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

      }

      &>div {
        display: flex;

      }
    }

    .slider {
      width: 30rem;
      display: flex;
      justify-content: space-between;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      background-color: rgb(255, 255, 255);



      &>div {
        display: flex;
        align-items: center;

        .volumeclass {

          .volumItem {
            position: absolute;
            right: 50px;
            width: 40px;
            height: 0;
            z-index: 50;
            justify-content: center;
            overflow: hidden;
            transition: all 0.3s ease-in-out;
            display: flex;
          }

          &:hover .volumItem {
            height: 35px;
          }
        }


      }
    }

    .btnsvg {
      filter: invert(0);
      vertical-align: auto;
      border: none;
      background-color: transparent;
      width: 20px;
      height: 20px;
      padding: 0;
      cursor: var(--linkCup);

      img {
        width: 100%;
        height: 100%;
      }

      &.transform {
        transform: rotate(180deg);
      }
    }
  }

  .rightBtn {
    width: 20px;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 0 3px 3px 0;
    // position: absolute;
    // right: 0px;
    cursor: pointer;
    z-index: 40;
    background-color: #5161ce;
    cursor: var(--linkCup);
  }

  .lyricDiv {
    width: 100%;
    height: 4rem;
    padding: 0.5rem 0;
    position: fixed;
    bottom: 20px;
    text-align: center;
    font-size: 1.5rem;
    font-family: "almama";
    user-select: none;
    pointer-events: none;

    .lyric {
      // color: #FE9600;
      color: var(--themeColor);
      text-shadow: 0px 0px 1px #000,
        0px 0px 1px #000;
      padding: 0;
      margin: 0;

      &:nth-child(2) {
        font-size: 1.25rem;
        padding: 0.5rem 0;
      }
    }

  }
}
</style>
