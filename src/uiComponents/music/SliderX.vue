<script setup>
const props = defineProps({
  width: String,
  height: String,
  domAudioyl: {},
  value: String,
  sumValue: String,
});
let data = reactive({
  index: 0,
  calibindex: true
});
const times = (time) => {
  time = time.split(":");
  return Math.floor(Number(time[0]) * 60 + Number(time[1]));
}


let onmousedown = (e) => {
  const progressLeft = e.clientX - e.srcElement.offsetLeft;
  document.onmousemove = (e) => {
    data.index = e.clientX - progressLeft;
    if (data.index > props.width) data.index = props.width;
    else if (data.index < 0) data.index = 0;
    //  props.domAudioyl
    return false;
  };
  document.onmouseup = (e) => {
    document.onmousemove = null;
  };
};
const onmouseclick = (e) => {
  data.index = e.clientX - 86;
};
const scaleControl = (boolean) => {
  data.calibindex = boolean
}
watch(() => {
  return props.value
}, (newVal) => {
  data.index = times(newVal) / times(props.sumValue) * props.width
});
</script>

<template>
  <div class="content" @click="onmouseclick" @mousemove="scaleControl(true)" @mouseout="scaleControl(false)">
    <div class="strip" :style="'width:' + props.width + 'px;height:' + props.height + 'px'"></div>
    <div class="progress" :style="'width:' + data.index + 'px'">
      <div class="circular" :style="data.calibindex ? 'opacity:1' : 'opacity:0'" @mousedown="onmousedown"
        @mousemove="onmousemove">
      </div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  justify-items: center;
  align-items: center;

}

.strip {
  background-color: rgb(144, 144, 144);
}

.progress {
  position: absolute;
  background-color: #FE9600;
  height: 3px;
}

.circular {
  position: absolute;
  width: 12px;
  height: 12px;
  /* background-color: #FE9600; */
  border-radius: 50%;
  top: -5px;
  right: -8px;
  z-index: 999;
  transition: .3s;
  opacity: 0;
  background-image: url('@/assets/icon/橘子.svg');
  background-size: cover;
}
</style>
