<script setup>
import { L2Dwidget } from 'live2d-widget'

import { onMounted } from "vue";
const arr = {
  'kp31_3101': 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/kp31_3101/model.json',
  'g36_2407': 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/g36_2407/model.json',
  'kp31_310': 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/kp31_310/model.json',
  'paimeng': 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/paimeng/model.json',
  'sat8_2601南瓜': 'https://cdn.jsdelivr.net/gh/evrstr/live2d-widget-models/live2d_evrstr/sat8_2601/model.json',
  '': '',
}
onMounted(() => {
  L2Dwidget.init({
    model: {
      jsonPath: arr['sat8_2601南瓜'],
    }
  });
})
</script>

<template>
  <div>

  </div>
</template>

<style scoped>
</style>
