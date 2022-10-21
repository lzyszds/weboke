<script setup lang='ts'>
import { ref, h } from 'vue'
import { ElTable, ElMessageBox, ElNotification } from 'element-plus'
import http from '@/http/http'
import dayjs from 'dayjs'
import UserForm from './UserForm.vue'
import load from '@/utils/loadings'
import { httpData, User } from './type'

//搜索框内容
const searchInput = ref('')

const total = ref(1) //分页页数
const pageSize = ref(9) //分页大小


//表格数据（前页数据展示进表格中）
const tableData = ref<User[]>()
//定义分页size以及当前页数据
const data = ref<httpData>({ code: 0, data: [], total: 0, })

//分页事件、切换页码时提供load效果
const handleCurrentChange = async (val: number, number?) => {
  if (number != 0) load.show('#loadings')
  total.value = val

  const pagePara = '/admin/userList?pages=' + total.value + '&limit=' + pageSize.value
  data.value = await http('get', pagePara) as httpData

  //时间格式化处理
  const setTime: any = (time: string) => {
    const formatted = dayjs(time).format('YYYY-MM-DD')
    return formatted
  }
  //数据处理 时间格式化 
  data.value.data.forEach((item: User) => {
    item.createDate = setTime(item.createDate)
    item.lastLoginDate = setTime(item.lastLoginDate)
  })
  tableData.value = (data.value.data)
  setTimeout(() => {
    load.hide('#loadings')
  }, 2000)
}
handleCurrentChange(1, 0)
//设置所有图片的地址 
const setheadImg = (headImg: User) => {
  return 'http://localhost:1027' + headImg
}
//屁用没有，但是必须写，不然排序不了 使用模板的table列
const formatter = () => { }

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
  http('post', '/admin/deleteUserLzy', { id: event.uid }).then((res: httpData) => {
    ElNotification({
      title: res.code == 200 ? '成功' : '失败',
      message: '用户' + res.message,
      type: res.code == 200 ? 'success' : 'error',
    })
    if (res.code != 200) console.log(`lzy ~ res`, res.err)
    handleCurrentChange(total.value)
  })
}
</script>

<template>
  <div class="search">
    <el-input class="searchInput" v-model="searchInput" placeholder="search" clearable />
    <el-button class="btn" type="primary">Go</el-button>
  </div>
  <div class="tableuser" id="loadings">
    <el-table :data="tableData" cell-class-name="lzyCell" style="width: 100%" stripe>
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
      <el-table-column property="username" label="登陆账号" align="center" show-overflow-tooltip />
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
            {{scope.row.createDate}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上一次登陆时间" sortable :sort-method="formatter" width="160">
        <template #default="scope">
          <div class="svgTem">
            <i class="iconfont">&#x100d9;</i>
            {{scope.row.lastLoginDate}}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
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
    <el-dialog v-model="centVisible" :before-close="handleClose" title="新增用户" width="26%" left>
      <UserForm v-if="centVisible" type="add" @switchAdd="switchAdd" />
    </el-dialog>
    <el-dialog v-model="modifyTheVis" :before-close="handleClose" title="修改用户" width="26%" left>
      <UserForm v-if="modifyTheVis" type="modify" :data="modifyData" @switchMod="switchMod" />
    </el-dialog>
    <div class="example-pagination-block lzyColor">
      <!-- <div class="example-demonstration">When you have more than 7 pages</div> -->
      <el-pagination v-model="total" :currentPage="total" v-model:page-size="pageSize" background
        layout="prev, pager, next" :total="data.total" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  height: 50px;
  width: 100%;

  :deep(.searchInput) {
    width: 200px;
    margin: 10px 0 0 20px;

    .el-input__wrapper {
      border-radius: 15px 0 0 15px;

      &.is-focus {
        box-shadow: 0 0 0 1px var(--themeColor) inset
      }
    }
  }

  :deep(.btn) {
    margin-top: 10px;
    border-radius: 0 15px 15px 0;
    background-color: var(--themeColor);
    border-color: transparent;
  }
}

.tableuser {
  height: calc(100vh - 200px);
  // padding-top: 50px;

  :deep(.lzyCell) {
    color: #000 !important;
  }

  .svgTem {
    display: flex;
    align-items: center;

    svg {
      width: 3rem !important;
      height: 3rem;
      margin-left: -5px;
      margin-right: 3px;
    }

    .iconfont {
      margin-right: 5px;
    }
  }

  .headImg {
    display: grid;
    grid-template: 1fr / 2fr 5fr;
    line-height: 50px;
    font-weight: 600;
    font-size: 1.5rem;
    font-family: 'alimama';

    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      -o-object-fit: cover;
      padding: 2px;
      margin-top: 2px;
      object-fit: cover;
      border: 1px solid var(--themeColor);
      overflow: hidden;
      box-shadow: 0px 0px 3px 1px #888;
    }
  }

  .power {
    display: flex;
    justify-content: center;

    span {
      padding: 5px 10px;
      border-radius: 5px;
      background-color: var(--themeColor);
      color: #fff;
    }

    span:nth-child(2) {
      background-color: eef7ff;
      color: #000;
    }
  }

  .token {
    display: flex;
    align-items: center;

    .iconfont {
      margin-right: 30px;
      font-size: 35px;
    }
  }

  .tool {
    button {
      color: var(--themeColor);
    }
  }
}

/* From uiverse.io by @varoonrao */
.checkbox-con {
  margin: 10px;
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer !important;
}

.checkbox-con input[type="checkbox"] {
  appearance: none;
  width: 48px;
  height: 27px;
  border: 2px solid rgb(255, 91, 91);
  border-radius: 20px;
  // background: #f1e1e1;
  position: relative;
  box-sizing: border-box;
  cursor: pointer !important;
}

.checkbox-con input[type="checkbox"]::before {
  content: "";
  width: 18px;
  height: 18px;
  background: rgb(255, 91, 91);
  // border: 2px solid #ea0707;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(13%, 15%);
  transition: all 0.3s ease-in-out;
}

.checkbox-con input[type="checkbox"]::after {
  content: url("data:image/svg+xml,%3Csvg xmlns='://www.w3.org/2000/svg' width='23' height='23' viewBox='0 0 23 23' fill='none'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.55021 5.84315L17.1568 16.4498L16.4497 17.1569L5.84311 6.55026L6.55021 5.84315Z' fill='%23EA0707' fill-opacity='0.89'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.1567 6.55021L6.55012 17.1568L5.84302 16.4497L16.4496 5.84311L17.1567 6.55021Z' fill='%23EA0707' fill-opacity='0.89'/%3E%3C/svg%3E");
  position: absolute;
  top: 0;
  left: 20px;
}

.checkbox-con input[type="checkbox"]:checked {
  border: 2px solid var(--themeColor);
  background: #fff;
}

.checkbox-con input[type="checkbox"]:checked::before {
  background: var(--themeColor);
  border: 2px solid var(--themeColor);
  transform: translate(125%, 13%);
  transition: all 0.3s ease-in-out;
}


.checkbox-con label {
  margin-left: 10px;
  cursor: pointer;
  user-select: none;
}

.toolfooter {
  position: relative;
  padding: 10px 10px;

  button.add,
  button.el-button--primary {
    background-color: var(--themeColor);
  }

  .lzyColor {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;

    :deep(li).active {
      color: var(--themeColor);
    }
  }

  :deep(.el-dialog) {
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
      font-family: 'douyu';

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
}
</style>
