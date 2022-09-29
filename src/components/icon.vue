<script setup lang='ts'>
import { defineProps } from 'vue'
const props = defineProps({
  fill: {
    type: String,
    default: '#fff'
  },
  name: {
    type: String,
    default: ''
  },
})

</script>

<template>
  <svg style="width:100%;" :style="{'fill': props.fill,'background-color':'transparent'}" class="icon" wdith="30px"
    height="30px" aria-hidden="true">
    <use :xlink:href="`#${props.name}`"></use>
  </svg>
</template>

<style scoped>
/* svg {
  transition: .5s;
}

svg:hover {
  cursor: pointer;
  fill: #5161ce !important;
} */
</style>
