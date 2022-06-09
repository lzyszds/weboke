<script setup>
import { reactive, ref, defineProps, watch } from "vue";
const props = defineProps({
  width: String,
  height: String,
  domAudioyl: {},
  value: String,
  sumValue: String,
});
let data = reactive({
  index: 0,
});
const times = (time) => {
  time = time.split(":");
  return Math.floor(Number(time[0]) * 60 + Number(time[1]));
}


const mevar = props.width / 100;
let onmousedown = (e) => {
  const progressLeft = e.clientX - e.srcElement.offsetLeft;
  document.onmousemove = (e) => {
    data.index = e.clientX - progressLeft;
    if (data.index > props.width) data.index = props.width;
    else if (data.index < 0) data.index = 0;
    return false;
  };
  document.onmouseup = (e) => {
    document.onmousemove = null;
  };
};
const onmouseclick = (e) => {
  data.index = e.clientX - 86;
};
watch(() => {
  return props.value
}, (newVal) => {
  data.index = times(newVal) / times(props.sumValue) * props.width
  console.log(data.index);
});
</script>

<template>
  <div class="content" @click="onmouseclick">
    <div class="strip" :style="'width:' + props.width + 'px;height:' + props.height + 'px'"></div>
    <div class="progress" :style="'width:' + data.index + 'px'">
      <div class="circular" @mousedown="onmousedown" @mousemove="onmousemove"></div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  justify-items: center;
  align-items: center;
  cursor: pointer;
}

.strip {
  background-color: rgb(144, 144, 144);
}

.progress {
  position: absolute;
  background-color: aquamarine;
  height: 3px;
}

.circular {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: aquamarine;
  border-radius: 50%;
  top: -4px;
  right: -10px;
  z-index: 999;
}
</style>
