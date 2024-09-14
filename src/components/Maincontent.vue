<!-- 详情页主要内容 -->

<script setup lang='ts'>
import { onMounted, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import { useEventListener } from '@vueuse/core';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

const { proxy } = getCurrentInstance() as any
const props = defineProps({
  main: String,
  aid: Number,
});

const emit = defineEmits(['update'])
const aiContent = ref('AI摘要还在生成中，请稍等...')
const aiContentHtml = computed(() => {
  return xss.process(
    VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(aiContent.value)
  )
})
const doneFlag = ref(false)

onMounted(() => {
  setTimeout(async () => {
    const elimg = document.querySelector('.main') as HTMLDivElement
    if (elimg) {
      //给当前页面所有图片添加data-fancybox属性，让其可以点击放大
      elimg.querySelectorAll('img').forEach((element: any) => {
        element.setAttribute('data-fancybox', 'true')
        proxy.$fancyapps.Fancybox.bind('data-fancybox', {
          dragToClose: false,
          Image: {
            zoom: false,
          },
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

    getAbstract('/firstHonoApi/api/openAI/getAifox?aid=' + props.aid)

  }, 500)
})


//获取AI摘要
function getAbstract(url) {
  return new Promise<any>(async (_resolve, reject) => {

    try {
      const result = await fetch(url)
      const textDecoder = new TextDecoder()
      const reader = result.body?.getReader()!
      aiContent.value = ''
      while (true) {
        const { done, value } = await reader.read()
        doneFlag.value = done
        if (done) {
          break
        }
        const text = textDecoder.decode(value)
        const lines = text.split('\n'); // 将部分数据与新数据合并后再按行分割

        for (let line of lines) { // 逐行处理数据
          // 添加延迟，单位为毫秒（例如延迟 100 毫秒） 一帧等于 16.67 毫秒
          // await new Promise(resolve => setTimeout(resolve, 30));
          if (line) {
            aiContent.value += line.replace("data: ", ""); // 将逐字生成的数据拼接到 aiContent 中
          }
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}
</script>

<template>
  <div id="markdownMain" class="main vuepress-markdown-body v-md-editor-preview ">
    <div class="aiMain">
      <p class="abstract" id="abstract">
        <LzyIcon name="mdi:robot-excited-outline"></LzyIcon>文章摘要
      </p>
      <div class="aiContent">
        <p>
          <span class="aiText" v-html="aiContentHtml"></span>
          <LzyIcon v-if="!doneFlag" name="ph:fan-duotone"></LzyIcon>
        </p>
      </div>
      <p class="affirm">此内容根据文章生成，未经过人工审核，仅用于文章内容的解释与总结，不承担任何法律责任！</p>
    </div>
    <div class="mainHtml" v-html="props.main"></div>
  </div>
</template>

<style lang="scss" scoped>
p {
  margin: 10px 0;
  text-indent: 2em
}

.vuepress-markdown-body {
  margin-top: 40px !important;
  background-color: var(--themeColor);
  padding: 10px;
  font-size: 18px;
  border-radius: 20px;
  line-height: 40px;
  border: 4px solid #000;
  animation: translateYopacity .7s .1s 1 ease-in-out;

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

.aiMain {
  background-color: rgb(243, 243, 243);
  border-radius: 10px !important;
  padding: 12px;
  line-height: 1.3;
  border: #000;
  margin-bottom: 16px;
  min-height: 101.22px;

  div.aiContent {
    display: flex;
    justify-content: center;
    align-items: center;
    text-indent: 0;
    font-weight: 600;
    /* 字体间隔 */
    letter-spacing: 0.5px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 4px #eee;
    font-size: 14px;
    padding: 8px 5px;
    word-break: break-all;
    min-height: 26px;

    p {
      margin: 0 5px;
    }

    .aiText {
      :deep(p) {
        display: inline;
      }
    }

    svg {
      color: var(--themeColor);
      animation: blinking-cursor 1s infinite;
      vertical-align: text-top;
    }
  }

  p.abstract {
    background-color: var(--borderColor);
    color: #000;
    border-radius: 10px;
    margin: 0;
    margin-bottom: 10px;
    font-size: 15px;
    text-indent: 0;
    padding-left: 10px;
    font-family: 'dindin';
    animation-duration: 0.5s;
    animation-delay: 0.5s;

    svg {
      margin-right: 5px;
    }
  }

  p.affirm {
    text-indent: .5em;
    font-size: 12px;
    color: var(--color);
    text-align: left;
    margin: 0;
    font-family: 'dindin';

  }
}

.mainHtml {
  font-size: 16px;

  :deep(p) {
    margin: 5px 0 0 !important
  }

  :deep(li) {
    list-style: decimal !important;
  }
}

@keyframes blinking-cursor {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(60deg)
  }

  50% {
    transform: rotate(120deg);
  }

  75% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
