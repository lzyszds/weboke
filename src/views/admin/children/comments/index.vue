<script setup lang='ts'>
import Search from '../../components/Search.vue'
import { reactive } from 'vue';
// import { getComType } from './commentType'
import http from '@/http/http';
import { dayjs } from 'element-plus';
const { data } = await http('get', '/adminApi/admin/getComments') as any
interface getComType {
  article_id: Number, //文章id
  comId: Number //评论id
  content: String //评论内容
  email: String //邮箱
  ground_id: Number //评论楼层
  head_img: String //头像
  reply_id: Number //回复id
  time: Number //时间
  user_ip: String //用户ip
  user_name: String //用户名
}
const tableData = reactive<getComType[]>(data)
</script>

<template>
  <Search type='user' @searchData="" />
  <div>
    <el-table class="tableuser" :data="tableData" style="width: 100%">
      <el-table-column prop="" label="头像" width="70">
        <template #default="{ row }">
          <el-avatar :src="row.head_img" style="width: 40px; height: 40px"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="用户名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="content" label="评论内容" width="250" show-overflow-tooltip></el-table-column>
      <el-table-column prop="time" label="评论时间" width="180">
        <template #default="{ row }">
          <span>{{ dayjs.unix(row.time).format('YYYY/MM/DD HH:mm') }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="article_id" label="文章id" width="80"></el-table-column>
      <el-table-column prop="ground_id" label="评论楼层" width="80"></el-table-column>
      <el-table-column prop="reply_id" label="回复id" width="80"></el-table-column>
      <el-table-column prop="user_ip" label="用户ip" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <div class="tool">
            <el-button link type="primary" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
</style>
