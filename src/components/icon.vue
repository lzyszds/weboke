<script setup lang='ts'>
import { defineProps } from 'vue'
const props = defineProps({
  fill: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
})

</script>

<template>
  <svg style="width:100%;" :style="{ 'fill': props.fill, 'background-color': 'transparent' }" class="icon" wdith="30px"
    height="30px" aria-hidden="true">
    <use :xlink:href="`#${props.name}`"></use>
  </svg>
</template>

