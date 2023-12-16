<script setup lang='ts'>
import { onMounted, } from 'vue';
onMounted(() => {
  /*
    这支笔巧妙地利用SVG过滤器来创建“变形文本”效果。
    本质上，它将两个文本元素层叠在一起，
    并根据哪个文本元素应该更可见来模糊它们。
    应用模糊后，两个文本一起通过阈值过滤器，
    产生“粘稠”效果。检查CSS-注释#container规则的过滤器，
    看看模糊是如何工作的！
  */

  const elts: any = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
  };


  // 要在其中变形的字符串。您可以将这些更改为您想要的任何内容！
  const texts = [
    ["set", "sun", "down", "for", "orange", "sea", "evening", "wind", "down", "hoest", "love"],//落日沉溺于橘色的海，晚风沦陷于赤诚的爱
    ["Green", "Son", "Jin", "long", "my", "heart."],//青青子衿，悠悠我心。
    ["Take", "my", "hand", "and", "close", "your.", "You", "won't", "get", "lost."],//牵着我的手，闭着眼睛走你也不会迷路。
    ["There", "is", "no", "failure", "in", "life", "only", "smashing!"],//人生没有失败，只有粉碎！
    ["One", "can", "be", "destroyed", "but", "not", "defeated."],//一个人可以被毁灭，但不能被打败。
  ];


  // 控制变形的速度。
  const morphTime = 3;
  const cooldownTime = 0.25;
  const random: number = Math.floor(Math.random() * 3)
  let textIndex = texts[random].length - 1;
  let time: any = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts.text1.textContent = texts[random][textIndex % texts[random].length];
  elts.text2.textContent = texts[random][(textIndex + 1) % texts[random].length];

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  // 这里发生了很多神奇的事情，这就是将模糊过滤器应用于文本的原因。
  function setMorph(fraction) {
    // fraction = Math.cos(fraction * Math.PI) / -2 + .5;

    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[random][textIndex % texts[random].length];
    elts.text2.textContent = texts[random][(textIndex + 1) % texts[random].length];
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  // 动画循环，称为每帧。
  function animate() {
    requestAnimationFrame(animate);

    let newTime: any = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  // 启动动画。
  animate();

});
</script>

<template>
  <div>
    <div id="container">
      <span id="text1"></span>
      <span id="text2"></span>
    </div>
    <!-- 用于创建合并效果的SVG过滤器 -->
    <svg id="filters">
      <defs>
        <filter id="threshold">
          <!-- 
            -基本上只是一个阈值效果
            -具有足够高不透明度的像素被设置为完全不透明度，
            -所有其他像素被设置成完全透明。
           -->
          <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
    									0 1 0 0 0
    									0 0 1 0 0
    									0 0 0 255 -140" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
#container {
  /* Center the text in the viewport. */
  position: absolute;
  /* margin: auto; */
  width: 100%;
  height: 100px;
  top: 0;
  bottom: 0;
  /* This filter is a lot of the magic, try commenting it out to see how the morphing works! */
  filter: url(#threshold) blur(0.6px);
  pointer-events: none;
}

/* Your average text styling */
#text1,
#text2 {
  position: absolute;
  width: 100%;
  display: inline-block;
  font-family: 'black-Magic', sans-serif;
  font-size: 70pt;
  text-align: center;
  user-select: none;
}

svg {
  width: 100%;
  height: 100px;
}
</style>
