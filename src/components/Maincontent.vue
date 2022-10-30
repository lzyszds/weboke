<script setup lang='ts'>
import { onMounted, defineProps, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() as any
const props = defineProps({
  main: String
});

onMounted(() => {
  setTimeout(() => {
    const elimg = document.querySelector('.main') as HTMLDivElement
    if (elimg) {
      elimg.querySelectorAll('img').forEach((element: any) => {
        element.setAttribute('data-fancybox', 'gallery')
        proxy.$fancyapps.Fancybox.bind('[data-fancybox="gallery"]', {
        })
      })
    }
  }, 1000)
})
</script>

<template>
  <div class="main vuepress-markdown-body center">
    <div v-html="props.main"></div>
  </div>
</template>

<style scoped>
p {
  margin: 10px 0;
  text-indent: 2em
}

.vuepress-markdown-body {
  margin-top: 60px !important;
  background-color: #fff;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, .2);
  padding: 20px;
  padding-top: 10px;
  font-size: 18px;
  border-radius: 10px;
  line-height: 40px;
}

.vuepress-markdown-body :deep(img) {
  box-shadow: 0px 0px 4px 1px #888;
  border: 1px solid #000;
  padding: 2px;
  border-radius: 8px;
  cursor: var(--linkCup);
}

ol {
  list-style: decimal !important;
  border: 1px dashed #949494;
  padding: 15px 10px 15px 50px;
  color: #616161;
  margin-left: 0;
  border-radius: 10px;
}

li {
  list-style: decimal !important;
}

ol p {
  text-indent: 0em;
  margin: 0
}

ol :deep(li) p:nth-child(1) {
  font-size: 19px;
  font-weight: 600;
  color: #555
}

.dark ol {
  color: #fff;
}

.dark ol :deep(li) p:nth-child(1) {
  color: #fff;
}

/* 解决问题，让a标签跳转至id时，可以迁出顶部状态栏的位置 */
h1[id*=toc-head]:before,
h2[id*=toc-head]:before,
h3[id*=toc-head]:before,
h4[id*=toc-head]:before,
h5[id*=toc-head]:before,
h6[id*=toc-head]:before {
  display: block;
  content: " ";
  height: 60px;
  margin-top: -60px;
  visibility: hidden;
}
</style>
