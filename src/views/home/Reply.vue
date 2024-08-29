<script setup lang='ts'>
import { ref } from 'vue';
import { timeAgo } from '@/utils/common'
import { Replydata } from './Detailtype'

interface Props {
  oldReplicate: Replydata[]
  replydata: Replydata[],
  replyId: number[][],
}

const props = defineProps<Props>()

//评论数据
const replydata = ref<Replydata[]>(props.replydata)

//评论数据复制
const oldReplicate = ref<Replydata[]>(props.oldReplicate)

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
    emit('remReplyclLevelTwo', item, getIndex(item, index))
  }
}

//判断当前是否选中当前评论进行回复
const isReply = (item: Replydata, index: number) => {
  if (item.reply_id == 0) {
    if (replyId.value[index]) return replyId.value[index][0] == 0
  } else {
    return getIndex(item, index) == 0
  }
}

//
function getIndex(item, index) {
  for (let key in oldReplicate.value) {
    if (oldReplicate.value[key].comment_id == item.ground_id) {
      //获取到当前oldReplicate中reply_id的值为0的它的索引是什么
      //(res) => res.reply_id == 0 && res.comment_id == item.ground_id
      let parentAssemble = oldReplicate.value.filter((res) => res.reply_id == 0)
      let parentIndex = parentAssemble.findIndex((res) => res.comment_id == item.ground_id)
      return replyId.value[parentIndex][index]
    }
  }
}
</script>

<template>
  <div class="reply">
    <div class="item" v-for="(item, index) in replydata" :key="index">
      <div class="item-left">
        <img :src="'/api/public' + item.head_img" alt="">
      </div>
      <div class="item-right">
        <div class="item-right-top">
          <span class="item-right-top-name">{{ item.user_name }}</span>
          <span class="item-right-top-time">{{ timeAgo(item.create_date) }}</span>
          <button v-if="isReply(item, index)" class="item-right-top-reply"
            @click="replyComment(item, index)">回复</button>
          <button v-else class="item-right-top-reply" @click="remReplyComment(item, index)">取消回复</button>
        </div>
        <div class="item-right-bottom">
          <span>{{ item.replyPeople ? '@' + item.replyPeople : '' }}</span>
          {{ item.content }}
        </div>
        <div class="item-right-info">
          <span>
            <LzyIcon name="iconoir:train" width="15px" />{{ item.user_ip }}
          </span>
          <span>
            <LzyIcon name="iconoir:brain-warning" width="15px" />{{ item.deviceSystem }}
          </span>
          <span>
            <LzyIcon name="iconoir:window-check" width="15px" />{{ item.browserSystem }}
          </span>
        </div>
        <Reply v-if="item.reply" :oldReplicate="oldReplicate" :replydata="item.reply" :replyId="replyId"
          @replyclLevelTwo="replyComment" @remReplyclLevelTwo="remReplyComment" />
      </div>
    </div>
  </div>
</template>

<style lang="less">
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
    color: var(--themeColor);
    letter-spacing: 0px;
    font-family: none;
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

  .item-right-info {
    display: flex;
    gap: 5px;
    margin-top: 10px;

    span {
      font-size: 12px;
      color: #fff;
      font-family: 'dindin';
      letter-spacing: 0px;
      user-select: none;
      background-color: var(--themeColor);
      padding: 2px 10px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
