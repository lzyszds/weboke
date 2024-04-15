<script setup lang='ts'>
import { Comment } from '@/types/Comment'
import { timeAgo } from '@/utils/common'
const comment = ref<Comment[]>()
const { $axios } = window

const getComment = async () => {
  return await $axios({
    url: '/api/comment/getNewComment',
    method: 'get',
    params: {
      limit: 6
    }
  })
}
comment.value = await getComment()


</script>

<template>
  <div class="themeCard stickyTop">
    <div class="cardinter stickers">
      <div class="comment-title">最新评论</div>
    </div>
    <!-- 最新评论 -->
    <div class="cardinter" v-for="(item, index) in comment" :key="index">
      <img :src="'/api/public' + item.head_img" alt="" />
      <div class="comment-content">{{ item.content }}</div>
      <div>{{ timeAgo(item.time) }}</div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.stickyTop {
  top: 295px;
}

.cardinter {
  font-size: 1.6rem;
  display: flex;
  gap: 5px;
  align-items: center;

  .comment-title {
    margin: 0 30px;
    line-height: 21px;
  }

  img {
    width: 30px;
    border-radius: 50%;
  }

  .comment-content {
    flex: 1;
    max-width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

  }
}
</style>
