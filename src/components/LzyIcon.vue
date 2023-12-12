<script setup lang='ts' name="lzyIcon">
import { Icon } from '@iconify/vue';

interface Props {
  name: string,
  height?: string,
  style?: string | Object,
  animation?: string,
}

const props = defineProps<Props>()

</script>

<template>
  <Icon class="lzyIcon" :class="props.animation" :icon="name" :width="props.height ?? '20px'" :height="props.height ?? '20px'"
    :style="props.style"></Icon>
</template>

<style lang='less' scoped>
.lzyIcon {
  cursor: pointer;
  vertical-align: text-bottom;
}

.animate__pulse {
  animation: pulse 3s infinite;
}

.animate__rubberBand {
  animation: rubberBand 3s infinite;
}

.animate__heartBeat {
  animation: heartBeat 1s infinite;
}
</style>
 