<script setup lang='ts'>
import { ref } from 'vue';
import { timeAgo } from '@/utils/common'
import { Replydata } from './Detailtype'

interface Props {
  oldReplydata: Replydata[]
  replydata: Replydata[],
  replyId: number[][],
}

const props = defineProps<Props>()

//评论数据
const replydata = ref<Replydata[]>(props.replydata)

//评论数据复制
const oldReplydata = ref<Replydata[]>(props.oldReplydata)

//评论的id
const replyId = ref<number[][]>(props.replyId)
const emit = defineEmits(['replycl', 'remReplycl', 'replyclLevelTwo', 'remReplyclLevelTwo'])

//回复评论方法
const replyComment = (item: Replydata, index: number) => {
  //判断是否是回复评论
  if (item.reply_id == 0) {
    emit('replycl', item, index)
  } else {
    emit('replyclLevelTwo', item, index)
  }
}
//取消回复评论方法
const remReplyComment = (item, index) => {
  //判断是否是回复评论
  if (item.reply_id == 0) {
    emit('remReplycl', item, index)
  } else {
    emit('remReplyclLevelTwo', item, index)
  }
}

//判断当前是否选中当前评论进行回复
const isReply = (item: Replydata, index: number) => {
  if (item.reply_id == 0) {
    if (replyId.value[index]) return replyId.value[index][0] == 0
  } else {
    for (let key in oldReplydata.value) {
      if (oldReplydata.value[key].comId == item.ground_id) {
        return replyId.value[key][index + 1] == 0
      }
    }
  }
}
</script>

<template>
  <div class="reply">
    <div class="item" v-for="(item, index) in replydata" :key="index">
      <div class="item-left">
        <img :src="item.head_img" alt="">
      </div>
      <div class="item-right">
        <div class="item-right-top">
          <span class="item-right-top-name">{{ item.user_name }}</span>
          <span class="item-right-top-time">{{ timeAgo(item.time) }}</span>
          <button v-if="isReply(item, index)" class="item-right-top-reply" @click="replyComment(item, index)">回复</button>
          <button v-else class="item-right-top-reply" @click="remReplyComment(item, index)">取消回复</button>
        </div>
        <div class="item-right-bottom">
          <span>{{ item.replyPeople ? '@' + item.replyPeople : '' }}</span>
          {{ item.content }}
        </div>
        <Reply v-if="item.reply" :oldReplydata="oldReplydata" :replydata="item.reply" :replyId="replyId"
          @replyclLevelTwo="replyComment" @remReplyclLevelTwo="remReplyComment" />
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
    font-family: 'dindin';
    letter-spacing: 0px;
  }

  .item-right-top-reply {
    font-size: 12px;
    color: #ffff;
    font-family: 'dindin';
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
      font-family: 'dindin';
      letter-spacing: 0px;
      user-select: none;
      cursor: var(--linkCup);
    }
  }
}
</style>
