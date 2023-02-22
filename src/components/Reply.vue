<script setup lang='ts'>
import { defineProps, ref, getCurrentInstance, defineEmits } from 'vue';
interface Replydata {
  head_img: string,
  user_name: string,
  time: string,
  content: string,
  replyPeople: string,
  reply_id: number,
  reply: Replydata[]
}
interface Props {
  data: Replydata[],
  replyId: number[][],
}
const props = defineProps<Props>()
const data = ref<Replydata[]>(props.data)
const replyId = ref<number[][]>(props.replyId)
const proxy = getCurrentInstance()?.proxy as any
let setTimestamp = (time: string) => {
  //他妈的这里巨奇怪，不知道为什么这个方法会被下面handleScroll方法一直调用真的迷
  return proxy.$common.timeAgo(time)
}
const emit = defineEmits(['replycl', 'remReplycl'])
const replyComment = (item: Replydata, index: number) => {
  //判断是否是回复评论
  if (item.reply_id == 0) {
    emit('replycl', item, index)
  } else {
    emit('replycl', item, item.reply_id)
  }

}
const remReplyComment = (item, index) => {
  //判断是否是回复评论
  if (item.reply_id == 0) {
    emit('replycl', item, index)
  } else {
    emit('replycl', item, item.reply_id)
  }
}
</script>

<template>
  <div class="reply">
    <div class="item" v-for="(item, index) in data" :key="index">
      <div class="item-left">
        <img :src="item.head_img" alt="">
      </div>
      <div class="item-right">
        <div class="item-right-top">
          <span class="item-right-top-name">{{ item.user_name }}</span>
          <span class="item-right-top-time">{{ setTimestamp(item.time) }}</span>
          <button
            v-if="item.reply_id == 0 ? replyId[index][0] == 0 : replyId[index][replyId[index].indexOf(item.reply_id)] != 0"
            class="item-right-top-reply" @click="replyComment(item, index)">回复</button>
          <button v-else class="item-right-top-reply" @click="remReplyComment(item, index)">取消回复</button>
        </div>
        <div class="item-right-bottom">
          <span>{{ item.replyPeople ? '@' + item.replyPeople : '' }}</span>
          {{ item.content }}
        </div>
        <Reply v-if="item.reply" :data="item.reply" :replyId="replyId" @replycli="replyComment" />
      </div>
    </div>
  </div>
</template>

<style  lang="less">
.reply {

  .item {
    margin: 20px 0;
    display: grid;
    grid-template-columns: 60px 2fr;
    grid-template-rows: auto auto;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }

  .reply {
    grid-column: 2/4;

    .item {
      margin: 10px 0 0;
    }
  }

  .item-right-top {
    margin-bottom: 7px;
    letter-spacing: 3px;
  }

  .item-right-top-name {
    font-size: 18px;
    font-weight: 600;
    color: #555;
    letter-spacing: 0px;
  }

  .item-right-top-time {
    font-size: 12px;
    color: #999;
    margin: 0 10px;
    font-family: 'almama';
    letter-spacing: 0px;
  }

  .item-right-top-reply {
    font-size: 12px;
    color: #ffff;
    font-family: 'almama';
    letter-spacing: 0px;
    background-color: var(--themeColor);
    border-radius: 7px;
    padding: 4px;
    user-select: none;
  }

  .item-right-bottom {
    span {
      font-size: 14px;
      color: #999;
      font-family: 'almama';
      letter-spacing: 0px;
      user-select: none;
      cursor: var(--linkCup);
    }
  }
}
</style>
