<script setup lang='ts'>
import { ref, h } from 'vue'
import { ElMessageBox, ElNotification, ElPagination } from 'element-plus'
import http from '@/http/http'
import dayjs from 'dayjs'
import UserForm from './UserForm.vue'
import load from '@/uiComponents/loader/loadings'
import { httpData, User } from './type'
import Search from '@/views/admin/components/Search.vue'
// import { useWindowSize } from '@vueuse/core'
// const { height } = useWindowSize()

const total = ref(1) //分页页数
const pageSize = ref(10) //分页大小
const tableheight = ref<number>(729) //表格高度
// tableheight.value = height.value * 0.75


//表格数据（前页数据展示进表格中）
const tableData = ref<User[]>()
const tableSearchData = ref<User[]>()
//定义分页size以及当前页数据
const data = ref<httpData>({ code: 0, data: [], total: 0, })

//时间格式化处理
const setTime: any = (time: string) => {
  const formatted = dayjs(time).format('YYYY-MM-DD')
  return formatted
}

//分页事件、切换页码时提供load效果
const handleCurrentChange = async (val: number, number?) => {
  if (number != 0) load.show('#loadings')
  total.value = val

  const pagePara = '/adminApi/admin/userList?pages=' + total.value + '&limit=' + pageSize.value
  data.value = await http('get', pagePara) as httpData


  //数据处理 时间格式化 
  data.value.data.forEach((item: User) => {
    item.createDate = setTime(item.createDate)
    item.lastLoginDate = setTime(item.lastLoginDate)
  })
  tableData.value = (data.value.data)
  setTimeout(() => {
    load.hide('#loadings')
  }, 1000)
}
handleCurrentChange(1, 0)
//设置所有图片的地址 
const setheadImg = (headImg: User) => {
  return '/adminApi' + headImg
}
//屁用没有，但是必须写，不然排序不了 使用模板的table列
const formatter = () => {
  return 0
}

