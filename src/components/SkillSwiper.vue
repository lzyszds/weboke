<script setup lang='ts'>
import LzyIcon from './LzyIcon.vue';

const skillData = ref<any>([
  [{
    name: 'Js',
    icon: 'logos:javascript',
    color: '#000'
  },
  {
    name: 'Vue',
    icon: 'logos:vue',
    color: '#B5ECAB'
  },],
  [{
    name: 'Vite',
    icon: 'logos:vitejs',
    color: '#B5ECAB'
  },
  {
    name: 'React',
    icon: 'logos:react',
    color: '#fff'
  },],
  [{
    name: 'Node',
    icon: 'logos:nodejs-icon',
    color: '#fff'
  },
  {
    name: 'Ts',
    icon: 'logos:typescript-icon',
    color: '#3178C6'
  },],
  [{
    name: 'Mysql',
    icon: 'logos:mysql',
    color: '#fff'
  },
  {
    name: 'Git',
    icon: 'logos:git-icon',
    color: '#fff'
  },],
  [{
    name: 'Webpack',
    icon: 'logos:webpack',
    color: '#8DD6F9'
  },
  {
    name: 'Docker',
    icon: 'logos:docker-icon',
    color: '#fff'
  },],
  [{
    name: 'Nginx',
    icon: 'logos:nginx',
    color: '#fff'
  },
  {
    name: 'Linux',
    icon: 'logos:linux-tux',
    color: '#FCC624'
  },],
  [{
    name: 'Java',
    icon: 'logos:java',
    color: '#ffffff'
  },
  {
    name: 'Electron',
    icon: 'logos:electron',
    color: '#fff'
  },],
  [{
    name: 'bun',
    icon: 'logos:bun',
    color: '#fff'
  },
  {
    name: 'Photoshop',
    icon: 'logos:adobe-photoshop',
    color: '#5161ce'
  },],
])
let translateX = 0
// 动画循环，称为每帧。
function animate() {
  const skillItem = document.querySelector('.skill-item') as HTMLDivElement
  if (!skillItem) return requestAnimationFrame(animate);
  skillItem.style.transform = `translateX(-${translateX++ / 5}px)`
  requestAnimationFrame(animate);
  if (translateX / 5 === 1120) {
    translateX = 0
  }
}

onMounted(() => {
  // 启动动画。
  animate()
})
</script>

<template>

  <div class="skillMain">
    <div class="skill-item">
      <div class="skillCard" v-for="(item, _index) in skillData">
        <div :style="'background-color:' + itemc.color" v-for="(itemc, index) in item" :key="index">
          <LzyIcon :name="itemc.icon" height="70" />
        </div>
      </div>
      <div class="skillCard" v-for="(item, _index) in skillData">
        <div :style="'background-color:' + itemc.color" v-for="(itemc, index) in item" :key="index">
          <LzyIcon :name="itemc.icon" height="70" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.skillMain {
  position: absolute;
  top: 0%;
  right: -55rem;
  transform: rotate(-35deg);

  .skill-item {
    width: 1200px;
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;

    .skillCard {
      display: grid;

      &>div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 10px;
        width: 8rem;
        height: 8rem;
        padding: 10px;
        border-radius: 20px;
        background-color: var(--themeColor);
        box-shadow: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
        transition: all .3s;

        &:hover {
          transform: scale(1.1);
          //缩小阴影
          box-shadow: 0 0px 10px -3px var(--themeColor);
        }
      }
    }
  }
}


@keyframes rowup {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>
