<!-- 首页的中间介绍 -->
<script setup lang='ts'>
import { defineProps, watch, computed } from 'vue'
import Icon from "@/components/iconAli.vue";
const list = [
  { name: 'icon-qq', fill: '#fff' },
  { name: 'icon-github', fill: '#fff' },
  { name: 'icon-tv', fill: '#fff' },
  { name: 'icon-youxiang', fill: '#fff' },
  { name: 'icon-rss', fill: '#fff' },
]
const prop = defineProps({
  item: {
    type: Object,
    default: {}
  },
  index: {
    type: Number,
    default: 0
  },
  css: {
    type: Object,
    default: {}
  }
})
const { item, index } = prop

</script>

<template>
  <div class="itemContent itemContentimg" :style="{...prop.css}">
    <img :src="item.headPortrait" alt="">
    <a class="itemTitle decoration">{{item.title}}</a>
    <div v-if="index==1" style="display:flex;margin-top: 20px;">
      <Icon v-for="(item,i) in list " :key="i" :index="i+1" :fill="item.fill" :name="item.name"></Icon>
    </div>
    <!-- <div class="itemText">{{item.content}}</div> -->
  </div>
</template>

<style scoped>
.itemTitle {
  font-size: 25px;
}

.itemContent {
  width: 100%;
  transition: .3s;
  position: absolute;
  top: 0;
  padding: 20px;
  text-align: center;
}


.itemContentimg img {
  widows: 60px;
  height: 60px;
  margin: 0 auto;
  border-radius: 50%;
}
</style>
