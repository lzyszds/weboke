<!-- 详情页主要内容 -->

<script setup lang='ts'>
import { onMounted, defineProps, getCurrentInstance, defineEmits } from 'vue'
import { ElMessage, ElNotification } from 'element-plus'
import { useEventListener } from '@vueuse/core';
const { proxy } = getCurrentInstance() as any
const props = defineProps({
  main: String
});

const emit = defineEmits(['update'])

onMounted(() => {
  setTimeout(() => {
    const elimg = document.querySelector('.main') as HTMLDivElement
    if (elimg) {
      //给当前页面所有图片添加data-fancybox属性，让其可以点击放大
      elimg.querySelectorAll('img').forEach((element: any) => {
        element.setAttribute('data-fancybox', 'gallery')
        proxy.$fancyapps.Fancybox.bind('[data-fancybox="gallery"]', {
        })
      })
    }
    //给当前页面所有代码块复制按钮添加复制声明
    const copys = document.querySelectorAll('button.v-md-copy-code-btn') as any
    copys.forEach((element: any) => {
      useEventListener(element, 'click', (e: any) => {
        const text = e.target.parentElement.firstChild.innerText
        //将text复制到剪切板
        navigator.clipboard.writeText(text).then(() => {
          ElNotification.closeAll()
          ElNotification({
            dangerouslyUseHTMLString: true,
            message: `<i class="fa fa-copy"></i> 复制成功,转载请声明来源！`,
            position: 'bottom-right',
            duration: 2000,
            customClass: 'copy-success',
          })
        }, function (res) {
          console.log("lzy ~ res", res)
        });
      })
    })
    emit('update', 1)

  }, 1000)
})
</script>

<template>
  <div class="main vuepress-markdown-body v-md-editor-preview center">
    <div v-html="props.main"></div>
  </div>
</template>

<style lang="less" scoped>
p {
  margin: 10px 0;
  text-indent: 2em
}

.vuepress-markdown-body {
  margin-top: 20px !important;
  background-color: var(--themeColor);
  padding: 10px;
  font-size: 18px;
  border-radius: 20px;
  line-height: 40px;
  border: 4px solid #000;

  /* padding: 0; */
  &>div {
    background-color: #fff;
    border-radius: 30px;
    padding: 10px 20px;
    border: 4px solid #000;
    position: relative;
  }

  & :deep(img) {
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

    li {
      list-style: decimal !important;
    }

    p {
      text-indent: 0em;
      margin: 0
    }

    ol :deep(li) p:nth-child(1) {
      font-size: 19px;
      font-weight: 600;
      color: #555
    }

    ul {
      li {
        list-style: none
      }
    }
  }

}


ol .dark ol {
  color: #fff;
}

.dark ol :deep(li) p:nth-child(1) {
  color: #fff;
}

/* 解决问题，让a标签跳转至id时，可以迁出顶部状态栏的位置 */
.main :deep(h1)[id*=toc-head]:before,
.main :deep(h2)[id*=toc-head]:before,
.main :deep(h3)[id*=toc-head]:before,
.main :deep(h4)[id*=toc-head]:before,
.main :deep(h5)[id*=toc-head]:before,
.main :deep(h6)[id*=toc-head]:before {
  display: block;
  content: " ";
  height: 60px;
  margin-top: -60px;
  visibility: hidden;
}
</style>
