<script setup>


const player = ref(null)
const contentText = ref('只是因为在人群中多看了你一眼,再也没能忘记你那张苦瓜脸')
function scriptfnHandle() {
  const script = document.createElement('script')
  script.src = '/api/public/live2d/live2d-widget-master/autoload.js'
  document.body.appendChild(script)
}

onMounted(() => {
  scriptfnHandle()
  setTimeout(() => {
    const l2dDom = document.getElementById('waifu')
    drag(l2dDom)
  }, 5000)
})
//看板娘拖拽
function drag(el) {
  let dragBox = el; //获取当前元素
  dragBox.onmousedown = (e) => {
    let imgMakeBox = document.getElementById("app");
    //算出鼠标相对元素的位置
    let disX = e.clientX - dragBox.offsetLeft;
    let disY = e.clientY - dragBox.offsetTop;
    let moveW = dragBox.offsetWidth;
    let moveH = dragBox.offsetHeight;
    let parentW = imgMakeBox.offsetWidth;
    let parentH = imgMakeBox.offsetHeight;
    document.onmousemove = (e) => {
      //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX;
      let top = e.clientY - disY;
      let resW = parentW - moveW; //父盒子宽减去移动盒子的宽 = 最大可移动的区域
      let resH = parentH - moveH; //父盒子高减去移动盒子的高 = 可最大移动的区域
      if (left <= 0) left = 0;
      else if (left >= resW) left = resW;
      top = top >= resH ? resH : top <= 0 ? 0 : top;
      //移动当前元素
      // dragBox.style.left = left + "px";
      // dragBox.style.top = top + "px";
      dragBox.style.inset = `${top}px auto auto ${left}px`
      return false;
    };
    document.onmouseup = (e) => {
      //鼠标弹起来的时候不再移动
      document.onmousemove = null;
      //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
      document.onmouseup = null;
    };
  };
}
//事件

</script>

<template>
  <div>
    <audio ref="player" style="display:none"></audio>
  </div>
</template>

<style>
#live2d-widget {
  pointer-events: auto !important;
  color: #eee;

}

#live2d-widget #live2dcanvas {
  transform: translate(-15px, 0);
}
</style>
