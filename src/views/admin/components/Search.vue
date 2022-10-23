<script setup lang='ts'>
import http from '@/http/http';
import { ref, defineProps, defineEmits } from 'vue';
import { httpData } from '../children/type'
const emit = defineEmits(['searchData'])
const props = defineProps({
  type: {
    type: String,
    default: 'default'
  },
})
//搜索框内容
const searchInput = ref('')

const search = () => {
  switch (props.type) {
    case 'user':
      const pagePara = '/admin/searchUser?search=' + searchInput.value
      http('get', pagePara).then((res: httpData) => {
        emit('searchData', {
          data: res.data,
          searchInput: searchInput.value
        })
      })
      break;
  }
}
</script>

<template>
  <div class="search">
    <el-input class="searchInput" @keydown.enter="search" v-model="searchInput" placeholder="search" clearable />
    <el-button class="btn" @click="search" type="primary">Go</el-button>
  </div>
</template>

<style lang="less" scoped>
.search {
  height: 50px;
  width: 100%;

  :deep(.searchInput) {
    width: 200px;
    margin: 10px 0 0 20px;

    .el-input__wrapper {
      border-radius: 15px 0 0 15px;

      &.is-focus {
        box-shadow: 0 0 0 1px var(--themeColor) inset
      }
    }
  }

  :deep(.btn) {
    margin-top: 10px;
    border-radius: 0 15px 15px 0;
    background-color: var(--themeColor);
    border-color: transparent;
  }
}
</style>