//新增用户按钮，点击后弹出form表单
const centVisible = ref(false)
const addUser = () => {
  centVisible.value = true
}
//修改用户按钮，点击后弹出确认框
const modifyTheVis = ref(false)
const modifyData = ref<User>()
const modifyThe = (event: User) => {
  modifyData.value = event
  modifyTheVis.value = true
}
//开启表单时点击空白地方 关闭form表单时的提示
const handleClose = (done: () => void) => {
  ElMessageBox({
    title: '提示',
    message: h('p', null, [
      h('span', null, '你确定关闭该对话框吗 '),
    ]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(() => {
      done()
    })
}
//子组件传来的参数 关闭form表单
const switchAdd = (boolean: boolean) => {
  centVisible.value = boolean
  ElNotification({
    title: '成功',
    message: '用户新增成功',
    type: 'success',
  })

  handleCurrentChange(total.value)
}
//子组件传来的参数 关闭form表单
const switchMod = (boolean: boolean) => {
  modifyTheVis.value = boolean
  ElNotification({
    title: '成功',
    message: '用户修改成功',
    type: 'success',
  })
  handleCurrentChange(total.value)
}

//删除用户
const deleteUser = (event) => {
  http('post', '/adminApi/admin/deleteUserLzy', { id: event.uid }).then((res: httpData) => {
    ElNotification({
      title: res.code == 200 ? '成功' : '失败',
      message: '用户' + res.message,
      type: res.code == 200 ? 'success' : 'error',
    })
    if (res.code != 200) console.log(`lzy ~ res`, res.err)
    handleCurrentChange(total.value)
  })
}
const searchData = (val) => {
  //数据处理 时间格式化 
  val.data.forEach((item: User) => {
    item.createDate = setTime(item.createDate)
    item.lastLoginDate = setTime(item.lastLoginDate)
  })
  console.log(`lzy ~ !val.searchInput`, !val.searchInput.value)
  if (val.searchInput == '') {
    tableSearchData.value = undefined
  } else {
    tableSearchData.value = val.data
  }
}
//监听窗口大小变化
// watch(height, (val) => {
//   tableheight.value = val * 0.75
// })
</script>

<template>
  <Search type='user' @searchData="searchData" />
  <div class="tableuser" id="loadings">
    <el-table :data="tableSearchData || tableData" cell-class-name="lzyCell" :height="tableheight" style="width: 100%"
      stripe>
      <template #empty>
        <div class="empty">
          <img src="@/assets/image/暂无文档.svg" alt="">
          <span>暂无数据</span>
        </div>
      </template>
      <el-table-column type="selection" width="55" />
      <el-table-column property="uid" label="Id" sortable width="70"> </el-table-column>
      <el-table-column label="uname" width="200" show-overflow-tooltip>
        <template #default="scope">
          <div class="headImg">
            <img :src="setheadImg(scope.row.headImg)" alt="">
            {{ scope.row.uname }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="token" width="70" show-overflow-tooltip>
        <template #default="scope">
          <div class="token">
            <i class="iconfont">&#xe66d;</i>
            {{ scope.row.token }}
          </div>
        </template>
      </el-table-column>
      <el-table-column property="username" label="登陆账号" align="center" width="180" />
      <el-table-column label="权限" width="100px" align="center">
        <template #default="scope">
          <div class="power">
            <span v-if="scope.row.power === 'admin'">管理员</span>
            <span v-else>普通用户</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="允许" width="100px" align="center">
        <template #default="scope">
          <div class="power">
            <div class="checkbox-con">
              <input id="checkbox" type="checkbox" disabled v-model="scope.row.isUse">
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" sortable :sort-method="formatter" width="160">
        <template #default="scope">
          <div class="svgTem">
            <i class="iconfont">&#x100d9;</i>
            {{ scope.row.createDate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上一次登陆时间" sortable :sort-method="formatter" width="160">
        <template #default="scope">
          <div class="svgTem">
            <i class="iconfont">&#x100d9;</i>
            {{ scope.row.lastLoginDate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
        <template #default="scope">
          <div class="tool">
            <el-button link type="primary" size="small" @click="modifyThe(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="toolfooter">
    <el-button class="add" type="primary" @click="addUser">新增用户</el-button>
    <el-dialog class="userDialog" v-model="centVisible" :before-close="handleClose" title="新增用户" width="26%" left>
      <UserForm v-if="centVisible" type="add" @switchAdd="switchAdd" />
    </el-dialog>
    <el-dialog class="userDialog" v-model="modifyTheVis" :before-close="handleClose" title="修改用户" width="26%" left>
      <UserForm v-if="modifyTheVis" type="modify" :data="modifyData" @switchMod="switchMod" />
    </el-dialog>
    <div class="example-pagination-block lzyColor" v-if="!tableSearchData">
      <!-- <div class="example-demonstration">When you have more than 7 pages</div> -->
      <el-pagination small v-model="total" :currentPage="total" v-model:page-size="pageSize" background
        layout="prev, pager, next" :total="data.total" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-dialog).userDialog {
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  padding-left: 0px;
  padding-bottom: 50px;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;

  .el-dialog__header {
    font-family: 'almama';

    button {
      // display: none;
      margin-top: 15px;
      font-size: 20px;

      &:hover .el-icon {
        color: var(--themeColor);
      }
    }
  }

  &:hover {
    border-color: var(--themeColor);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);

    .card-button {
      transform: translate(-50%, 50%);
      opacity: 1;
    }
  }

  .card-button {
    transform: translate(-50%, 100%);
    width: 100px;
    border-radius: 1rem;
    border: none;
    background-color: var(--themeColor);
    color: #fff;
    font-size: 1rem;
    padding: .5rem 1rem;
    position: absolute;
    left: 0%;
    bottom: -50px;
    opacity: 0;
    transition: 0.3s ease-out;

    &:nth-child(2) {
      background-color: #fff;
      left: 50%;
      bottom: -50px;
      color: var(--themeColor);
      border: 2px solid var(--themeColor);
    }
  }
}
</style>
