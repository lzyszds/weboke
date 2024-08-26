<script setup lang='ts'>
import LzyIcon from './LzyIcon.vue';
const { $axios } = window
const footData = await $axios({
  url: '/api/system/getFooterInfo',
  method: 'get'
})
console.log(footData);
const userInfo = [{
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}, {
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}, {
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}, {
  name: 'github',
  icon: 'grommet-icons:github',
  url: 'https://github.com/lzyszds'
}]
console.log(`lzy  userInfo:`, userInfo)

</script>

<template>
  <div class="footer">
    <div class="userLink">
      <div class="info" v-for="(item, index) in userInfo" :key="index">
        <LzyIcon :name="item.icon" height="25px" style="color: #fff;"></LzyIcon>
      </div>
    </div>
    <div class="navigation">
      <div class="column" v-for="(items, index) in footData" :key="index">
        <div class="title">{{ items.footer_content }}</div>
        <div v-for="(item, index) in items.children" :key="index">
          <!-- 打开新窗口 -->
          <a :href="item.footer_url" target="_blank">{{ item.footer_content }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.footer {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  padding-top: 20px;
  background-color: transparent;

  .userLink {
    display: flex;
    justify-content: center;
    gap: 50px;

    .info {
      width: 25px;
      height: 25px;
      padding: 5px 5px 4px;
      background-color: #363636;
      border-radius: 50%;
    }
  }

  .navigation {
    display: flex;
    gap: 80px;
    font-size: 1.7rem;
    justify-content: center;
    margin-top: 20px;

    .column {
      display: grid;
      gap: 10px;
      grid-template-rows: 40px repeat(6, 1fr);
      font-size: 1.5rem;
      font-family: '微软雅黑';

      .title {
        font-size: 1.7rem;
        font-weight: 600;
        margin-bottom: 20px;
        color: #363636;
      }

      a {
        color: #363636;
      }
    }
  }
}
</style>
