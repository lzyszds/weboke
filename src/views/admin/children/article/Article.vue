<script setup lang='ts'>
import { ref, h } from 'vue'
import { ElTable, ElMessageBox, ElNotification } from 'element-plus'
import http from '@/http/http'
import dayjs from 'dayjs'
import load from '@/utils/loadings'
import { httpData, Article } from './type'
import ArticleForm from './ArticleForm.vue'
import Search from '@/views/admin/components/Search.vue'

const total = ref(1) //分页页数
const pageSize = ref(10) //分页大小


//表格数据（前页数据展示进表格中）
const tableData = ref<Article[]>()
const tableSearchData = ref<Article[]>()
//定义分页size以及当前页数据
const data = ref<httpData>({ code: 0, data: [], total: 0, })

//时间格式化处理
const setTime: any = (time: number) => {
  const formatted = dayjs.unix(time).format('YYYY-MM-DD')
  return formatted
}

//分页事件、切换页码时提供load效果
const handleCurrentChange = async (val: number, number?) => {
  if (number != 0) load.show('#loadings')
  total.value = val

  const pagePara = '/admin/articleList?pages=' + total.value + '&limit=' + pageSize.value
  data.value = await http('get', pagePara) as httpData


  //数据处理 时间格式化 
  data.value.data.forEach((item: Article) => {
    item.createTime = setTime(item.createTime)
    item.modified = setTime(item.modified)
  })
  tableData.value = (data.value.data)
  setTimeout(() => {
    load.hide('#loadings')
  }, 1000)
}
handleCurrentChange(1, 0)
//屁用没有，但是必须写，不然排序不了 使用模板的table列
const formatter = () => { }

//新增用户按钮，点击后弹出form表单
const centVisible = ref(false)
const addUser = () => {
  centVisible.value = true
}
//修改用户按钮，点击后弹出确认框
const modifyTheVis = ref(false)
const modifyData = ref<Article>()
const modifyThe = (event: Article) => {
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

//删除文章
const deleteArticle = (event) => {
  console.log(`lzy ~ event.aid`, event.aid)
  http('post', '/admin/deleteArticle', { id: event.aid }).then((res: httpData) => {
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
  val.data.forEach((item: Article) => {
    item.createTime = setTime(item.createTime)
    item.modified = setTime(item.modified)
  })
  if (val.searchInput == '') {
    tableSearchData.value = undefined
  } else {
    tableSearchData.value = val.data
  }
}
</script>

<template>
  <Search type='user' @searchData="searchData" url="searchArticle" />
  <div class="tableuser" id="loadings">

    <el-table border :data="tableSearchData || tableData" cell-class-name="lzyCell" height="729" style="width: 100%">
      <template #empty>
        <div class="empty">
          <img src="@/assets/image/暂无文档.svg" alt="">
          <span>暂无数据</span>
        </div>
      </template>
      <el-table-column type="selection" width="55" />
      <el-table-column property="aid" label="Id" sortable width="70"> </el-table-column>
      <el-table-column property="author" label="作者" width="80" show-overflow-tooltip> </el-table-column>
      <el-table-column label="文章封面" sortable width="160" show-overflow-tooltip>
        <template #default="scopre">
          <div>
            <img data-fancybox="gallery" :src="scopre.row.coverImg" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column property="title" label="文章标题" sortable width="160" show-overflow-tooltip> </el-table-column>
      <el-table-column label="创建时间" sortable :sort-method="formatter" width="160">
        <template #default="scope">
          <div class="svgTem">
            <i class="iconfont">&#x100d9;</i>
            {{ scope.row.createTime }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="上一次登陆时间" sortable :sort-method="formatter" width="160">
        <template #default="scope">
          <div class="svgTem">
            <i class="iconfont">&#x100d9;</i>
            {{ scope.row.modified }}
          </div>
        </template>
      </el-table-column>
      <el-table-column property="guid" label="文章路径" sortable>
        <template #default="scope">
          <div class="guidCup">
            <a :href="'/home/detail/' + scope.row.aid">{{ '/home/detail/' + scope.row.aid }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default="scope">
          <div class="tool">
            <el-button link type="primary" size="small" @click="modifyThe(scope.row)">修改</el-button>
            <el-button link type="primary" size="small" @click="deleteArticle(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div class="toolfooter">
    <el-button class="add" type="primary" @click="addUser">新增文章</el-button>
    <el-dialog class="articleDialog" :close-on-press-escape="false" v-model="centVisible" top="0px"
      :before-close="handleClose" title="新增文章" width="90%" left>
      <ArticleForm v-if="centVisible" type="add" @switchAdd="switchAdd" />
    </el-dialog>
    <el-dialog class="articleDialog" :close-on-press-escape="false" v-model="modifyTheVis" :before-close="handleClose"
      title="修改文章" width="90%" left>
      <ArticleForm v-if="modifyTheVis" type="modify" :data="modifyData" @switchMod="switchMod" />
    </el-dialog>
    <div class="example-pagination-block lzyColor" v-if="!tableSearchData">
      <!-- <div class="example-demonstration">When you have more than 7 pages</div> -->
      <el-pagination v-model="total" :currentPage="total" v-model:page-size="pageSize" background
        layout="prev, pager, next" :total="data.total" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style lang="less" scoped>
:deep(.el-dialog).articleDialog {
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 2px solid #c3c6ce;
  transition: 0.5s ease-out;
  overflow: visible;
  margin: 25px auto;

  .el-dialog__header {
    font-family: 'douyu';
    text-align: center;
    margin-bottom: 30px;

    .el-dialog__title {
      font-size: 3rem;
      font-weight: 400;
      color: #000;
      user-select: none;
    }

    button {
      margin-top: 15px;
      margin-right: 30px;
      font-size: 20px;
      color: var(--themeColor);

      &:hover .el-icon {
        color: var(--themeColor);
      }
    }
  }

  &:hover {
    border-color: var(--themeColor);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }
}
</style>
