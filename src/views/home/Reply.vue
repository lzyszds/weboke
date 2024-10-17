<script setup lang='ts'>
import { ref } from 'vue';
import { timeAgo } from '@/utils/common'
import { Replydata } from './Detailtype'

interface Props {
  oldReplicate: Replydata[]
  replydata: Replydata[],
  replyId: Map<number, {
    isReply: boolean,
    groundId: number
  }>
}

const props = defineProps<Props>()

//评论数据
const replydata = computed(() => props.replydata)

//评论数据复制
const oldReplicate = computed(() => props.oldReplicate)

//评论的id
const replyId = props.replyId
const emit = defineEmits(['replying', 'remReply'])

//回复评论方法
const replyComment = (item: Replydata,) => {
  console.log(item);
  //判断是否是回复评论
  if (item.replyId == 0) {
    emit('replying', item, item.commentId)
  } else {
    emit('replying', item, item.groundId)
  }
}
//取消回复评论方法
const remReplyComment = (item, index) => {
  //判断是否是回复评论
  emit('remReply', item, index)
}


</script>

<template>
  <div class="reply">
    <div class="item" v-for="(item, index) in replydata" :key="index">
      <div class="item-left">
        <img :src="'/firstHonoApi/static' + item.headImg" alt="">
      </div>
      <div class="item-right">
        <div class="item-right-top">
          <span class="item-right-top-name">{{ item.userName }}</span>
          <span class="item-right-top-time">{{ timeAgo(item.createDate) }}</span>
          <button v-if="!replyId.get(item.commentId)!.isReply" class="item-right-top-reply"
            @click="replyComment(item)">回复</button>
          <button v-else class="item-right-top-reply" @click="remReplyComment(item, index)">取消回复</button>
          <span class="item-right-info">
            <span>
              <LzyIcon name="iconoir:train" width="15px" />{{ item.userIp }}
            </span>
            <span>
              <LzyIcon name="iconoir:brain-warning" width="15px" />{{ item.deviceSystem }}
            </span>
            <span>
              <LzyIcon name="iconoir:window-check" width="15px" />{{ item.browserSystem }}
            </span>
          </span>

        </div>
        <div class="item-right-bottom">
          <span>{{ item.replyPeople ? '@' + item.replyPeople : '' }}</span>
          {{ item.content }}
        </div>
        <Reply v-if="item.children" :oldReplicate="oldReplicate" :replydata="item.children" :replyId="replyId"
          @replying="replyComment" @remReply="remReplyComment" />
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
    background: #717b8820;
    border-radius: 10px;
    padding: 5px 10px;

    span {
      font-size: 14px;
      color: #999;
      font-family: 'dindin';
      letter-spacing: 0px;
      user-select: none;
    }
  }

  .item-right-info {

    span {
      line-height: 16px;
      font-size: 12px;
      color: #000;
      font-family: 'dindin';
      letter-spacing: 0px;
      user-select: none;
      border-radius: 10px;
      padding: 0 5px;
      gap: 5px;

      svg {
        vertical-align: middle;
        margin: -2px 2px 0 0;
      }
    }
  }
}
</style>
