<script setup lang='ts'>
import MarkdownIt from 'markdown-it'
import { config, toolex } from './config'
import { ref, computed, } from 'vue';
import container from 'markdown-it-container'

const content = ref<string>('')
const markdown = computed(() => {
  const md = MarkdownIt(config)
    // .disable(['link', 'image'])
    .use(container, 'spoiler', {
      validate: function (params) {
        return params.trim().match(/^spoiler\s+(.*)$/);
      },
      render: function (tokens, idx) {
        var m = tokens[idx].info.trim().match(/^spoiler\s+(.*)$/);
        if (tokens[idx].nesting === 1) {
          // opening tag
          return '<details><summary>' + md.utils.escapeHtml(m[1]) + '</summary>\n';
        } else {
          // closing tag
          return '</details>\n';
        }
      }
    });
  const result = md.render(content.value);

  return result
})
const focusIndex: any = ref('')
const focusValue = ref<boolean[]>([])
const focusHandle: any = (index: number, item: any) => {
  focusIndex.value = index
  focusValue.value.forEach((_res, _index) => {
    if (_index === index) {
      focusValue.value[_index] = !focusValue.value[_index]
    } else {
      focusValue.value[_index] = false
    }
  });
  focusValue.value[index] = true
  content.value += item.callback() || item.menu.callback()
}
document.addEventListener('click', () => {
  focusValue.value.forEach((_res, _index) => {
    focusValue.value[focusIndex.value] = false
  })
})
</script>

<template>
  <div style="height: 100vh;width: 100vw;background-color: #999;padding-top: 120px;">
    <div class="markdown_tool">
      <div class="tool_item" v-for="(item, index) in toolex" :key="index">
        <span v-if="item.isPart">&nbsp;|&nbsp;</span>
        <div :class="{ 'iconMenu': item.menu, 'active': focusValue[index] }" @click.stop="focusHandle(index, item)">
          <!-- <ion-icon @mouseleave="active[index] = false" @mouseenter="active[index] = true" :name="item.name"></ion-icon> -->
          <i class='fa' :class="item.name"></i>
          <i class="fa fa-caret-down" v-if="item.menu"></i>
          <ul class="selectTool" v-if="focusValue[index]">
            <li v-for="(res, index) in item.menu" :key="index">{{ res.action }}</li>
          </ul>
          <transition name="tips">
            <span v-if="!focusValue[index]" class="tips">{{ item.action }}</span>
          </transition>
        </div>
      </div>
    </div>
    <div class="markdown_lzy">
      <div class="markdown-entry">
        <textarea class="markdown-textarea" type="text" rows="5" v-model="content"></textarea>
      </div>
      <div class="markdown-body" v-html="markdown">

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.markdown_tool {
  padding: 0 10px;
  display: flex;
  align-items: center;
  width: 90%;
  height: 40px;
  background-color: #fff;
  margin: 0 auto;
  border-bottom: 1px solid #ddd;
  border-radius: 5px 5px 0 0;

  .tool_item {
    display: flex;
    user-select: none;

    &>span {
      font-size: 18px;
    }

    &>div {
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      border-radius: 5px;
      position: relative;
      transition: .2s;
      cursor: var(--linkCup);

      &>i {
        padding: 15px 10px;
        font-size: 16px;
      }

      &.active {
        background-color: var(--themeColor);
        color: #fff;
      }

      &.iconMenu>i {
        padding: 15px 5px;

        &:nth-child(1) {
          padding-right: 0;
        }
      }

      &:hover {
        background-color: var(--themeColor);
        color: #fff;

        & .tips {
          display: block;
        }
      }

      .tips {
        height: 20px;
        width: max-content;
        font-size: 14px;
        position: absolute;
        bottom: -30px;
        left: 0;
        background-color: #fff;
        color: #000;
        padding: 1px 5px;
        display: none;
      }

      .selectTool {
        width: max-content;
        position: absolute;
        top: 40px;
        background-color: #F5F5F5;
        color: #000;

        li {
          padding: 7px 10px;
          cursor: var(--linkCup);

          &:hover {
            background-color: #ddd;
            color: var(--themeColor);
          }
        }
      }
    }
  }
}

.markdown_lzy {
  display: flex;
  width: 90%;
  height: 80%;
  margin: 0 auto;

  .markdown-entry {
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    height: 100%;
    flex: 1;
    border-right: 1px solid #ddd;
    border-radius: 0 0 0 5px;

    .markdown-textarea {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      resize: none;
      font-size: 16px;

      &::-webkit-scrollbar {
        width: 7px;
        background-color: var(--themeColor);
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(245, 245, 245);
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        background-color: var(--themeColor);
        border-radius: 20px;
        border: 1px solid rgb(245, 245, 245);
        transition: 1s all;
      }
    }
  }

  .markdown-body {
    padding: 10px 20px;
    background-color: #fff;
    height: 100%;
    flex: 1;
    border-radius: 0 0 5px 0;
    font-size: 16px;
    overflow: hidden;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 7px;
      background-color: var(--themeColor);
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(245, 245, 245);
      background-color: #F5F5F5;
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--themeColor);
      border-radius: 20px;
      border: 1px solid rgb(245, 245, 245);
      transition: 1s all;
    }
  }
}
</style>
