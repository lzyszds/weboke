<script setup>
const props = defineProps({
  width: String,
  height: String,
  domAudioyl: {},
});
let data = reactive({
  index: props.height * 0.4, //默认音量
});
let onmousedown = (el) => {
  document.onmousemove = (e) => {
    data.index = props.height - (e.screenY - (860 + 150 - props.height));
    if (data.index > props.height) data.index = props.height;
    else if (data.index < 4) data.index = 4;
    props.domAudioyl.volume = data.index / props.height; //设置音量
    return false; //加个return 就不会有滑动时的bug，可以试试删除，就懂了
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
};
const onmouseclick = (e) => {
  data.index = props.height - (e.screenY - (860 + 150 - props.height));
  return false;
};

</script>

<template>
  <div class="content" @click="onmouseclick">
    <div class="strip" :style="'width:' + props.width + 'px;height:' + props.height + 'px'"></div>
    <div class="progress transition-all" :style="'height:' + data.index + 'px'">
      <div class="circular" @mousedown="onmousedown"></div>
    </div>
  </div>
</template>
<style scoped>
.content {
  display: flex;
  justify-items: center;
  align-items: center;
  cursor: var(--linkCup);
  border-radius: 10px;
}

.strip {
  background-color: rgb(144, 144, 144);
  border-radius: 10px;
}

.progress {
  position: absolute;
  background-color: #FE9600;
  width: 5px;
  height: 0px;
  bottom: 0;
  border-radius: 10px;
}

.circular {
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: transparent;
  border-radius: 50%;
  top: -4px;
  left: -3.5px;
  z-index: 999;
}
</style>
