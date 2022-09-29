<script setup lang='ts'>
import { defineProps, watch, computed, ref } from 'vue'
import { useStore } from "../store/index";
const store = useStore();
const props = defineProps({
  fill: {
    type: String,
    default: '#fff'
  },
  name: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    default: 0
  }
})
const hoverIndexs = ref(0)
const hoverFn = () => {
  store.$state.hoverIndex = props.index
}
const offFn = () => {
  store.$state.hoverIndex = 0
}
const hoverIndex = computed(() => {
  return store.$state.hoverIndex
})
watch(() => hoverIndex, (val) => {
  hoverIndexs.value = val.value
}, { deep: true })

</script>

<template>
  <svg @mouseenter="hoverFn()" @mouseleave="offFn()" style="width:100%;"
    :style="{'fill':hoverIndexs == props.index?'#5161ce': props.fill,'background-color':'transparent'}" class="icon"
    wdith="30px" height="30px" aria-hidden="true">
    <use :xlink:href="`#${props.name}`"></use>
  </svg>
</template>

<style scoped>
svg {
  transition: .5s;
}

svg:hover {
  cursor: pointer;
  fill: #5161ce !important;
}
</style>
