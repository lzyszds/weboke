<template>
  <div class=" head h-48 b-white p-14 pl-9 bg-white magics">
    <p class="magic py-3 text-gray-500 text-2xl tracking-widest magic-text">
      <span class="text-5xl leading-none ">项目开始</span>
      <br />
      <span class="magic-star">
        <svg viewBox="0 0 512 512">
          <path
            d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
        </svg>
      </span>
      <span class="magic-star">
        <svg viewBox="0 0 512 512">
          <path
            d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
        </svg>
      </span>
      <span class="magic-star">
        <svg viewBox="0 0 512 512">
          <path
            d="M512 255.1c0 11.34-7.406 20.86-18.44 23.64l-171.3 42.78l-42.78 171.1C276.7 504.6 267.2 512 255.9 512s-20.84-7.406-23.62-18.44l-42.66-171.2L18.47 279.6C7.406 276.8 0 267.3 0 255.1c0-11.34 7.406-20.83 18.44-23.61l171.2-42.78l42.78-171.1C235.2 7.406 244.7 0 256 0s20.84 7.406 23.62 18.44l42.78 171.2l171.2 42.78C504.6 235.2 512 244.6 512 255.1z" />
        </svg>
      </span>
      恰沐春风共同游，终只叹，木已舟。
    </p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
let index = 0,
  interval = 1000;

const rand = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 70)}%`);
  star.style.setProperty("--star-top", `${rand(-10, 70)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

onMounted(() => {
  for (const star of document.getElementsByClassName("magic-star")) {
    setTimeout(() => {
      animate(star);

      setInterval(() => animate(star), 3000);
    }, index++ * (interval / 3))
  }
})

</script>
<style scoped>
.head {
  font-family: "douyu";
}

.magic {
  display: inline-block;
  position: relative;
}

.magic {
  user-select: none;
}

.magic-star {
  --size: clamp(50px, 1.5vw, 30px);
  animation: scale 1s infinite linear;
  display: block;
  height: var(--size);
  left: var(--star-left);
  position: absolute;
  top: var(--star-top);
  width: var(--size);
}

.magic-star svg {
  animation: rotate 3s linear infinite;
  display: block;
  opacity: 0.7;
}

.magic-star svg path {
  fill: var(--violet);
}

@keyframes background-pan {
  from {
    background-position: 0% center;
  }

  to {
    background-position: -200% center;
  }
}

@keyframes scale {

  from,
  to {
    transform: scale(0);
  }

  50% {
    transform: scale(.4);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(180deg);
  }
}

.magics {
  position: fixed;
  top: 60px;
}

.magic-text {
  animation: background-pan 3s linear infinite;
  background: linear-gradient(to right,
      var(--purple),
      var(--violet),
      var(--pink),
      var(--purple));
  background-size: 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;
}
</style>
